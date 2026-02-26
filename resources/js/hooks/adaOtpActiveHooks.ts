/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/server/API";
import { useEffect, useState } from "react";
import { SwalMessage } from "@/utils/SwalMessage";
import { AdaOtpOrderApiProps } from "@/types";


export default function useAdaOtpActiveHooks() {
    const token = localStorage.getItem("token");
    const [activeOrders, setActiveOrders] = useState<AdaOtpOrderApiProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [cancellingOrders, setCancellingOrders] = useState<number[]>([]);
    const [processingOrders, setProcessingOrders] = useState<number[]>([]);
    const [pendingCancelOrders, setPendingCancelOrders] = useState<number[]>([]);

    const fetchActiveOrders = async () => {
        try {
            const response = await API.get("/adaotp/orders/status", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setActiveOrders(response.data.data.orders);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActiveOrders();

        const interval = setInterval(() => {
            fetchActiveOrders();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        activeOrders.forEach(order => {

            const minutesPassed = (1200 - order.remaining_time) / 60;
            if (
                order.status === "active" &&
                minutesPassed >= 17 &&
                !processingOrders.includes(order.id)
            ) {
                handleCancelOrder(order.id);
            }

            if (
                pendingCancelOrders.includes(order.id) &&
                minutesPassed >= 5 &&
                !processingOrders.includes(order.id)
            ) {
                handleCancelOrder(order.id);
            }

        });
    }, [activeOrders]);

    const handleCancelOrder = async (orderId: number) => {
        try {
            setProcessingOrders(prev => [...prev, orderId]);

            const response = await API.delete(`/adaotp/orders/cancel/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                SwalMessage({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Order berhasil dibatalkan"
                });

                setPendingCancelOrders(prev => prev.filter(id => id !== orderId));
                fetchActiveOrders();
            }

        } catch (error: any) {
            SwalMessage({
                icon: "error",
                title: "Gagal!",
                text: error?.response?.data?.message
            });
        } finally {
            setProcessingOrders(prev => prev.filter(id => id !== orderId));
        }
    };

    const requestCancelOrder = (orderId: number, remainingTime: number) => {
        const minutesPassed = (1200 - remainingTime) / 60;

        if (minutesPassed < 5) {
            setPendingCancelOrders(prev => [...prev, orderId]);

            SwalMessage({
                icon: "info",
                title: "Menunggu 5 Menit",
                text: "Order akan dibatalkan otomatis setelah 5 menit."
            });

            return;
        }

        handleCancelOrder(orderId);
    };

    const handleFinishOrder = async (orderId: number) => {
        try {
            const response = await API.post(`/adaotp/finish/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                SwalMessage({
                    icon: "success",
                    title: "Selesai!",
                    text: "Order berhasil diselesaikan"
                });

                fetchActiveOrders();
            }

        } catch (error: any) {
            SwalMessage({
                icon: "error",
                title: "Gagal!",
                text: error?.response?.data?.message
            });
        }
    };

    return {
        activeOrders,
        loading,
        handleCancelOrder,
        handleFinishOrder,
        cancellingOrders,
        setCancellingOrders,
        setPendingCancelOrders,
        setProcessingOrders,
        processingOrders,
        pendingCancelOrders,
        requestCancelOrder
    };
}
