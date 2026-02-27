/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import {
    NokosCountry,
    NokosService,
    SuntikServiceProps,
    TransactionProps,
} from '@/types';
import SwalLoading from '@/utils/SwalLoading';
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

    const handleTransactionNokos = async (service: NokosService, country: NokosCountry) => {
        try {
            SwalLoading();
            let saveOrder;

            if (country.type == "adaotp") {
                const response = await API.post('/adaotp/order', {
                    price: country.price,
                    country: country.provider_country_id,
                    service_id: country.provider_service_id,
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                },
                );

                const apiResponse = response?.data?.data;
                const result = apiResponse?.results?.[0];
                if (!result || !result.success) {
                    throw new Error(result?.message || "Order gagal dibuat");
                }
                const numberValue = result.order?.number?.value;
                const orderId = result.order?.id;


                saveOrder = await API.post(
                    '/customer/transaction',
                    {
                        service_id: country.provider_service_id,
                        name: service.name,
                        order_id: orderId,
                        type: 'nokos',
                        price: country.price,
                        quantity: '1',
                        status: 'berhasil',
                        result: numberValue,
                        api_type: country.type,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
            } else {
                const response = await API.post('/jasaotp/order', {
                    price: country.price,
                    country: country.provider_country_id,
                    service: service.code,
                    operator: country.operator,
                },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );

                const phone = response.data.number;
                saveOrder = await API.post(
                    '/customer/transaction',
                    {
                        service_id: "-",
                        name: service.name,
                        order_id: "-",
                        type: 'nokos',
                        price: country.price,
                        quantity: '1',
                        status: 'berhasil',
                        result: phone,
                        api_type: country.type,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
            }

            SwalMessage({
                icon: 'success',
                title: 'Berhasil!',
                text: saveOrder?.data.message,
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error: any) {
            SwalMessage({
                icon: 'error',
                title: 'Gagal!',
                text: error?.response.data.message,
            });

            console.error(error);
        }
    }

    const handleTransactionSuntik = async (
        price: number,
        service: SuntikServiceProps,
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

            SwalLoading();
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
                            price: price,
                            quantity: target.quantity,
                            status: 'berhasil',
                            target: target.username,
                            api_type: typeApi,
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
                            price: price,
                            quantity: target.quantity,
                            status: 'berhasil',
                            target: target.username,
                            api_type: typeApi,
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

    const handleTransactionSuntikRefill = async (history: TransactionProps) => {
        try {
            const result = await SwalMessage({
                icon: "question",
                title: "Pertanyaan",
                text: `Apakah anda yakin untuk refill order ${history.order_id} dengan tujuan ${history.target} sebanyak ${history.quantity}?`,
                showCancelButton: true,
            })

            if (result.isConfirmed) {
                let savedOrder;
                SwalLoading();

                if (history.api_type == "medanpedia") {
                    await API.post("/medanpedia/refill", {
                        order_id: history.order_id,
                        price: history.price,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    savedOrder = await API.post("/customer/transaction", {
                        name: history.name,
                        service_id: history.service_id,
                        order_id: history.order_id,
                        type: "suntik",
                        price: history.price,
                        quantity: history.quantity,
                        status: "berhasil (isi ulang)",
                        target: history.target,
                        api_type: history.api_type,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                } else {
                    await API.post("/miraipedia/refill", {
                        order_id: history.order_id,
                        price: history.price,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    savedOrder = await API.post("/customer/transaction", {
                        name: history.name,
                        service_id: history.service_id,
                        order_id: history.order_id,
                        type: "suntik",
                        price: history.price,
                        quantity: history.quantity,
                        status: "berhasil (isi ulang)",
                        api_type: history.api_type,
                        target: history.target,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }

                SwalMessage({
                    icon: "success",
                    title: "Berhasil!",
                    text: savedOrder?.data.message,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error: any) {
            SwalMessage({
                icon: 'error',
                title: 'Gagal!',
                text: error?.response?.data.message,
            });
        }
    }

    return {
        transactionData,
        handleTransactionSuntik,
        transactionAdminData,
        loadingId,
        setLoadingId,
        handleTransactionNokos,
        handleTransactionSuntikRefill
    };
}
