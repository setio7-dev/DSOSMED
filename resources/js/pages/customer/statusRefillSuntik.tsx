import CustomerDashboard from '@/components/customer/customerDashboard';
import useTransactionHooks from '@/hooks/transactionHooks';
import { TransactionProps } from '@/types';
import { Search, Package, RefreshCw, CheckCircle, XCircle, Clock, ChevronRight, Info } from 'lucide-react';
import React, { useState } from 'react';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { FormatDate } from '@/utils/FormatDate';

type RefillStatusResult = {
    order_id: string | number;
    refill_id: string | number;
    status: string;
};

export default function StatusRefillSuntik() {
    const { transactionData, handleCheckSuntikRefill } = useTransactionHooks();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<TransactionProps | null>(null);
    const [statusResult, setStatusResult] = useState<RefillStatusResult | null>(null);
    const [checking, setChecking] = useState(false);

    const refillOrders = transactionData.filter(
        (order: TransactionProps) =>
            order.type === 'suntik' &&
            order.status === 'berhasil (isi ulang)' &&
            (order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.order_id.toString().includes(searchQuery)),
    );

    const handleSelect = async (order: TransactionProps) => {
        setSelectedOrder(order);
        setStatusResult(null);
        setChecking(true);
        const result = await handleCheckSuntikRefill(order);
        setStatusResult(result ?? null);
        setChecking(false);
    };

    const handleRecheck = async () => {
        if (!selectedOrder) return;
        setChecking(true);
        const result = await handleCheckSuntikRefill(selectedOrder);
        setStatusResult(result ?? null);
        setChecking(false);
    };

    const getStatusStyle = (status: string) => {
        const s = status?.toLowerCase();
        if (s === 'completed' || s === 'berhasil') return { color: 'text-green-400', bg: 'bg-green-400/20 border-green-500/30', icon: CheckCircle };
        if (s === 'in progress' || s === 'partial' || s === 'processing') return { color: 'text-yellow-400', bg: 'bg-yellow-400/20 border-yellow-500/30', icon: Clock };
        if (s === 'canceled' || s === 'failed' || s === 'gagal') return { color: 'text-red-400', bg: 'bg-red-400/20 border-red-500/30', icon: XCircle };
        return { color: 'text-gray-400', bg: 'bg-gray-400/20 border-gray-500/30', icon: Clock };
    };

    return (
        <CustomerDashboard title="Status Refill Suntik">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-white">Cek Status Refill Suntik</h1>
                    <p className="mt-0.5 text-sm text-gray-400">Pilih pesanan refill untuk mengecek status terkini</p>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/20">
                        <Info className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-blue-300">Cara Cek Status Refill</p>
                        <p className="text-xs leading-relaxed text-gray-400">
                            Pilih pesanan Suntik yang sudah direfill dari daftar di bawah untuk mengecek status refill terbaru dari provider.
                        </p>
                    </div>
                </div>

                {selectedOrder && (
                    <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-purple-300">Hasil Cek Status Refill</p>
                            <button
                                onClick={handleRecheck}
                                disabled={checking}
                                className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/20 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-500/30 transition-all disabled:opacity-50"
                            >
                                <RefreshCw className={`h-3 w-3 ${checking ? 'animate-spin' : ''}`} />
                                Cek Ulang
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="space-y-1">
                                <p className="text-gray-400">Pesanan</p>
                                <p className="text-sm font-semibold text-white">{selectedOrder.name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-400">Order ID</p>
                                <p className="text-sm font-mono text-white">{selectedOrder.order_id}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-400">Target</p>
                                <p className="text-sm font-mono text-white truncate">{selectedOrder.target || '-'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-400">Harga</p>
                                <p className="text-sm font-semibold text-white">{FormatRupiah(selectedOrder.price)}</p>
                            </div>
                        </div>

                        {checking ? (
                            <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-600/30 bg-gray-800/50 py-4">
                                <RefreshCw className="h-4 w-4 animate-spin text-purple-400" />
                                <span className="text-sm text-gray-400">Mengecek status refill...</span>
                            </div>
                        ) : statusResult ? (
                            <div className="space-y-3">
                                {(() => {
                                    const style = getStatusStyle(statusResult.status);
                                    const StatusIcon = style.icon;
                                    return (
                                        <div className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${style.bg}`}>
                                            <StatusIcon className={`h-4 w-4 ${style.color}`} />
                                            <span className={`text-sm font-semibold ${style.color}`}>
                                                {statusResult.status}
                                            </span>
                                        </div>
                                    );
                                })()}

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="rounded-lg border border-gray-600/30 bg-gray-800/50 px-3 py-2.5 space-y-1">
                                        <p className="text-xs text-gray-400">Order ID</p>
                                        <p className="text-sm font-mono text-white">{statusResult.order_id}</p>
                                    </div>
                                    <div className="rounded-lg border border-gray-600/30 bg-gray-800/50 px-3 py-2.5 space-y-1">
                                        <p className="text-xs text-gray-400">Refill ID</p>
                                        <p className="text-sm font-mono text-white">{statusResult.refill_id}</p>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}

                <div className="space-y-4 rounded-lg bg-black/30 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-200 lg:text-lg">Pilih Pesanan Refill</h2>
                        {refillOrders.length > 0 && (
                            <span className="rounded-lg border border-purple-500/30 bg-purple-500/20 px-2.5 py-1 text-xs font-semibold text-purple-400">
                                {refillOrders.length} order
                            </span>
                        )}
                    </div>

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

                    {refillOrders.length === 0 ? (
                        <div className="py-10 text-center">
                            <Package className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">Tidak ada pesanan refill ditemukan</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {refillOrders.map((order: TransactionProps) => {
                                const isSelected = selectedOrder?.order_id === order.order_id;

                                return (
                                    <button
                                        key={order.order_id}
                                        onClick={() => handleSelect(order)}
                                        disabled={checking}
                                        className={`w-full text-left rounded-xl border p-4 transition-all disabled:opacity-60 ${
                                            isSelected
                                                ? 'border-purple-500/50 bg-purple-500/10'
                                                : 'border-gray-600/30 bg-gray-700/30 hover:border-purple-500/30 hover:bg-gray-700/40'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                                                <Package className="h-4 w-4 text-purple-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-white">{order.name}</p>
                                                <p className="text-xs text-gray-400">Order ID: {order.order_id}</p>
                                            </div>
                                            {isSelected ? (
                                                <span className="flex-shrink-0 rounded-lg border border-purple-500/30 bg-purple-500/20 px-2.5 py-1 text-xs font-semibold text-purple-400">
                                                    Dipilih
                                                </span>
                                            ) : (
                                                <ChevronRight className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-600/30 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-gray-400">Target:</span>
                                                <span className="text-white font-medium truncate">{order.target || '-'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-gray-400">Qty:</span>
                                                <span className="text-white font-medium">{order.quantity}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-gray-400">Harga:</span>
                                                <span className="text-white font-medium">{FormatRupiah(order.price)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-gray-400">Tanggal:</span>
                                                <span className="text-white font-medium">{FormatDate(String(order.created_at))}</span>
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