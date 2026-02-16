/* eslint-disable prefer-const */
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
    ListOrdered,
    Download,
} from 'lucide-react';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { useAuth } from '@/context/authContext';
import SpinnerLoader from '@/ui/SpinnerLoader';
import useTransactionHooks from '@/hooks/transactionHooks';
import { FormatDate } from '@/utils/FormatDate';

export default function HistorySuntik() {
    const [searchQuery, setSearchQuery] = useState('');
    const { loading, user } = useAuth();
    const { transactionData } = useTransactionHooks();

    const statusConfig = {
        berhasil: { label: 'Berhasil', color: 'text-green-400', bg: 'bg-green-400/20', icon: CheckCircle },
        gagal: { label: 'Gagal', color: 'text-red-400', bg: 'bg-red-400/20', icon: XCircle },
    };

    const handleDownloadResi = (order: any) => {
        const scale = 4;

        const cssWidth = 500;
        const cssHeight = 172;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = cssWidth * scale;
        canvas.height = cssHeight * scale;
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;

        ctx.scale(scale, scale);
        ctx.imageSmoothingEnabled = false;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, cssWidth, cssHeight);

        ctx.fillStyle = '#6e6e6e';
        ctx.fillRect(0, 0, cssWidth, 22);
        ctx.fillRect(0, cssHeight - 22, cssWidth, 22);

        ctx.font = '12px Courier New, monospace';
        ctx.fillStyle = '#000000';
        ctx.fillText(`Username: ${user?.username || 'N/A'}`, 12, 15);

        ctx.font = '11px Courier New, monospace';
        ctx.fillStyle = '#ffffff';

        let x = 12;
        let y = 42;
        const lineHeight = 14;
        const maxWidth = cssWidth - 24;

        ctx.fillText(`ID Pesanan: ${order.order_id}`, x, y);
        y += lineHeight;

        wrapText(ctx, `Layanan: ${order.name}`, x, y, maxWidth, lineHeight);
        y += lineHeight * getLineCount(ctx, `Layanan: ${order.name}`, maxWidth);

        wrapText(ctx, `Target: ${order.target || 'N/A'}`, x, y, maxWidth, lineHeight);
        y += lineHeight * getLineCount(ctx, `Target: ${order.target || 'N/A'}`, maxWidth);

        ctx.fillText(`Jumlah Pesan: ${order.quantity}`, x, y);
        y += lineHeight;

        ctx.fillText('==============================================', x, y);
        y += lineHeight;

        let statusText = 'Proses sedang berlangsung';
        let statusColor = '#00ff00';

        if (order.status === 'berhasil') {
            statusText = 'Selesai';
        } else if (order.status === 'gagal') {
            statusText = 'Gagal';
            statusColor = '#ff6464';
        }

        ctx.fillStyle = statusColor;
        ctx.fillText(statusText, x, y);

        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resi_${order.order_id}.png`;
            a.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    };

    const wrapText = (
        ctx: CanvasRenderingContext2D,
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        lineHeight: number
    ) => {
        const words = text.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            if (ctx.measureText(testLine).width > maxWidth && line) {
                ctx.fillText(line, x, y);
                y += lineHeight;
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }

        if (line) ctx.fillText(line, x, y);
    };

    const getLineCount = (
        ctx: CanvasRenderingContext2D,
        text: string,
        maxWidth: number
    ) => {
        const words = text.split(' ');
        let line = '';
        let count = 1;

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            if (ctx.measureText(testLine).width > maxWidth && line) {
                count++;
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }

        return count;
    };


    const filteredOrders = transactionData.filter(order => {
        const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.order_id.toString().toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = order.type.includes("suntik");
        return matchesSearch && matchesType;
    });

    if (loading) {
        return <SpinnerLoader />
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
                                                <div className="flex items-center gap-2">
                                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${statusStyle.bg}`}>
                                                        <StatusIcon className={`w-4 h-4 ${statusStyle.color} ${order.status === 'Diproses' ? 'animate-spin' : ''}`} />
                                                        <span className={`text-xs font-semibold ${statusStyle.color}`}>
                                                            {statusStyle.label}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDownloadResi(order)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg transition-all"
                                                        title="Download Resi"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        <span className="text-xs font-semibold hidden sm:inline">Download</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <ListOrdered className="w-4 h-4 text-orange-400" />
                                                    <span className="text-gray-400">Order Id:</span>
                                                    <span className="text-white font-semibold">{order.order_id}</span>
                                                </div>
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