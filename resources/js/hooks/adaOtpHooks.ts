/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADA_OTP_API, API_KEY } from "@/server/AdaOtpApi"
import API from "@/server/API";
import { SwalMessage } from "@/utils/SwalMessage";
import axios from "axios";
import React, { useEffect, useState } from "react"

interface servicesProps {
    id: number;
    text: string;
    description: string;
    icon: string;
}

export interface Metrics {
    total_success: number;
    today_success: number;
    total_order: number;
    today_order: number;
    complete_currently: number;
}

export interface CountryProps {
    id: number;
    name: string;
    iso: string;
    prefix: string;
    price: number;
    price_formatted: string;
    available: boolean;
    provider_id: number;
    provider_name: string;
    stock: number;
    stock_formatted: string;
    delivery_percent: number;
    delivery_formatted: string;
    operator: string;
    quality_score: string;
    provider_rate: string;
    order_count_today: number;
    can_order: boolean;
    current_demand_status: string;
    avg_delivery_time: number;
    avg_delivery_time_formatted: string;
    metrics: Metrics;
    labels: string[];
}

export default function useAdaOtpHooks() {
    const [servicesData, setServices] = useState<servicesProps[]>([]);
    const [countryData, setCountryData] = useState<CountryProps[]>([]);
    const [serviceId, setServiceId] = useState<any>(null);
    const [countryId, setCountryId] = useState<any>(null);
    const [profit, setProfit] = useState<string>("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${ADA_OTP_API}/services`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`
                    }
                });

                setServices(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchServices();
    }, []);

    const handleShowCountry = async (id: number) => {
        try {
            const response = await axios.get(`${ADA_OTP_API}/services/${id}/countries`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });

            setCountryData(response.data.data.countries);
        } catch (error: any) {
            SwalMessage({
                title: "Gagal!",
                text: error.message,
                icon: 'error'
            })
        }
    }

    const handlePostService = async () => {
        try {
            if (!serviceId || !countryId) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Harap isi semua field!"
                });

                return;
            }

            const filteringServiceParent = servicesData?.find((item: servicesProps) => {
                return item.id === serviceId;
            });

            const response = await API.post('/admin/service/ada-otp', {
                name: filteringServiceParent?.text,
                image: filteringServiceParent?.icon,
                country: countryId?.name,
                stock: countryId?.stock,
                price: Number(profit) + Number(countryId?.price_formatted.replace(/[^0-9]/g, ""))
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const message = response.data.message;
            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: message
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error: any) {
            SwalMessage({
                title: "Gagal",
                text: error.message,
                icon: "error"
            })
            console.error(error)
        }
    }

    const handleChangeService = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "service") return setServiceId(value);
        if (name === "country") return setCountryId(value);
        if (name === "profit") return setProfit(value);
    }

    return {
        servicesData,
        handleShowCountry,
        countryData,
        handlePostService,
        serviceId,
        countryId,
        profit,
        setServiceId,
        setCountryId,
        handleChangeService,
    }
}
