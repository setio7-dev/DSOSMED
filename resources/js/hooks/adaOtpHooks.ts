/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/server/API";
import { ServicesAdaOtpProps, ServiceCountryAdaOtpProps } from "@/types";
import { FormatNumber } from "@/utils/FormatNumber";
import { SwalMessage } from "@/utils/SwalMessage";
import React, { useEffect, useState } from "react"

export default function useAdaOtpHooks() {
    const [servicesAdaOtpData, setServicesAdaotpData] = useState<ServicesAdaOtpProps[]>([]);
    const [serviceCountryAdaOtpData, setServiceCountryAdaOtpData] = useState<ServiceCountryAdaOtpProps[]>([]);
    const [customerServicesAdaOtpData, setCustomerServicesAdaotpData] = useState<ServicesAdaOtpProps[]>([]);
    const [profit, setProfit] = useState<string>("");
    const [formPutAdaOtp, setFormPutAdaOtp] = useState<ServiceCountryAdaOtpProps | any>({
        price: null,
        stock: null,
        name: null,
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await API.get("/adaotp/services");
                setServicesAdaotpData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchServicesOrder = async () => {
            try {
                const response = await API.get("/customer/service/adaotp", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCustomerServicesAdaotpData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchServices();
        fetchServicesOrder();
    }, [token]);

    const handleShowCountry = async (serviceParentId: number) => {
        try {
            if (!serviceParentId) return;
            const response = await API.get(`/adaotp/services/${serviceParentId}`);
            setServiceCountryAdaOtpData(response.data.data.countries);
        } catch (error: any) {
            SwalMessage({
                title: "Gagal!",
                text: error.message,
                icon: 'error'
            })
        }
    }

    const handlePostService = async (serviceData: ServicesAdaOtpProps, countryData: ServiceCountryAdaOtpProps) => {
        try {
            if (!serviceData || !countryData) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Harap isi semua field!"
                });

                return;
            }

            const response = await API.post('/admin/service/adaotp', {
                parent_service_id: serviceData.id,
                text: serviceData.text,
                description: serviceData.description,
                icon: serviceData.icon,

                service_id: countryData.id,
                name: countryData.name,
                iso: countryData.iso,
                prefix: countryData.prefix,
                price: Number(countryData.price) + Number(FormatNumber(profit)),
                stock: countryData.stock,
                delivery_percent: countryData.delivery_percent,
                operator: countryData.operator,
                quality_score: countryData.quality_score,
                provider_rate: countryData.provider_rate,
                current_demand_status: countryData.current_demand_status,
                avg_delivery_time: countryData.avg_delivery_time,
                avg_delivery_time_formatted: countryData.avg_delivery_time_formatted
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
            console.error(error)
        }
    }

    const handleChangeAdaOtpService = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "profit") return setProfit(value);
    }

    const handleChangeAdaOtpServiceUpdate = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormPutAdaOtp((prev: ServiceCountryAdaOtpProps) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateAdaOtpServiceCountry = async (id: number) => {
        try {
            const response = await API.put(`/admin/service/adaotp/${id}`, formPutAdaOtp, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: response.data.message
            });

            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (error) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!"
                })
            }
        }
    }

    const handleDeleteAdaOtpServiceCountry = async (id: number) => {
        try {
            const result = await SwalMessage({
                icon: "warning",
                title: "Peringatan",
                text: "Apakah anda yakin untuk menghapus data ini!",
            })

            if (result.isConfirmed) {
                const response = await API.delete(`/admin/service/adaotp/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                SwalMessage({
                    icon: "success",
                    title: "Berhasil!",
                    text: response.data.message
                });

                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        } catch (error) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!"
                })
            }
        }
    }

    return {
        servicesAdaOtpData,
        handleShowCountry,
        serviceCountryAdaOtpData,
        handlePostService,
        profit,
        handleChangeAdaOtpService,
        customerServicesAdaOtpData,
        handleDeleteAdaOtpServiceCountry,
        handleChangeAdaOtpServiceUpdate,
        handleUpdateAdaOtpServiceCountry,
        formPutAdaOtp,
        setFormPutAdaOtp
    }
}
