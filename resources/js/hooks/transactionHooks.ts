/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import { MedanPediaServiceProps, ServicesAdaOtpProps, TransactionProps } from '@/types';
import { SwalMessage } from '@/utils/SwalMessage';
import { useEffect, useState } from 'react';

export default function useTransactionHooks() {
    const token = localStorage.getItem("token");
    const [transactionData, setTransactionData] = useState<TransactionProps[]>([]);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await API.get("/customer/transaction", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTransactionData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTransaction();
    }, [token]);

    const handleTransactionAdaOtp = async (price: number, country: string, service: ServicesAdaOtpProps) => {
        try {
            const response = await API.post("/adaotp/order", {
                price: price,
                country: country,
                service_id: service.parent_service_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const numberValue = response.data.data.data.results[0].order.number.value;
            const orderId = response.data.data.data.results[0].order.id;
            
            if (!orderId) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan server, harap hubungi admin!"
                });

                return;
            }

            const saveOrder = await API.post("/customer/transaction", {
                service_id: service.parent_service_id,
                name: service.text,
                order_id: orderId,
                type: "nokos",
                price: price,
                quantity: "1",
                status: "berhasil",
                result: numberValue
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: saveOrder.data.message
            });

            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: error?.response?.data.message
                })
            }
        }
    }

    const handleTransactionVirtusim = async (price: number, service: any) => {
        try {
            const response = await API.post("/virtusim/order", {
                price: price,
                country: service.country,
                service_id: service.service_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            localStorage.setItem("order", JSON.stringify(response.data))
            const phone = response.data.data.number;
            if (!phone) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: response.data.data.msg
                });

                return;
            }

            const saveOrder = await API.post("/customer/transaction", {
                service_id: service.service_id,
                name: service.name,
                order_id: "-",
                type: "nokos",
                price: price,
                quantity: "1",
                status: "berhasil",
                result: phone
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: saveOrder.data.message
            });

            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: error?.response?.data.message
                })
            }
        }
    }

    const handleTransactionMedanPedia = async (price: number, service: MedanPediaServiceProps, targets: { username: string; quantity: number }[]) => {
        try {
            if (targets.length === 0) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Target tidak boleh kosong!"
                });
            }

            const checkQuantity = targets.find((item) => item.quantity);
            if (Number(checkQuantity?.quantity) < 100) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: "Target harus lebih dari 100!"
                });

                return {
                    success: false
                }
            }

            let saveOrder;
            for (let index = 0; index < targets.length; index++) {
                const target = targets[index];

                const response = await API.post("/medanpedia/order", {
                    service: service.service_id,
                    target: target.username,
                    quantity: target.quantity,
                    price: price
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const orderId = response.data.order_id;
                saveOrder = await API.post("/customer/transaction", {
                    name: service.name,
                    service_id: service.service_id,
                    order_id: orderId,
                    type: "suntik",
                    price: price,
                    quantity: target.quantity,
                    status: "berhasil"
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            SwalMessage({
                icon: "success",
                title: "Berhasil!",
                text: saveOrder?.data.message
            });

            return {
                success: true,
            }
        } catch (error: any) {
            if (error) {
                SwalMessage({
                    icon: "error",
                    title: "Gagal!",
                    text: error?.response?.data.message
                })

                return {
                    success: false,
                }
            }
        }
    }

    return {
        transactionData,
        handleTransactionAdaOtp,
        handleTransactionMedanPedia,
        handleTransactionVirtusim
    }
}
