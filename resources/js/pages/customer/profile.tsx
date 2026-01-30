import { User, Wallet, Calendar } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { FormatDate } from '@/utils/FormatDate';
import CustomerDashboard from '@/components/customer/customerDashboard';
import SpinnerLoader from '@/ui/SpinnerLoader';

export default function Profile() {
    const { user, loading } = useAuth();
    if (loading || !user) return <SpinnerLoader/>

    return (
        <CustomerDashboard title="Profil Saya">
            <div className="space-y-6" data-aos="fade-up" data-aos-duration="800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-purple-300 font-poppins-medium">Username</p>
                            <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <p className="text-2xl font-poppins-semibold text-white">{user.username}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-green-300 font-poppins-medium">Saldo</p>
                            <Wallet className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-2xl font-poppins-semibold text-white">
                            {FormatRupiah(user.saldo)}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-poppins-semibold text-white">Informasi Akun</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-800/30 border border-gray-700/40 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-poppins-regular">User ID</p>
                                    <p className="text-sm text-white font-poppins-medium">{user.id}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/30 border border-gray-700/40 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-poppins-regular">Tanggal Dibuat</p>
                                    <p className="text-sm text-white font-poppins-medium">{FormatDate(user.created_at)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/30 border border-gray-700/40 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-poppins-regular">Terakhir Diperbarui</p>
                                    <p className="text-sm text-white font-poppins-medium">{FormatDate(user.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerDashboard>
    );
}