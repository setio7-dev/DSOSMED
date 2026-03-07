/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import { SuntikServiceProps } from '@/types';
import SwalLoading from '@/utils/SwalLoading';
import { SwalMessage } from '@/utils/SwalMessage';
import { useEffect, useState } from 'react';

export default function useMedanPediaHooks() {
    const [suntikServiceData, setSuntikServiceData] = useState<SuntikServiceProps[]>([]);
    const [profit, setProfit] = useState('');
    const [customerserviceMedanPediaData, setCustomerserviceMedanPediaData] = useState<any[]>([]);
    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await API.get('/medanpedia/services');
                setSuntikServiceData(response.data.data);
            } catch (error) {
                if (error) {
                console.error("Terjadi Kesalahan!")
            };
            }
        };

        const fetchServicesOrder = async () => {
            try {
                const response = await API.get('/customer/service/suntik', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCustomerserviceMedanPediaData(response.data.data);
            } catch (error) {
                if (error) {
                console.error("Terjadi Kesalahan!")
            };
            }
        };

        fetchService();
        fetchServicesOrder();
    }, [token]);

    const handleSuntikPost = async (
        serviceData: SuntikServiceProps,
        servicePrice: number,
    ) => {
        try {
            SwalLoading();
            const response = await API.post(
                '/admin/service/suntik',
                {
                    service_id: serviceData.id,
                    name: serviceData.name,
                    api_type: "medanpedia",
                    description: serviceData.description,
                    min: serviceData.min,
                    max: serviceData.max,
                    average_time: serviceData.average_time,
                    refill: serviceData.refill,
                    type: serviceData.type,
                    category: serviceData.category,
                    old_price: Number(servicePrice),
                    price: Number(servicePrice) + Number(profit),
                },
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
        } catch (error: any) {
            SwalMessage({
                icon: 'error',
                title: 'Gagal!',
                text: error?.response?.data?.message,
            });
        }
    };

    const handleChangeSuntik = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'profit') setProfit(value);
    };

    return {
        suntikServiceData,
        profit,
        handleChangeSuntik,
        handleSuntikPost,
        customerserviceMedanPediaData,
    };
}
