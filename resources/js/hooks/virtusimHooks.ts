/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/server/API";
import { ServiceVirtusimListServiceProps, ServiceVirtusimListCountryProps } from "@/types";
import { SwalMessage } from "@/utils/SwalMessage";
import React, { useEffect, useState } from "react"

export default function useVirtusimHooks() {
    const [serviceVirtusimData, setServiceVirtusimData] = useState<ServiceVirtusimListServiceProps[]>([]);
    const [serviceCountryVirtusimData, setServiceCountryVirtusimData] = useState<ServiceVirtusimListCountryProps[]>([]);
    const [customerserviceVirtusimData, setCustomerserviceVirtusimData] = useState<any[]>([]);
    const [profit, setProfit] = useState<string>("");
    const [formPutVirtusim, setFormPutVirtusim] = useState<ServiceVirtusimListServiceProps | any>({
        price: null,
        name: null,
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await API.get("/virtusim/list-countries");
                setServiceCountryVirtusimData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchServicesOrder = async () => {
            try {
                const response = await API.get("/customer/service/virtusim", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCustomerserviceVirtusimData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCountry();
        fetchServicesOrder();
    }, [token]);

    const handleShowService = async (serviceCountry: string) => {
        try {
            if (!serviceCountry) return;
            const response = await API.get(`/virtusim/service/${serviceCountry}`);
            setServiceVirtusimData(response.data.data);
        } catch (error: any) {
            SwalMessage({
                title: "Gagal!",
                text: error.message,
                icon: 'error'
            })
        }
    }

    const handlePostService = async (serviceData: ServiceVirtusimListServiceProps, countryData: ServiceVirtusimListCountryProps) => {
        try {
            if (!serviceData || !countryData) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Harap isi semua field!"
                });

                return;
            }

            const response = await API.post('/admin/service/virtusim', {
                parent_service_id: countryData.id,
                country_code: countryData.country_code,
                country_name: countryData.country_name,
                img_link: countryData.img_link,

                service_id: serviceData.id,
                name: serviceData.name,
                price: Number(serviceData.price) + Number(profit),
                is_promo: Number(serviceData.is_promo),
                tersedia: serviceData.tersedia,
                country: serviceData.country,
                status: Number(serviceData.status),
                category: serviceData.category,
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

    const handleChangeService = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "profit") return setProfit(value);
    }

    const handleChangeVirtusimServiceUpdate = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormPutVirtusim((prev: ServiceVirtusimListServiceProps) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateVirtusimServiceCountry = async (id: number) => {
        try {
            const response = await API.put(`/admin/service/virtusim/${id}`, formPutVirtusim, {
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

    const handleDeleteVirtusimServiceCountry = async (id: number) => {
        try {
            const result = await SwalMessage({
                icon: "warning",
                title: "Peringatan",
                text: "Apakah anda yakin untuk menghapus data ini!",
            })

            if (result.isConfirmed) {
                const response = await API.delete(`/admin/service/virtusim/${id}`, {
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
        serviceVirtusimData,
        handleShowService,
        serviceCountryVirtusimData,
        handlePostService,
        profit,
        handleChangeService,
        customerserviceVirtusimData,
        formPutVirtusim,
        setFormPutVirtusim,
        handleChangeVirtusimServiceUpdate,
        handleUpdateVirtusimServiceCountry,
        handleDeleteVirtusimServiceCountry
    }

}