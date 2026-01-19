/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADA_OTP_API, API_KEY } from "@/server/AdaOtpApi"
import { SwalMessage } from "@/utils/SwalMessage";
import axios from "axios";
import { useEffect, useState } from "react"

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
    const [countryData, setCountry] = useState<CountryProps[]>([]);

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

            console.log(response.data.data.countries);
            setCountry(response.data.data.countries);
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
            const response = await axios.post(`${ADA_OTP_API}/service`)
        } catch (error: any) {
            SwalMessage({
                title: "Gagal",
                text: error.message,
                icon: "error"
            })
        }
    }

    return {
        servicesData,
        handleShowCountry,
        countryData
    }
}
