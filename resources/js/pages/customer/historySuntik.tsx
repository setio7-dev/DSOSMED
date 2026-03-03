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
    ShoppingBag,
    CheckCircle2,
} from 'lucide-react';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { useAuth } from '@/context/authContext';
import SpinnerLoader from '@/ui/SpinnerLoader';
import useTransactionHooks from '@/hooks/transactionHooks';
import { FormatDate } from '@/utils/FormatDate';
import { TransactionProps } from '@/types';

const STATUS_CONFIG = {
    berhasil: {
        label: 'Berhasil',
        color: 'text-green-400',
        bg: 'bg-green-400/20',
        icon: CheckCircle,
    },
    'berhasil (isi ulang)': {
        label: 'Berhasil (Isi Ulang)',
        color: 'text-green-400',
        bg: 'bg-green-400/20',
        icon: CheckCircle2,
    },
    pending: {
        label: 'Pending',
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/20',
        icon: Clock,
    },
    gagal: {
        label: 'Gagal',
        color: 'text-red-400',
        bg: 'bg-red-400/20',
        icon: XCircle,
    },
};

type Order = {
    order_id: string | number;
    name: string;
    type: string;
    target: string;
    quantity: number;
    price: number;
    status: string;
    created_at: string | Date;
};

function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
) {
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
}

function getLineCount(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
): number {
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
}

function getRefillButtonStyle(status: string) {
    if (status === 'gagal') {
        return {
            className:
                'flex items-center gap-1.5 px-2.5 py-1.5 bg-red-600/20 text-red-300 rounded-lg cursor-not-allowed opacity-60',
            disabled: true,
            text: 'Tidak Bisa Direfil',
        };
    }
    if (status === 'berhasil (isi ulang)') {
        return {
            className:
                'flex items-center gap-1.5 px-2.5 py-1.5 bg-green-600/20 text-green-300 rounded-lg cursor-default',
            disabled: true,
            text: 'Berhasil Direfil',
        };
    }
    if (status === 'berhasil') {
        return {
            className:
                'flex items-center gap-1.5 px-2.5 py-1.5 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 rounded-lg transition-all',
            disabled: false,
            text: ' Proses Refill',
        };
    }
    return {
        className:
            'flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-600/20 text-gray-400 rounded-lg cursor-not-allowed opacity-60',
        disabled: true,
        text: 'Pending',
    };
}

export default function HistorySuntik() {
    const [searchQuery, setSearchQuery] = useState('');
    const { loading, user } = useAuth();
    const { transactionData, handleTransactionSuntikRefill } = useTransactionHooks();

    const handleDownloadResi = (order: Order) => {
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

        const x = 12;
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
        let statusColor = '#facc15';

        if (order.status === 'berhasil' || order.status === 'berhasil (isi ulang)') {
            statusText = 'Selesai';
            statusColor = '#00ff00';
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

    const filteredOrders = transactionData.filter((order: TransactionProps) => {
        const matchesSearch =
            order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.order_id.toString().toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch && order.type.includes('suntik');
    });

    if (loading) return <SpinnerLoader />;

    return (
        <CustomerDashboard>
            <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">History Order</h1>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari order..."
                            className="w-full bg-gray-700/30 border border-gray-600/30 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                        />
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-8 text-center">
                        <Package className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400 text-xs sm:text-sm">
                            {searchQuery
                                ? 'Tidak ada order yang sesuai dengan filter'
                                : 'Belum ada history order'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredOrders.map((order: TransactionProps) => {
                            const statusStyle =
                                STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] ||
                                STATUS_CONFIG.pending;
                            const StatusIcon = statusStyle.icon || Clock;
                            const refillStyle = getRefillButtonStyle(order.status);

                            return (
                                <div
                                    key={order.order_id}
                                    onClick={() => handleDownloadResi(order as any)}
                                    className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-3 sm:p-4 hover:bg-gray-700/40 transition-all cursor-pointer"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                                                    {order.name}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-1 text-xs text-gray-400">
                                                    <span className="font-mono">{order.order_id}</span>
                                                    <span>•</span>
                                                    <span className="capitalize">{order.type}</span>
                                                    <span>•</span>
                                                    <span className="font-mono">Target: {order.target}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <div
                                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${statusStyle.bg}`}
                                            >
                                                <StatusIcon className={`w-3.5 h-3.5 ${statusStyle.color}`} />
                                                <span className={`text-xs font-semibold ${statusStyle.color}`}>
                                                    {statusStyle.label}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!refillStyle.disabled) {
                                                        if ((order as any).api_type === 'miraipedia') {
                                                            window.open(
                                                                `https://t.me/zyrena13?text=${encodeURIComponent(`REFILL ${order.order_id}`)}`,
                                                                '_blank'
                                                            );
                                                        } else {
                                                            handleTransactionSuntikRefill(order);
                                                        }
                                                    }
                                                }}
                                                disabled={refillStyle.disabled}
                                                className={refillStyle.className}
                                            >
                                                <ShoppingBag className="w-3.5 h-3.5" />
                                                <span className="text-xs font-semibold">{refillStyle.text}</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-600/30">
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <ListOrdered className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                                                <span className="text-gray-400">Order:</span>
                                                <span className="text-white font-semibold">{order.order_id}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <Hash className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                                                <span className="text-gray-400">Qty:</span>
                                                <span className="text-white font-semibold">{order.quantity}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <DollarSign className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                                                <span className="text-gray-400">Harga:</span>
                                                <span className="text-white font-semibold">{FormatRupiah(order.price)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <Calendar className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                                                <span className="text-gray-400">
                                                    {FormatDate(String(order.created_at))}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {filteredOrders.length > 0 && (
                    <p className="text-center text-xs sm:text-sm text-gray-400">
                        Menampilkan {filteredOrders.length} order
                    </p>
                )}
            </div>
        </CustomerDashboard>
    );
}