import API from '@/server/API';
import { NokosCountry, NokosService } from '@/types';
import SwalLoading from '@/utils/SwalLoading';
import { SwalMessage } from '@/utils/SwalMessage';
import { useEffect, useState } from 'react'

export default function useNokosHooks() {
    const token = localStorage.getItem("token");
    const [nokosData, setNokosData] = useState<NokosService[]>([]);
    const [customerNokosData, setCustomerNokosData] = useState<NokosService[]>([]);
    const [profit, setProfit] = useState("");

    useEffect(() => {
        const fetchNokosAdmin = async () => {
            try {
                const response = await API.get("/admin/service/nokos", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setNokosData(response.data.data);
            } catch (error) {
                if (error) {
                    console.error("Terjadi Kesalahan!")
                };
            }
        }

        const fetchNokosCustomer = async () => {
            try {
                const response = await API.get("/customer/service/nokos", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCustomerNokosData(response.data.data);
            } catch (error) {
                if (error) {
                    console.error("Terjadi Kesalahan!")
                };
            }
        }

        fetchNokosAdmin();
        fetchNokosCustomer();
    }, [token]);

    const handleNokosPost = async (serviceData: NokosService, serviceCountry: NokosCountry) => {
        try {
            SwalLoading();
            const response = await API.post("/admin/service/nokos", {
                service_id: serviceData.id,
                name: serviceData.name,
                code: serviceData.code,
                icon: serviceData.icon,
                type: serviceCountry.type,
                provider_country_id: serviceCountry.provider_country_id,
                provider_service_id: serviceCountry.provider_service_id,
                country_name: serviceCountry.country_name,
                iso: serviceCountry.iso,
                prefix: serviceCountry.prefix,
                operator: serviceCountry.operator,
                price: Number(serviceCountry.price) + Number(profit),
                stock: serviceCountry.stock,
                quality_score: serviceCountry.quality_score,
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

    return {
        nokosData,
        customerNokosData,
        profit,
        setProfit,
        handleNokosPost,
    }
}
