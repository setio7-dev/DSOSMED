import API from "@/server/API";
import { SuntikServiceProps } from "@/types";
import SwalLoading from "@/utils/SwalLoading";
import { SwalMessage } from "@/utils/SwalMessage";
import React, { useEffect, useState } from "react";

export default function useMiraiPediaHooks() {
    const [miraiServiceData, setMiraiServiceData] = useState<SuntikServiceProps[]>([]);
    const [profit, setProfit] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchMiraiPedia = async () => {
            try {
                const response = await API.get("/miraipedia/service");
                setMiraiServiceData(response.data.data);
            } catch (error) {
                if (error) {
                console.error("Terjadi Kesalahan!")
            };
            }
        }

        fetchMiraiPedia();
    }, []);

    const handleMiraiPost = async (serviceData: SuntikServiceProps) => {
        try {
            SwalLoading();
            const response = await API.post("/admin/service/suntik", {
                service_id: serviceData.id,
                name: serviceData.name,
                api_type: "miraipedia",
                description: serviceData.description ? serviceData.description : "-",
                min: serviceData.min,
                max: serviceData.max,
                average_time: serviceData.avg_time_in_seconds,
                refill: serviceData.refill,
                type: serviceData.type,
                category: serviceData.category,
                old_price: serviceData.price,
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

    const handleMiraiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == "profit") return setProfit(value)
    }

    return {
        miraiServiceData,
        profit,
        handleMiraiChange,
        handleMiraiPost
    }
}
