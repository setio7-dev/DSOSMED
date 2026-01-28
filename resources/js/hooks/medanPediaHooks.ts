/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import { MedanPediaService } from '@/types'
import { SwalMessage } from '@/utils/SwalMessage';
import { useEffect, useState } from 'react'

export default function useMedanPediaHooks() {
    const [suntikServiceData, setSuntikServiceData] = useState<MedanPediaService[]>([]);
    const [profit, setProfit] = useState("");
    const [customerserviceMedanPediaData, setCustomerserviceMedanPediaData] = useState<any[]>([]);
    const [formPutMedanPedia, setFormPutMedanPedia] = useState<MedanPediaService | any>({
        price: null,
        name: null,
        description: null,
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await API.get("/medanpedia/services");
                setSuntikServiceData(response.data.data);
            } catch (error) {
                console.error(error)
            }
        }

        const fetchServicesOrder = async () => {
            try {
                const response = await API.get("/customer/service/medanpedia", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCustomerserviceMedanPediaData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchService();
        fetchServicesOrder();
    }, [token]);

    const handleSuntikPost = async (serviceData: MedanPediaService, servicePrice: number) => {
        try {
            const response = await API.post("/admin/service/medanpedia", {
                service_id: serviceData.id,
                name: serviceData.name,
                description: serviceData.description,
                min: serviceData.min,
                max: serviceData.max,
                average_time: serviceData.average_time,
                refill: serviceData.refill,
                type: serviceData.type,
                category: serviceData.category,
                price: Number(servicePrice) + Number(profit)
            }, {
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
                window.location.reload();
            }, 2000);
        } catch (error: any) {
            SwalMessage({
                icon: "error",
                title: "Gagal!",
                text: error?.response?.data.message
            })
            console.error(error)
        }
    }

    const handleChangeSuntik = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == "profit") return setProfit(value)
    }

    const handleChangeMedanPediaServiceUpdate = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormPutMedanPedia((prev: MedanPediaService) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateMedanPediaService = async (id: number) => {
        try {
            const response = await API.put(`/admin/service/medanpedia/${id}`, formPutMedanPedia, {
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

    const handleDeleteMedanPediaService = async (id: number) => {
        try {
            const result = await SwalMessage({
                icon: "warning",
                title: "Peringatan",
                text: "Apakah anda yakin untuk menghapus data ini!",
            })

            if (result.isConfirmed) {
                const response = await API.delete(`/admin/service/medanpedia/${id}`, {
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
        suntikServiceData,
        profit,
        handleChangeSuntik,
        handleSuntikPost,
        formPutMedanPedia,
        setFormPutMedanPedia,
        handleChangeMedanPediaServiceUpdate,
        handleUpdateMedanPediaService,
        handleDeleteMedanPediaService,
        customerserviceMedanPediaData
    }
}
