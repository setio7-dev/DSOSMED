/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import { NewsProps } from '@/types';
import SwalLoading from '@/utils/SwalLoading';
import { SwalMessage } from '@/utils/SwalMessage';
import React, { useEffect, useState } from 'react';

export default function useNewsHooks() {
    const [newsData, setNewsData] = useState<NewsProps[]>([]);
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

    const fetchNews = async () => {
        try {
            const response = await API.get('/admin/news', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNewsData(response.data.data);
        } catch (error) {
            console.error(error);
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
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNews();
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
        customerNewsData
    };
}