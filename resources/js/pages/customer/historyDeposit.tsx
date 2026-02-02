import CustomerDashboard from '@/components/customer/customerDashboard';
import useHistoryDepositHooks from '@/hooks/historyDepositHooks';
import { Calendar, CreditCard, DollarSign, Loader, User } from 'lucide-react';

export default function HistoryDeposit() {
    const { deposits, loading } = useHistoryDepositHooks();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    if (loading) {
        return (
            <CustomerDashboard>
                <div className="flex items-center justify-center py-12">
                    <Loader className="h-8 w-8 animate-spin text-purple-400" />
                </div>
            </CustomerDashboard>
        );
    }

    return (
        <CustomerDashboard>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-200">
                        Riwayat Deposit
                    </h2>
                    <div className="text-sm text-gray-400">
                        Total: {deposits.length} transaksi
                    </div>
                </div>

                {deposits.length === 0 ? (
                    <div className="py-12 text-center">
                        <DollarSign className="mx-auto mb-4 h-16 w-16 text-gray-600" />
                        <p className="text-gray-400">
                            Belum ada riwayat deposit
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {deposits.map((deposit, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-700/50 bg-gray-900/50 p-4 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 pb-3 border-b border-gray-700/50">
                                        <CreditCard className="h-4 w-4 flex-shrink-0 text-purple-400" />
                                        <span className="font-mono text-xs text-gray-300 truncate">
                                            {deposit.merchant_order_id}
                                        </span>
                                    </div>

                                    <div className="text-center py-2">
                                        <p className="mb-1 text-xs text-gray-500">
                                            Jumlah Deposit
                                        </p>
                                        <p className="text-2xl font-bold text-green-400">
                                            {formatCurrency(deposit.amount)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 flex-shrink-0 text-gray-500" />
                                        <span className="text-sm text-gray-400 truncate">
                                            {deposit.user.username}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500 mt-0.5" />
                                        <span className="text-sm text-gray-400 leading-relaxed">
                                            {formatDate(deposit.created_at)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-700/50">
                                        <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                                            <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                            <span className="text-xs text-gray-300">
                                                QRIS
                                            </span>
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50">
                                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                            Berhasil
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </CustomerDashboard>
    );
}
