import API from '@/server/API';
import { SuntikServiceProps } from '@/types';
import { SwalMessage } from '@/utils/SwalMessage';
import { useState } from 'react'

export default function SuntikHooks() {
    const token = localStorage.getItem("token");
    const [profit, setProfit] = useState("");

    const handleSuntikPost = async (serviceData: SuntikServiceProps) => {
        try {
            const response = await API.post("/admin/service/suntik", {
                service_id: serviceData.id,
                name: serviceData.name,
                api_type: "miraipedia",
                description: serviceData.description ? serviceData.description : "-",
                min: serviceData.min,
                max: serviceData.max,
                average_time: serviceData.avg_time_in_seconds ?? serviceData.average_time,
                refill: serviceData.refill,
                type: serviceData.type,
                category: serviceData.category,
                price: Number(serviceData.price) + Number(profit),
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

    const handleSuntikDelete = async (id: number) => {
        try {
            const result = await SwalMessage({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Apakah anda yakin untuk menghapus data ini!',
            });

            if (result.isConfirmed) {
                const response = await API.delete(
                    `/admin/service/suntik/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                SwalMessage({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: response.data.message,
                });

                setTimeout(() => window.location.reload(), 2000);
            }
        } catch {
            SwalMessage({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi Kesalahan!',
            });
        }
    };

    return {
        handleSuntikPost,
        profit,
        setProfit,
        handleSuntikDelete
    }
}
