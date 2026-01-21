/* eslint-disable @typescript-eslint/no-explicit-any */
import { ADA_OTP_API, API_KEY } from "@/server/AdaOtpApi"
import API from "@/server/API";
import { CountryProps, ServicesProps } from "@/types";
import { SwalMessage } from "@/utils/SwalMessage";
import axios from "axios";
import React, { useEffect, useState } from "react"

export default function useAdaOtpHooks() {
    const [servicesData, setServices] = useState<ServicesProps[]>([]);
    const [countryData, setCountryData] = useState<CountryProps[]>([]);
    const [serviceOrderData, setServiceOrderData] = useState<any[]>([]);
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

        const fetchServicesOrder = async() => {
            try {
                const response = await API.get("/customer/service/ada-otp", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setServiceOrderData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchServices();
        fetchServicesOrder();
    }, [token]);

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

            const filteringServiceParent = servicesData?.find((item: ServicesProps) => {
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
            });
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
        serviceOrderData
    }
}
