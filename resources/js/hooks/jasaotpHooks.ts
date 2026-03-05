/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API'
import { JasaOtpCountryProps, JasaOtpServiceProps } from '@/types'
import { SwalMessage } from '@/utils/SwalMessage';
import React, { useEffect, useState } from 'react'

export default function useJasaotpHooks() {
    const [jasaOtpData, setJasaOtpData] = useState<JasaOtpCountryProps[]>([]);
    const [jasaOtpServiceData, setJasaOtpServiceData] = useState<JasaOtpServiceProps[]>([]);
    const [jasaOtpDataDetail, setJasaOtpDataDetail] = useState<any | null>(null);
    const [profit, setProfit] = useState<any>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchJasaOtpCountry = async () => {
            try {
                const response = await API.get('/jasaotp/country');
                setJasaOtpData(response.data.data)
            } catch (error) {
                if (error) {
                console.error("Terjadi Kesalahan!")
            }
            }
        }

        const fetchJasaOtpService = async () => {
            try {
                const response = await API.get("/customer/service/jasaotp", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setJasaOtpServiceData(response.data.data)
            } catch (error) {
                if (error) {
                console.error("Terjadi Kesalahan!")
            };
            }
        }

        fetchJasaOtpCountry()
        fetchJasaOtpService();
    }, [token]);

    const handleShowJasaOtpDetail = async (idNegara: number) => {
        try {
            const operatorRes = await API.get(`/jasaotp/operator?country=${idNegara}`);
            const serviceRes = await API.get(`/jasaotp/service?country=${idNegara}`);

            const mergeData = {
                operator: operatorRes.data.data,
                service: serviceRes.data
            }

            setJasaOtpDataDetail(mergeData as any)
        } catch (error) {
            if (error) {
                console.error("Terjadi Kesalahan!")
            };
        }
    }

    const handleChangeJasaOtpProfit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        if (name == "profit") return setProfit(value)
    }

    const handleJasaOtpPost = async (data: {
        negara: any
        layanan: any
        operator: string
    }) => {
        try {
            const response = await API.post("/admin/service/jasaotp", {
                country: data.negara.nama_negara,
                country_id: data.negara.id_negara,
                code: data.layanan.code,
                price: profit ? profit : data.layanan.harga,
                service: data.layanan.layanan,
                operator: data.operator,
                stock: data.layanan.stok,
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

    const handleDeleteJasaOtp = async(id: number) => {
        try {
            const response = await API.delete(`/admin/service/jasaotp/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const message = response.data.message;
            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: message
            })

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
        jasaOtpData,
        jasaOtpDataDetail,
        handleShowJasaOtpDetail,
        handleChangeJasaOtpProfit,
        profit,
        handleJasaOtpPost,
        jasaOtpServiceData,
        handleDeleteJasaOtp
    }
}
