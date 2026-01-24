/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/server/API";
import { CountryProps, ServicesProps, ServiceVirtusimListCountryProps, ServiceVirtusimListServiceProps } from "@/types";
import { SwalMessage } from "@/utils/SwalMessage";
import React, { useEffect, useState } from "react"

export default function useNokosHooks() {
    const [serviceVirtusimData, setServiceVirtusimData] = useState<ServiceVirtusimListCountryProps[]>([]);
    const [serviceVirtusimCountryData, setServiceVirtusimCountryData] = useState<ServiceVirtusimListServiceProps[]>([]);

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
                const response = await API.get("/adaotp/services");
                setServices(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchServicesVirtusim = async() => {
            try {
                const response = await API.get("/virtusim/list-countries");
                setServiceVirtusimData(response.data.data);
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

        fetchServicesVirtusim();
        fetchServices();
        fetchServicesOrder();
    }, [token]);

    const handleShowCountry = async (id: number) => {
        try {
            const response = await API.get(`/adaotp/services/${id}`);

            setCountryData(response.data.data.countries);
        } catch (error: any) {
            SwalMessage({
                title: "Gagal!",
                text: error.message,
                icon: 'error'
            })
        }
    }

    const handleShowService = async(country: string) => {
        try {
            const response = await API.get(`/virtusim/service/${country}`);
            setServiceVirtusimCountryData(response.data.data);
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

    const handlePostServiceVirtusim = async () => {
        try {
            if (!serviceId || !countryId) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Harap isi semua field!"
                });

                return;
            }

            const filteringServiceParent = serviceVirtusimData?.find((item: ServiceVirtusimListCountryProps) => {
                return item.id === serviceId;
            });

            const response = await API.post('/admin/service/ada-otp', {
                name: filteringServiceParent?.country_name,
                image: filteringServiceParent?.img_link,
                country: countryId?.name,
                stock: countryId?.tersedia,
                price: Number(profit) + Number(countryId?.price)
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
        serviceOrderData,
        serviceVirtusimData,
        serviceVirtusimCountryData,
        handleShowService,
        handlePostServiceVirtusim
    }
}
