/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/server/API";
import { ServicesAdaOtpProps, ServiceCountryAdaOtpProps } from "@/types";
import { SwalMessage } from "@/utils/SwalMessage";
import { useEffect, useState } from "react"

export default function useAdaOtpHooks() {
    const [servicesAdaOtpData, setServicesAdaotpData] = useState<ServicesAdaOtpProps[]>([]);
    const [serviceCountryAdaOtpData, setServiceCountryAdaOtpData] = useState<ServiceCountryAdaOtpProps[]>([]);
    const [customerServicesAdaOtpData, setCustomerServicesAdaotpData] = useState<ServicesAdaOtpProps[]>([]);
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
        customerServicesAdaOtpData,
        handleDeleteAdaOtpServiceCountry,
    }
}
