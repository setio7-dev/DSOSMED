/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import { MedanPediaService } from '@/types'
import { SwalMessage } from '@/utils/SwalMessage';
import { useEffect, useState } from 'react'

export default function useMedanPediaHooks() {
    const [suntikServiceData, setSuntikServiceData] = useState<MedanPediaService[]>([]);
    const [profit, setProfit] = useState("");
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

        fetchService();
    }, []);

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
                price: servicePrice + profit
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

    return {
        suntikServiceData,
        profit,
        handleChangeSuntik,
        handleSuntikPost
    }
}
