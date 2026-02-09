/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/server/API';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function useDepositHooks() {
    const [amount, setAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState<any>(null);
    const token = localStorage.getItem('token');
    const MOCK_PAID = true;

    const quickAmounts = [
        { value: 5000, label: 'Rp 5.000' },
        { value: 10000, label: 'Rp 10.000' },
        { value: 25000, label: 'Rp 25.000' },
        { value: 50000, label: 'Rp 50.000' },
        { value: 100000, label: 'Rp 100.000' },
        { value: 250000, label: 'Rp 250.000' },
        { value: 500000, label: 'Rp 500.000' },
        { value: 1000000, label: 'Rp 1.000.000' },
    ];

    const resetDeposit = () => {
        setPaymentData(null);
        setAmount('');
        setSelectedAmount(null);
    };

    const isExpired = (expiredAt: string) => {
        if (!expiredAt) return false;
        return new Date(expiredAt).getTime() <= Date.now();
    };

    const handleQuickAmount = (value: number) => {
        setSelectedAmount(value);
        setAmount(value.toString());
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[.,]/g, '');
        setAmount(value);
        setSelectedAmount(null);
    };

    const handleDeposit = async () => {
        try {
            const cleanAmount = amount.replace(/[.,]/g, '');
            const numAmount = parseInt(cleanAmount);

            if (!numAmount || numAmount < 2000) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Perhatian',
                    text: 'Minimal deposit Rp 2.000',
                    confirmButtonColor: '#9333ea',
                });
                return;
            }

            setLoading(true);

            const response = await API.post('/iskapay/payments', {
                amount: numAmount,
                customer_name: 'Customer Deposit',
            });

            setPaymentData(response.data.data);

            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'QRIS berhasil dibuat!',
                confirmButtonColor: '#9333ea',
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal membuat pembayaran',
                confirmButtonColor: '#9333ea',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!paymentData) return;

        const result = await Swal.fire({
            icon: 'warning',
            title: 'Konfirmasi',
            text: 'Batalkan deposit?',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);

            await API.post(
                `/iskapay/payments/${paymentData.merchant_order_id}/cancel`,
            );

            resetDeposit();

            Swal.fire({
                icon: 'success',
                title: 'Deposit dibatalkan',
                confirmButtonColor: '#9333ea',
            });
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal membatalkan',
                text: error,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSaldo = async (paidAmount: number) => {
        try {
            setLoading(true);

            await API.put(
                `/update/saldo`,
                {
                    saldo: paidAmount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal membuat pembayaran',
                confirmButtonColor: '#9333ea',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateHistory = async (
        paidAmount: number,
        merchant_order_id: string,
        payment_method: string,
    ) => {
        try {
            setLoading(true);

            await API.post(
                `/history/user/create`,
                {
                    amount: paidAmount,
                    merchant_order_id: merchant_order_id,
                    payment_method: payment_method,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal membuat pembayaran',
                confirmButtonColor: '#9333ea',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!paymentData?.merchant_order_id) return;

        const interval = setInterval(async () => {
            try {
                let updated;
                if (MOCK_PAID) {
                    updated = {
                        status: 'paid',
                        amount: paymentData.amount,
                        merchant_order_id: paymentData.merchant_order_id,
                        payment_method: paymentData.payment_method,
                    };
                } else {
                    const res = await API.get(
                        `/iskapay/payments/${paymentData.merchant_order_id}`,
                    );

                    updated = res.data.data;
                }

                if (updated) {
                    setPaymentData((prev: any) => ({
                        ...prev,
                        ...updated,
                    }));
                }

                if (updated?.status === 'paid') {
                    clearInterval(interval);

                    await handleUpdateSaldo(updated.amount);
                    await handleCreateHistory(
                        updated.amount,
                        updated.merchant_order_id,
                        updated.payment_method,
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'Pembayaran berhasil',
                    });

                    resetDeposit();
                    return;
                }

                if (updated?.status === 'failed') {
                    clearInterval(interval);

                    Swal.fire({
                        icon: 'error',
                        title: 'Pembayaran gagal',
                    });

                    resetDeposit();
                    return;
                }

                if (updated?.expired_at && isExpired(updated.expired_at)) {
                    clearInterval(interval);

                    Swal.fire({
                        icon: 'warning',
                        title: 'QR sudah expired',
                        text: 'Silakan buat deposit baru',
                    });

                    resetDeposit();
                    return;
                }
            } catch (err) {
                console.error('Check status failed', err);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [paymentData?.merchant_order_id]);

    return {
        amount,
        selectedAmount,
        loading,
        paymentData,
        quickAmounts,

        handleAmountChange,
        handleQuickAmount,
        handleDeposit,
        handleCancel,
        setAmount,
        resetDeposit,
        isExpired,
    };
}
