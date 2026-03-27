/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import CustomerDashboard from '@/components/customer/customerDashboard';
import {
    Package,
    Calendar,
    Hash,
    DollarSign,
    Search,
    Clock,
    CheckCircle,
    XCircle,
    Phone,
    Copy,
    Check,
    Loader2,
    Ban,
} from 'lucide-react';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { useAuth } from '@/context/authContext';
import SpinnerLoader from '@/ui/SpinnerLoader';
import useTransactionHooks from '@/hooks/transactionHooks';
import { FormatDate } from '@/utils/FormatDate';
import { FormatPhone } from '@/utils/FormatPhone';

export default function HistoryNokos() {
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedId, setCopiedId] = useState<string | number | null>(null);
    const [cancelingId, setCancelingId] = useState<string | number | null>(null);
    const { loading } = useAuth();
    const { transactionData, handleCancelNokos } = useTransactionHooks();

    const statusConfig = {
        berhasil: { label: 'Berhasil', color: 'text-green-400', bg: 'bg-green-400/20', icon: CheckCircle },
        pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-400/20', icon: Loader2 },
        gagal: { label: 'Gagal', color: 'text-red-400', bg: 'bg-red-400/20', icon: XCircle },
    };

    const filteredOrders = transactionData.filter(order => {
        const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.order_id.toString().toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = order.type.includes("nokos");
        return matchesSearch && matchesType;
    });

    const handleCopyNumber = (number: string, id: string | number) => {
        navigator.clipboard.writeText(number);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleCancel = async (nokosItem: any) => {
        setCancelingId(nokosItem.order_id);
        await handleCancelNokos(nokosItem);
        setCancelingId(null);
    };

    if (loading) {
        return <SpinnerLoader />;
    }

    return (
        <CustomerDashboard>
            <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">History Order</h1>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari order..."
                            className="bg-gray-700/30 border border-gray-600/30 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500/50 w-full"
                        />
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-8 sm:p-12 text-center">
                        <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-3 sm:mb-4" />
                        <p className="text-gray-400 text-xs sm:text-sm">
                            {searchQuery ? 'Tidak ada order yang sesuai dengan filter' : 'Belum ada history order'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3 sm:space-y-4">
                        {filteredOrders.map((order) => {
                            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock;
                            const statusStyle = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.berhasil;
                            const isCanceling = cancelingId === order.order_id;
                            const canCancel = order.status === 'pending' && !isCanceling;

                            return (
                                <div
                                    key={order.order_id}
                                    className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-3 sm:p-4 hover:bg-gray-700/40 transition-all"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-semibold text-sm sm:text-base mb-1">{order.name}</h3>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                    <span className="font-mono">Order ID: {order.order_id}</span>
                                                    <span>•</span>
                                                    <span className="capitalize">{order.type}</span>
                                                </div>
                                            </div>
                                            <div className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg ${statusStyle.bg} flex-shrink-0`}>
                                                <StatusIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${statusStyle.color} ${order.status === 'pending' ? 'animate-spin' : ''}`} />
                                                <span className={`text-xs font-semibold ${statusStyle.color}`}>
                                                    {statusStyle.label}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2 border-t border-gray-600/30">
                                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                                                <span className="text-gray-400">Jumlah:</span>
                                                <span className="text-white font-semibold">{order.quantity}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                                                <span className="text-gray-400">Harga:</span>
                                                <span className="text-white font-semibold">{FormatRupiah(order.price)}</span>
                                            </div>
                                            <div className="flex items-center w-fit gap-2 text-xs sm:text-sm">
                                                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                                                <span className="text-gray-400">Nomor:</span>
                                                <span className="text-white font-semibold font-mono flex-1 truncate">
                                                    {FormatPhone(String(order.result))}
                                                </span>
                                                {order.result && (
                                                    <button
                                                        onClick={() => handleCopyNumber(String(order.result), order.order_id)}
                                                        className="flex-shrink-0 text-gray-400 hover:text-purple-400 transition-colors"
                                                    >
                                                        {copiedId === order.order_id ? (
                                                            <Check className="w-3.5 h-3.5 text-green-400" />
                                                        ) : (
                                                            <Copy className="w-3.5 h-3.5" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                                                <span className="text-gray-400">
                                                    {FormatDate(String(order.created_at))}
                                                </span>
                                            </div>
                                        </div>

                                        {canCancel && (
                                            <div className="pt-2 border-t border-gray-600/30">
                                                <button
                                                    onClick={() => handleCancel(order)}
                                                    disabled={isCanceling}
                                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 active:scale-95"
                                                >
                                                    {isCanceling ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <Ban className="w-3.5 h-3.5" />
                                                    )}
                                                    {isCanceling ? 'Membatalkan...' : 'Batalkan Orderan'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {filteredOrders.length > 0 && (
                    <div className="text-center text-xs sm:text-sm text-gray-400">
                        Menampilkan {filteredOrders.length} order
                    </div>
                )}
            </div>
        </CustomerDashboard>
    );
}