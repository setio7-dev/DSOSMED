'use client';
import CustomerDashboard from '@/components/customer/customerDashboard';
import useAdaOtpActiveHooks from '@/hooks/adaOtpActiveHooks';
import { AlertCircle, CheckCircle, Info, Key, X } from 'lucide-react';

export default function NokosOtp() {
    const {
        activeOrders,
        loading,
        requestCancelOrder,
        handleFinishOrder,
        processingOrders,
        pendingCancelOrders,
    } = useAdaOtpActiveHooks();

    return (
        <CustomerDashboard>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-white">OTP Nokos</h1>
                    <p className="mt-0.5 text-sm text-gray-400">
                        Monitor dan kelola pesanan OTP aktif kamu
                    </p>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/20">
                        <Info className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-blue-300">
                            Cara Kerja OTP Nokos
                        </p>
                        <p className="text-xs leading-relaxed text-gray-400">
                            Jangan tutup halaman ini hingga OTP masuk.
                        </p>
                    </div>
                </div>

                <div className="space-y-4 rounded-lg bg-black/30 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-200 lg:text-lg">
                            Pesanan Aktif
                        </h2>
                        {activeOrders.length > 0 && (
                            <span className="rounded-lg border border-purple-500/30 bg-purple-500/20 px-2.5 py-1 text-xs font-semibold text-purple-400">
                                {activeOrders.length} aktif
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <p className="text-sm text-gray-400">Memuat data...</p>
                    ) : activeOrders.length === 0 ? (
                        <div className="py-10 text-center text-sm text-gray-400">
                            Tidak ada pesanan aktif
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {activeOrders.map((order) => {
                                const expired = order.remaining_time <= 0;

                                return (
                                    <div
                                        key={order.id}
                                        className="space-y-4 rounded-xl border border-gray-600/30 bg-gray-700/30 p-4 transition-all hover:border-purple-500/30"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                                                    <Key className="h-5 w-5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white">
                                                        {order.service.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400">
                                                        Order ID: {order.id}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className={`rounded-lg px-3 py-1 text-xs ${
                                                    expired
                                                        ? 'border border-red-500/30 bg-red-500/20 text-red-400'
                                                        : 'border border-green-500/30 bg-green-500/20 text-green-400'
                                                }`}
                                            >
                                                {expired
                                                    ? 'Expired'
                                                    : `${Math.floor(order.remaining_time)}s`}
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="text-xs text-gray-400">
                                                Nomor
                                            </label>
                                            <input
                                                type="text"
                                                readOnly
                                                value={order.number}
                                                className="w-full rounded-lg border border-gray-600/30 bg-gray-800/50 px-3 py-2 text-sm text-gray-300"
                                            />
                                        </div>

                                        {/* OTP */}
                                        <div>
                                            <label className="flex items-center gap-2 text-xs text-gray-400">
                                                OTP
                                                {order.has_sms && (
                                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                                )}
                                                {!order.has_sms && expired && (
                                                    <AlertCircle className="h-3 w-3 text-red-400" />
                                                )}
                                            </label>

                                            <input
                                                type="text"
                                                readOnly
                                                value={order.sms ?? ''}
                                                placeholder="Menunggu OTP..."
                                                className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                                    order.has_sms
                                                        ? 'border-green-500/30 bg-green-500/10 text-green-400'
                                                        : expired
                                                          ? 'border-red-500/30 bg-red-500/10 text-red-400'
                                                          : 'border-gray-600/30 bg-gray-800/50 text-gray-300'
                                                }`}
                                            />
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            {order.has_sms && (
                                                <button
                                                    onClick={() =>
                                                        handleFinishOrder(
                                                            order.id,
                                                        )
                                                    }
                                                    className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 text-sm text-white"
                                                >
                                                    Selesaikan
                                                </button>
                                            )}

                                            {!order.has_sms && (
                                                <button
                                                    onClick={() =>
                                                        requestCancelOrder(
                                                            order.id,
                                                            order.remaining_time,
                                                        )
                                                    }
                                                    className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-all ${
                                                        processingOrders.includes(
                                                            order.id,
                                                        )
                                                            ? 'bg-red-600/40 text-red-400'
                                                            : pendingCancelOrders.includes(
                                                                    order.id,
                                                                )
                                                              ? 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-400'
                                                              : 'border border-gray-600/30 bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                                                    } `}
                                                >
                                                    <X className="h-4 w-4" />
                                                    {processingOrders.includes(
                                                        order.id,
                                                    )
                                                        ? 'Processing...'
                                                        : pendingCancelOrders.includes(
                                                                order.id,
                                                            )
                                                          ? 'Menunggu 5 Menit...'
                                                          : 'Cancel'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </CustomerDashboard>
    );
}
