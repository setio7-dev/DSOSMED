/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import { CompareServicesResponse, NewsProps } from '@/types';
import SwalLoading from '@/utils/SwalLoading';
import { SwalMessage } from '@/utils/SwalMessage';
import React, { useEffect, useState } from 'react';
import useMedanPediaHooks from './medanPediaHooks';

export default function useNewsHooks() {
    const [newsData, setNewsData] = useState<NewsProps[]>([]);
    const [adminNewsData, setAdminNewsData] = useState<CompareServicesResponse[]>([]);
    const [customerNewsData, setCustomerNewsData] = useState<NewsProps[]>([]);
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState<{
        title: string;
        desc: string;
        image: File | null | string;
    }>({
        title: '',
        desc: '',
        image: null
    });
    const { customerserviceMedanPediaData } = useMedanPediaHooks();

    const fetchAdminNews = async() => {
        try {
            const response = await API.get("/admin/popup-news", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAdminNewsData(response.data);
        } catch (error) {
            if (error) {
                console.error("Terjadi Kesalahan!")
            };
        }
    }

    const fetchNews = async () => {
        try {
            const response = await API.get('/admin/news', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNewsData(response.data.data);
        } catch (error) {
            if (error) {
                console.error("Terjadi Kesalahan!")
            };
        }
    };

    const fetchCustomerNews = async () => {
        try {
            const response = await API.get('/customer/news', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCustomerNewsData(response.data.data);
        } catch (error) {
            if (error) {
                console.error("Terjadi Kesalahan!")
            };
        }
    };

    useEffect(() => {
        fetchNews();
        fetchAdminNews();
        fetchCustomerNews();
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handlePostNews = async () => {
        try {
            SwalLoading();
            const data = new FormData();
            data.append('title', formData.title);
            data.append('desc', formData.desc);
            if (formData.image instanceof File) {
                data.append('image', formData.image);
            }

            const response = await API.post('/admin/news', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            SwalMessage({
                icon: 'success',
                title: 'Berhasil!',
                text: response.data.message,
            });

            setFormData({ title: '', desc: '', image: null });
            fetchNews();
        } catch (error: any) {
            SwalMessage({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || 'Terjadi kesalahan',
            });
        }
    };

    const handleUpdateNews = async (id: number) => {
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('desc', formData.desc);
            if (formData.image instanceof File) {
                data.append('image', formData.image);
            }
            data.append('_method', 'PUT');

            const response = await API.post(`/admin/news/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            SwalMessage({
                icon: 'success',
                title: 'Berhasil!',
                text: response.data.message,
            });

            setFormData({ title: '', desc: '', image: null });
            fetchNews();
        } catch (error: any) {
            SwalMessage({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || 'Terjadi kesalahan',
            });
        }
    };

    const handleDeleteNews = async (id: number) => {
        try {
            const result = await SwalMessage({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Apakah anda yakin ingin menghapus berita ini?',
                showCancelButton: true,
            });

            if (result.isConfirmed) {
                const response = await API.delete(`/admin/news/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                SwalMessage({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: response.data.message,
                });

                fetchNews();
            }
        } catch (error: any) {
            SwalMessage({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || 'Terjadi kesalahan',
            });
        }
    };

    const handleUpdatePriceSuntikFromNews = async(serviceId: number, newPrice: number) => {
        try {
            const findData = customerserviceMedanPediaData.find(data => data.service_id == serviceId);
            const profitPrice = findData.price - findData.old_price + newPrice;
            const response = await API.put(`/admin/service/suntik/${findData.id}`, {
                old_price: newPrice,
                price: profitPrice
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
                    title: "Gagal!",
                    text: "Terjadi Kesalahan!",
                    icon: "error"
                })
            }
        }
    }

    return {
        newsData,
        formData,
        setFormData,
        handleChange,
        handleImageChange,
        handlePostNews,
        handleUpdateNews,
        handleDeleteNews,
        fetchNews,
        customerNewsData,
        adminNewsData,
        handleUpdatePriceSuntikFromNews
    };
}