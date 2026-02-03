/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import API from '@/server/API';
import { MedanPediaServiceProps } from '@/types';
import { SwalMessage } from '@/utils/SwalMessage';

export default function useMedanPediaHooks() {
    const [suntikServiceData, setSuntikServiceData] = useState<MedanPediaServiceProps[]>([]);
    const [profit, setProfit] = useState("");
    const [customerserviceMedanPediaData, setCustomerserviceMedanPediaData] = useState<any[]>([]);
    const [formPutMedanPedia, setFormPutMedanPedia] = useState<MedanPediaServiceProps | any>({
        price: null,
        name: null,
        description: null,
    });

    const [target, setTarget] = useState<string>('');
    const [quantity, setQuantity] = useState<number | null>(null);

    const token = localStorage.getItem("token");

    const totalPrice = quantity ? quantity : 0;

    const errors = {
        target: !target.trim() ? 'Target wajib diisi' : '',
        quantity: !quantity
            ? 'Masukkan jumlah'
            : quantity < 1
                ? 'Jumlah harus lebih dari 0'
                : '',
    };

    const isValid = !errors.target && !errors.quantity;

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await API.get("/medanpedia/services");
                setSuntikServiceData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchServicesOrder = async () => {
            try {
                const response = await API.get("/customer/service/medanpedia", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCustomerserviceMedanPediaData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchService();
        fetchServicesOrder();
    }, [token]);

    const handleSuntikPost = async (
        serviceData: MedanPediaServiceProps,
        servicePrice: number
    ) => {
        try {
            const response = await API.post(
                "/admin/service/medanpedia",
                {
                    service_id: serviceData.id,
                    name: serviceData.name,
                    description: serviceData.description,
                    min: serviceData.min,
                    max: serviceData.max,
                    average_time: serviceData.average_time,
                    refill: serviceData.refill,
                    type: serviceData.type,
                    category: serviceData.category,
                    price: Number(servicePrice) + Number(profit),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: response.data.message,
            });

            setTimeout(() => window.location.reload(), 2000);
        } catch (error: any) {
            SwalMessage({
                icon: "error",
                title: "Gagal!",
                text: error?.response?.data?.message,
            });
        }
    };

    const handleChangeSuntik = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "profit") setProfit(value);
    };

    const handleChangeMedanPediaServicePropsUpdate = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormPutMedanPedia((prev: MedanPediaServiceProps) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateMedanPediaServiceProps = async (id: number) => {
        try {
            const response = await API.put(
                `/admin/service/medanpedia/${id}`,
                formPutMedanPedia,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: response.data.message,
            });

            setTimeout(() => window.location.reload(), 2000);
        } catch {
            SwalMessage({
                icon: "error",
                title: "Gagal!",
                text: "Terjadi Kesalahan!",
            });
        }
    };

    const handleDeleteMedanPediaServiceProps = async (id: number) => {
        try {
            const result = await SwalMessage({
                icon: "warning",
                title: "Peringatan",
                text: "Apakah anda yakin untuk menghapus data ini!",
            });

            if (result.isConfirmed) {
                const response = await API.delete(
                    `/admin/service/medanpedia/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                SwalMessage({
                    icon: "success",
                    title: "Berhasil!",
                    text: response.data.message,
                });

                setTimeout(() => window.location.reload(), 2000);
            }
        } catch {
            SwalMessage({
                icon: "error",
                title: "Gagal!",
                text: "Terjadi Kesalahan!",
            });
        }
    };

    const handleQuantityChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        setQuantity(val === '' ? null : Number(val));
    };

    const handleSubmitOrder = async (serviceId: number) => {
        if (!isValid) return;

        try {
            const response = await API.post("/medanpedia/order", {
                service: serviceId,
                target,
                quantity,
            });

            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: response.data.message,
            });

            setTarget('');
            setQuantity(null);
        } catch (error: any) {
            SwalMessage({
                icon: "error",
                title: "Gagal!",
                text: error?.response?.data?.message || "Terjadi kesalahan",
            });
        }
    };

    return {
        suntikServiceData,
        profit,
        handleChangeSuntik,
        handleSuntikPost,
        formPutMedanPedia,
        setFormPutMedanPedia,
        handleChangeMedanPediaServicePropsUpdate,
        handleUpdateMedanPediaServiceProps,
        handleDeleteMedanPediaServiceProps,
        customerserviceMedanPediaData,

        target,
        setTarget,
        quantity,
        setQuantity,
        totalPrice,
        errors,
        isValid,
        handleQuantityChange,
        handleSubmitOrder,
    };
}
