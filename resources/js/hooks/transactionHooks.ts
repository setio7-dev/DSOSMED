/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import { SwalMessage } from '@/utils/SwalMessage';

export default function useTransactionHooks() {
    const token = localStorage.getItem("token");

    const handleTransactionAdaOtp = async(price: number, country: string, serviceId: number) => {
        try {
            const response = await API.post("/adaotp/order", {
                price: price,
                country: country,
                service_id: serviceId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            localStorage.setItem("order", JSON.stringify(response.data))
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
                order_id: orderId,
                type: "Nokos",
                price: price,
                status: "Diproses"
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

                console.error(error);
            }
        }
    }

    return {
        handleTransactionAdaOtp
    }
}
