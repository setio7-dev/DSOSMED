/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import {
    JasaOtpServiceChildProps,
    JasaOtpServiceProps,
    MedanPediaServiceProps,
    TransactionProps,
} from '@/types';
import { SwalMessage } from '@/utils/SwalMessage';
import { useEffect, useState } from 'react';

export default function useTransactionHooks() {
    const token = localStorage.getItem('token');
    const [transactionData, setTransactionData] = useState<TransactionProps[]>(
        [],
    );
    const [transactionAdminData, setTransactionAdminData] = useState<
        TransactionProps[]
    >([]);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    useEffect(() => {
        console.log("TOKEN:", token);
        const fetchTransaction = async () => {
            try {
                const response = await API.get('/customer/transaction', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTransactionData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchTrasactionAdmin = async () => {
            try {
                const response = await API.get('/admin/transaction', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTransactionAdminData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransaction();
        fetchTrasactionAdmin();
    }, [token]);

    const handleTransactionAdaOtp = async (
        loadingKey: number,
        price: number,
        countryId: string,
        serviceId: string,
        serviceName: string,
    ) => {
        setLoadingId(loadingKey);
        console.log(token)

        try {
            const response = await API.post(
                '/adaotp/order',
                {
                    price,
                    country: countryId,
                    service_id: serviceId,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            const apiResponse = response.data.data;

            if (!apiResponse?.success) {
                throw new Error('Gagal membuat order dari ADAOTP');
            }

            const result = apiResponse.data?.results?.[0];

            if (!result) {
                throw new Error('Results kosong dari ADAOTP');
            }

            if (!result.order?.id) {
                throw new Error('Order ID tidak ditemukan');
            }

            const numberValue = result.order.number?.value;
            const orderId = result.order.id;

            if (!numberValue) {
                throw new Error('Nomor tidak ditemukan');
            }

            const saveOrder = await API.post(
                '/customer/transaction',
                {
                    service_id: serviceId,
                    name: serviceName,
                    order_id: orderId,
                    type: 'nokos',
                    price,
                    quantity: '1',
                    status: 'berhasil',
                    result: numberValue,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            SwalMessage({
                icon: 'success',
                title: 'Berhasil!',
                text: saveOrder.data.message,
            });
        } catch (error: any) {
            SwalMessage({
                icon: 'error',
                title: 'Gagal!',
                text: error?.response?.data?.message || error.message,
            });
            console.log(error)
        } finally {
            setLoadingId(null);
        }
    };

    const handleTransactionVirtusim = async (price: number, service: any) => {
        try {
            const response = await API.post(
                '/virtusim/order',
                {
                    price: price,
                    country: service.country,
                    service_id: service.service_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            localStorage.setItem('order', JSON.stringify(response.data));
            const phone = response.data.data.number;
            if (!phone) {
                SwalMessage({
                    icon: 'error',
                    title: 'Gagal!',
                    text: response.data.data.msg,
                });

                return;
            }

            const saveOrder = await API.post(
                '/customer/transaction',
                {
                    service_id: service.service_id,
                    name: service.name,
                    order_id: '-',
                    type: 'nokos',
                    price: price,
                    quantity: '1',
                    status: 'berhasil',
                    result: phone,
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
                text: saveOrder.data.message,
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    icon: 'error',
                    title: 'Gagal!',
                    text: error?.response?.data.message,
                });
            }
        }
    };

    const handleTransactionJasaOtp = async (
        loadingKey: number,
        country: JasaOtpServiceProps,
        service: JasaOtpServiceChildProps,
    ) => {
        setLoadingId(loadingKey);

        try {
            const response = await API.post(
                '/jasaotp/order',
                {
                    price: service.price,
                    country: country.country_id,
                    service: service.code,
                    operator: service.operator,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            const phone = response.data.number;
            if (!phone) throw new Error(response.data.msg);

            const saveOrder = await API.post(
                '/customer/transaction',
                {
                    service_id: service.service,
                    name: country.country,
                    order_id: response.data.order_id,
                    type: 'nokos',
                    price: service.price,
                    quantity: '1',
                    status: 'berhasil',
                    result: phone,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            SwalMessage({
                icon: 'success',
                title: 'Berhasil!',
                text: saveOrder.data.message,
            });
        } catch (error: any) {
            SwalMessage({
                icon: 'error',
                title: 'Gagal!',
                text: error?.response?.data?.message || error.message,
            });
        } finally {
            setLoadingId(null);
        }
    };

    const handleTransactionSuntik = async (
        price: number,
        service: MedanPediaServiceProps,
        targets: { username: string; quantity: number }[],
    ) => {
        try {
            if (targets.length === 0) {
                SwalMessage({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Target tidak boleh kosong!',
                });
            }

            const checkQuantity = targets.find((item) => item.quantity);
            if (Number(checkQuantity?.quantity) < 100) {
                SwalMessage({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Target harus lebih dari 100!',
                });

                return {
                    success: false,
                };
            }

            const typeApi = service.api_type;
            let saveOrder;

            if (typeApi == 'medanpedia') {
                for (let index = 0; index < targets.length; index++) {
                    const target = targets[index];

                    const response = await API.post(
                        '/medanpedia/order',
                        {
                            service: service.service_id,
                            target: target.username,
                            quantity: target.quantity,
                            price: price,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    const orderId = response.data.order_id;
                    saveOrder = await API.post(
                        '/customer/transaction',
                        {
                            name: service.name,
                            service_id: service.service_id,
                            order_id: orderId,
                            type: 'suntik',
                            price: service.price,
                            quantity: target.quantity,
                            status: 'berhasil',
                            target: target.username,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );
                }
            } else {
                for (let index = 0; index < targets.length; index++) {
                    const target = targets[index];

                    const response = await API.post(
                        '/miraipedia/order',
                        {
                            service: service.service_id,
                            target: target.username,
                            quantity: target.quantity,
                            price: price,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    const orderId = response.data.data.ref_id;
                    saveOrder = await API.post(
                        '/customer/transaction',
                        {
                            name: service.name,
                            service_id: service.service_id,
                            order_id: orderId,
                            type: 'suntik',
                            price: service.price,
                            quantity: target.quantity,
                            status: 'berhasil',
                            target: target.username,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );
                }
            }

            SwalMessage({
                icon: 'success',
                title: 'Berhasil!',
                text: saveOrder?.data.message,
            });

            return {
                success: true,
            };
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    icon: 'error',
                    title: 'Gagal!',
                    text: error?.response?.data.message,
                });

                return {
                    success: false,
                };
            }
        }
    };

    return {
        transactionData,
        handleTransactionAdaOtp,
        handleTransactionSuntik,
        handleTransactionVirtusim,
        handleTransactionJasaOtp,
        transactionAdminData,
        loadingId,
        setLoadingId,
    };
}
