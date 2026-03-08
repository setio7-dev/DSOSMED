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
    const [serviceForm, setServiceForm] = useState({
        name: null,
        description: null
    });

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
                if (error) {
                    console.error("Terjadi Kesalahan!")
                };
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
                if (error) {
                    console.error("Terjadi Kesalahan!")
                };
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
                const orderId = response.data.order_id;

                saveOrder = await API.post(
                    '/customer/transaction',
                    {
                        service_id: null,
                        name: service.name,
                        order_id: orderId,
                        type: 'nokos',
                        price: country.price,
                        quantity: '1',
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
            if (error) {
                SwalMessage({
                    icon: 'error',
                    title: 'Gagal!',
                    text: "Terjadi Kesalahan, Silahkan Hubungi Admin!",
                });
            };
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
                    text: "Terjadi Kesalahan, Silahkan Hubungi Admin!",
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
                    const response = await API.post("/medanpedia/refill", {
                        order_id: history.order_id,
                        price: history.price,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    savedOrder = await API.put(`/customer/transaction/${history.id}`, {
                        status: "berhasil (isi ulang)",
                        refill_id: response.data.refill_id
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                } else {
                    const response = await API.post("/miraipedia/refill", {
                        order_id: history.order_id,
                        price: history.price,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    savedOrder = await API.put(`/customer/transaction/${history.id}`, {
                        status: "berhasil (isi ulang)",
                        refill_id: response.data.data.ref_id,
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

    const handleCheckNokosOtp = async (orderNokos: TransactionProps) => {
        try {
            if (orderNokos.api_type == "adaotp") {
                const response = await API.get("/adaotp/orders/status", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.data.orders;
                const findData = data?.find((item: TransactionProps) => {
                    const data = item?.id === orderNokos.order_id;
                    return data;
                });

                if (!findData && !orderNokos.target) {
                    SwalMessage({
                        icon: "error",
                        title: "Gagal!",
                        text: "Order sudah expired, dana sudah direfund!"
                    });

                    await API.put(`/customer/transaction/${orderNokos.id}`, {
                        status: "gagal"
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    await API.put("/update/saldo", {
                        saldo: orderNokos.price
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    window.location.reload();
                    return;
                }

                await API.put(`/customer/transaction/${orderNokos.id}`, {
                    status: "berhasil",
                    target: findData?.sms?.length > 0 ? findData.sms[findData.sms?.length - 1].code : null,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const mappingData = {
                    order_id: findData.id,
                    sms: findData?.sms?.length > 0 ? findData.sms[findData.sms?.length - 1].code : "menunggu",
                    nomor: orderNokos.result
                }

                return mappingData;
            } else {
                const response = await API.post("/jasaotp/orders/status", {
                    order_id: orderNokos.order_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.data;
                if (!data && !orderNokos.target) {
                    SwalMessage({
                        icon: "error",
                        title: "Gagal!",
                        text: "Order sudah expired, dana sudah direfund!"
                    });

                    await API.put(`/customer/transaction/${orderNokos.id}`, {
                        status: "gagal"
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    await API.put("/update/saldo", {
                        saldo: orderNokos.price
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    window.location.reload();
                    return;
                }

                await API.put(`/customer/transaction/${orderNokos.id}`, {
                    status: "berhasil",
                    target: data.otp ? data.otp : null
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const mappingData = {
                    id: orderNokos.order_id,
                    sms: data.otp != "Menunggu" ? data.otp : "menunggu",
                    nomor: orderNokos.result
                }

                return mappingData;
            }
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan, silahkan coba lagi nanti!",
                })
            }
        }
    }

    const handleSuntikCheckStatus = async (orderSuntik: TransactionProps) => {
        try {
            if (orderSuntik.api_type == "medanpedia") {
                const response = await API.post("/medanpedia/status", {
                    order_id: orderSuntik.order_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.data;
                if (data.status == "Error") {
                    SwalMessage({
                        icon: "error",
                        title: "Gagal!",
                        text: "Order sudah expired, dana sudah direfund!"
                    });

                    await API.put(`/customer/transaction/${orderSuntik.id}`, {
                        status: "gagal"
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    await API.put("/update/saldo", {
                        saldo: orderSuntik.price
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    window.location.reload();
                    return;
                }

                await API.put(`/customer/transaction/${orderSuntik.id}`, {
                    status: "berhasil"
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                return {
                    order_id: orderSuntik.order_id,
                    status: data.status,
                    jumlah: data.remains,
                    target: orderSuntik.target,
                    nama: orderSuntik.name,
                    harga: orderSuntik.price
                }

            } else {
                const response = await API.post("/miraipedia/status", {
                    order_id: orderSuntik.order_id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.data;
                if (data.status == "canceled") {
                    SwalMessage({
                        icon: "error",
                        title: "Gagal!",
                        text: "Order sudah expired, dana sudah direfund!"
                    });

                    await API.put(`/customer/transaction/${orderSuntik.id}`, {
                        status: "gagal"
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    await API.put("/update/saldo", {
                        saldo: orderSuntik.price
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    window.location.reload();
                    return;
                }
                await API.put(`/customer/transaction/${orderSuntik.id}`, {
                    status: "berhasil"
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                return {
                    order_id: orderSuntik.order_id,
                    jumlah: data.remains,
                    status: data.status,
                    target: orderSuntik.target,
                    nama: orderSuntik.name,
                    harga: orderSuntik.price
                }
            }
        } catch (error) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan, silahkan coba lagi nanti!"
                })
            }
        }
    }

    const handleCheckSuntikRefill = async (orderSuntik: TransactionProps) => {
        try {
            if (orderSuntik.api_type == "medanpedia") {
                const response = await API.post("/medanpedia/refill/status", {
                    refill_id: orderSuntik.refill_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.data;
                if (!data) {
                    SwalMessage({
                        icon: "error",
                        title: "Gagal!",
                        text: "Order sudah expired, dana sudah direfund!"
                    });

                    await API.put(`/customer/transaction/${orderSuntik.id}`, {
                        status: "gagal"
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    await API.put("/update/saldo", {
                        saldo: orderSuntik.price
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    window.location.reload();
                    return;
                }

                return {
                    order_id: orderSuntik.order_id,
                    refill_id: data.refill_id,
                    status: data.status,
                }
            } else {
                const response = await API.post("/miraipedia/refill/status", {
                    refill_id: orderSuntik.refill_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data.data;
                if (!data) {
                    SwalMessage({
                        icon: "error",
                        title: "Gagal!",
                        text: "Order sudah expired, dana sudah direfund!"
                    });

                    await API.put(`/customer/transaction/${orderSuntik.id}`, {
                        status: "gagal"
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    await API.put("/update/saldo", {
                        saldo: orderSuntik.price
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    window.location.reload();
                    return;
                }

                return {
                    order_id: orderSuntik.order_id,
                    refill_id: data.ref_id,
                    status: data.status,
                }
            }
        } catch (error) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan, silahkan coba lagi nanti!"
                })
            }
        }
    }

    const handleDeleteServiceSuntik = async (id: number) => {
        try {
            const result = await SwalMessage({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Apakah anda yakin untuk menghapus data ini!',
            });

            if (result.isConfirmed) {
                SwalLoading();
                const response = await API.delete(`/admin/service/suntik/${id}`, {
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
            }
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

    const handleDeleteServiceNokos = async (id: number) => {
        try {
            const result = await SwalMessage({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Apakah anda yakin untuk menghapus data ini!',
            });

            if (result.isConfirmed) {
                SwalLoading();
                const response = await API.delete(`/admin/service/nokos/${id}`, {
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
            }
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

    const handleUpdateServiceSuntik = async (id: number) => {
        try {
            SwalLoading();
            const response = await API.put(`/admin/service/suntik/${id}`, {
                name: serviceForm.name,
                description: serviceForm.description
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

    const handleUpdateChangeServiceSuntik = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServiceForm({
            ...serviceForm,
            [name]: value
        });
    }

    const handleCancelNokos = async (orderNokos: TransactionProps) => {
        try {
            if (orderNokos.api_type == "adaotp") {
                SwalLoading();
                const response = await API.post("/adaotp/orders/cancel", {
                    order_id: orderNokos.order_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                await API.put(`/customer/transaction/${orderNokos.id}`, {
                    status: "gagal"
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                await API.put("/update/saldo", {
                    saldo: orderNokos.price
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const message = response.data.message;
                SwalMessage({
                    icon: "success",
                    title: "Berhasil!",
                    text: message
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                SwalLoading();
                const response = await API.post("/jasaotp/orders/cancel", {
                    order_id: orderNokos.order_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                await API.put(`/customer/transaction/${orderNokos.id}`, {
                    status: "gagal"
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                await API.put("/update/saldo", {
                    saldo: orderNokos.price
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const message = response.data.message;
                SwalMessage({
                    icon: "success",
                    title: "Berhasil!",
                    text: message
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
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
        transactionData,
        handleTransactionSuntik,
        transactionAdminData,
        loadingId,
        setLoadingId,
        handleTransactionNokos,
        handleTransactionSuntikRefill,
        handleCheckNokosOtp,
        handleSuntikCheckStatus,
        handleCheckSuntikRefill,
        handleDeleteServiceNokos,
        handleDeleteServiceSuntik,
        handleUpdateServiceSuntik,
        handleUpdateChangeServiceSuntik,
        handleCancelNokos
    };
}
