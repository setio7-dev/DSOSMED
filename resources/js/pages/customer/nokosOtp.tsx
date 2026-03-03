/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CustomerDashboard from '@/components/customer/customerDashboard';
import useTransactionHooks from '@/hooks/transactionHooks';
import { TransactionProps } from '@/types';
import { Info, Key, Search, RefreshCw, Copy, Check, Phone } from 'lucide-react';
import { useState } from 'react';

type OtpResult = {
    order_id?: string | number;
    id?: string | number;
    sms: string;
    nomor?: string;
};

export default function NokosOtp() {
    const { transactionData, handleCheckNokosOtp } = useTransactionHooks();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<TransactionProps | null>(null);
    const [otpResult, setOtpResult] = useState<OtpResult | null>(null);
    const [checking, setChecking] = useState(false);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const nokosOrders = transactionData.filter((order: TransactionProps) => {
        const typeFilter = order.type === 'nokos';
        const searchFilter = order.name.toLowerCase().includes(searchQuery.toLowerCase()) || order.order_id.toString().includes(searchQuery);
        const statusFilter = order.status === 'berhasil' || 'pending';
        return typeFilter && searchFilter && statusFilter;
    });

    const handleSelect = async (order: TransactionProps) => {
        setSelectedOrder(order);
        setOtpResult(null);
        setChecking(true);
        const result = await handleCheckNokosOtp(order);
        setOtpResult(result ?? null as any);
        setChecking(false);
    };

    const handleRecheck = async () => {
        if (!selectedOrder) return;
        setChecking(true);
        const result = await handleCheckNokosOtp(selectedOrder);
        setOtpResult(result ?? null as any);
        setChecking(false);
    };

    const handleCopy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const otpColor = checking
        ? 'border-gray-600/30 bg-gray-800/50 text-gray-400'
        : otpResult?.sms === 'expired'
            ? 'border-red-500/30 bg-red-500/10 text-red-400'
            : otpResult?.sms && otpResult.sms !== 'menunggu'
                ? 'border-green-500/30 bg-green-500/10 text-green-400'
                : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400';

    return (
        <CustomerDashboard>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-white">OTP Nokos</h1>
                    <p className="mt-0.5 text-sm text-gray-400">
                        Pilih pesanan Nokos untuk cek OTP
                    </p>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/20">
                        <Info className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-blue-300">Cara Kerja OTP Nokos</p>
                        <p className="text-xs leading-relaxed text-gray-400">
                            Pilih pesanan Nokos dari daftar di bawah, lalu sistem akan otomatis mengecek OTP untuk pesanan tersebut.
                        </p>
                    </div>
                </div>

                {selectedOrder && (
                    <div className="space-y-4 rounded-lg border border-purple-500/20 bg-purple-500/10 p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-purple-300">Hasil Cek OTP</p>
                            <button
                                onClick={handleRecheck}
                                disabled={checking}
                                className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/20 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-500/30 transition-all disabled:opacity-50"
                            >
                                <RefreshCw className={`h-3 w-3 ${checking ? 'animate-spin' : ''}`} />
                                Cek Ulang
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-400">Pesanan</label>
                                <p className="text-sm font-medium text-white">{selectedOrder.name}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400">Order ID</label>
                                <p className="text-sm font-mono text-white">{selectedOrder.order_id}</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 flex items-center gap-1.5">
                                <Phone className="h-3 w-3" />
                                Nomor
                            </label>
                            <div className="flex items-center gap-2 rounded-lg border border-gray-600/30 bg-gray-800/50 px-3 py-2">
                                <span className="text-sm font-mono text-white flex-1">
                                    {checking ? 'Mengecek...' : (otpResult?.nomor || selectedOrder.result || '-')}
                                </span>
                                {(otpResult?.nomor || selectedOrder.result) && !checking && (
                                    <button
                                        onClick={() => handleCopy(String(otpResult?.nomor || selectedOrder.result), 'nomor')}
                                        className="flex-shrink-0 text-gray-400 hover:text-purple-400 transition-colors"
                                    >
                                        {copiedKey === 'nomor' ? (
                                            <Check className="h-3.5 w-3.5 text-green-400" />
                                        ) : (
                                            <Copy className="h-3.5 w-3.5" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 flex items-center gap-1.5">
                                <Key className="h-3 w-3" />
                                OTP
                            </label>
                            <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${otpColor}`}>
                                <span className="text-sm font-mono flex-1">
                                    {checking ? 'Mengecek...' : (otpResult?.sms || '')}
                                </span>
                                {!checking && otpResult?.sms && otpResult.sms !== 'menunggu' && otpResult.sms !== 'expired' && (
                                    <button
                                        onClick={() => handleCopy(otpResult.sms, 'otp')}
                                        className="flex-shrink-0 hover:opacity-70 transition-opacity"
                                    >
                                        {copiedKey === 'otp' ? (
                                            <Check className="h-3.5 w-3.5 text-green-400" />
                                        ) : (
                                            <Copy className="h-3.5 w-3.5" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4 rounded-lg bg-black/30 p-6 backdrop-blur-sm">
                    <h2 className="text-sm font-semibold text-gray-200 lg:text-lg">
                        Pilih Pesanan Nokos
                    </h2>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari order..."
                            className="w-full rounded-lg border border-gray-600/30 bg-gray-700/30 pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                        />
                    </div>

                    {nokosOrders.length === 0 ? (
                        <div className="py-10 text-center text-sm text-gray-400">
                            Tidak ada pesanan Nokos ditemukan
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {nokosOrders.map((order: TransactionProps) => {
                                const isSelected = selectedOrder?.order_id === order.order_id;

                                return (
                                    <button
                                        key={order.order_id}
                                        onClick={() => handleSelect(order)}
                                        disabled={checking}
                                        className={`w-full text-left space-y-2 rounded-xl border p-4 transition-all disabled:opacity-60 ${
                                            isSelected
                                                ? 'border-purple-500/50 bg-purple-500/10'
                                                : 'border-gray-600/30 bg-gray-700/30 hover:border-purple-500/30 hover:bg-gray-700/40'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                                                <Key className="h-4 w-4 text-purple-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-white">
                                                    {order.name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Order ID: {order.order_id}
                                                </p>
                                            </div>
                                            {isSelected && (
                                                <span className="flex-shrink-0 rounded-lg border border-purple-500/30 bg-purple-500/20 px-2.5 py-1 text-xs font-semibold text-purple-400">
                                                    Dipilih
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-600/30 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-gray-400">Nomor:</span>
                                                <span className="text-white font-medium truncate">{order.result || '-'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-gray-400">Status:</span>
                                                <span className={`font-medium capitalize ${
                                                    order.status === 'berhasil'
                                                        ? 'text-green-400'
                                                        : order.status === 'gagal'
                                                            ? 'text-red-400'
                                                            : 'text-yellow-400'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </CustomerDashboard>
    );
}