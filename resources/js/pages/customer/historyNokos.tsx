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
} from 'lucide-react';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { useAuth } from '@/context/authContext';
import SpinnerLoader from '@/ui/SpinnerLoader';
import useTransactionHooks from '@/hooks/transactionHooks';
import { FormatDate } from '@/utils/FormatDate';
import { FormatPhone } from '@/utils/FormatPhone';

export default function HistoryNokos() {
    const [searchQuery, setSearchQuery] = useState('');
    const { loading } = useAuth();
    const { transactionData } = useTransactionHooks();

    const statusConfig = {
        berhasil: { label: 'Berhasil', color: 'text-green-400', bg: 'bg-green-400/20', icon: CheckCircle },
        gagal: { label: 'Gagal', color: 'text-red-400', bg: 'bg-red-400/20', icon: XCircle },
    };

    const filteredOrders = transactionData.filter(order => {
        const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.order_id.toString().toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = order.type.includes("nokos");
        return matchesSearch && matchesType;
    });

    if (loading) {
        return <SpinnerLoader/> 
    }
    return (
        <CustomerDashboard>
            <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl font-bold text-white">History Order</h1>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari order..."
                                className="bg-gray-700/30 border border-gray-600/30 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500/50 w-full sm:w-64"
                            />
                        </div>
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-12 text-center">
                        <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400 text-sm">
                            {searchQuery ? 'Tidak ada order yang sesuai dengan filter' : 'Belum ada history order'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => {
                            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock;
                            const statusStyle = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.berhasil;

                            return (
                                <div
                                    key={order.order_id}
                                    className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-4 hover:bg-gray-700/40 transition-all"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-white font-semibold mb-1">{order.name}</h3>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <span className="font-mono">{order.order_id}</span>
                                                        <span>•</span>
                                                        <span className="capitalize">{order.type}</span>
                                                    </div>
                                                </div>
                                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${statusStyle.bg}`}>
                                                    <StatusIcon className={`w-4 h-4 ${statusStyle.color} ${order.status === 'Diproses' ? 'animate-spin' : ''}`} />
                                                    <span className={`text-xs font-semibold ${statusStyle.color}`}>
                                                        {statusStyle.label}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Hash className="w-4 h-4 text-purple-400" />
                                                    <span className="text-gray-400">Qty:</span>
                                                    <span className="text-white font-semibold">{order.quantity}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <DollarSign className="w-4 h-4 text-green-400" />
                                                    <span className="text-gray-400">Harga:</span>
                                                    <span className="text-white font-semibold">{FormatRupiah(order.price)}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Phone className="w-4 h-4 text-green-400" />
                                                    <span className="text-gray-400">Nomor:</span>
                                                    <span className="text-white font-semibold">{FormatPhone(String(order.result))}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm col-span-2 sm:col-span-1">
                                                    <Calendar className="w-4 h-4 text-blue-400" />
                                                    <span className="text-gray-400 text-xs">
                                                        {FormatDate(String(order.created_at))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {filteredOrders.length > 0 && (
                    <div className="text-center text-sm text-gray-400">
                        Menampilkan {filteredOrders.length} order
                    </div>
                )}
            </div>
        </CustomerDashboard>
    );
}