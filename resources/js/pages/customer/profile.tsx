import { User, Wallet, Calendar, X, ChevronLeft, ChevronRight, Bell, Newspaper } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { FormatDate } from '@/utils/FormatDate';
import CustomerDashboard from '@/components/customer/customerDashboard';
import SpinnerLoader from '@/ui/SpinnerLoader';
import useNewsHooks from '@/hooks/newsHooks';
import { NewsProps } from '@/types';
import { useState, useEffect } from 'react';

function NewsPopup({ news, onClose }: { news: NewsProps[]; onClose: () => void }) {
    const [index, setIndex] = useState(0);

    const today = new Date().toDateString();
    const todayNews = news.filter(n => new Date(n.created_at).toDateString() === today);
    const displayNews = todayNews.length > 0 ? todayNews : news.slice(0, 10);

    if (displayNews.length === 0) return null;

    const current = displayNews[index];
    const total = displayNews.length;

    const prev = () => setIndex(i => (i - 1 + total) % total);
    const next = () => setIndex(i => (i + 1) % total);

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
            <div className="w-full sm:max-w-xl bg-gray-900 border border-gray-700/50 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-700/40">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white">
                                {todayNews.length > 0 ? 'Berita Hari Ini' : 'Berita Terbaru'}
                            </h2>
                            <p className="text-xs text-gray-400">{index + 1} dari {total} artikel</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-400 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    {current.image ? (
                        <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-800/50">
                            <img
                                src={`/storage/${current.image}`}
                                alt={current.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full aspect-video rounded-xl bg-gray-800/40 border border-gray-700/30 flex items-center justify-center">
                            <Newspaper className="w-10 h-10 text-gray-600" />
                        </div>
                    )}

                    <div className="space-y-2">
                        <p className="text-xs text-gray-500">{FormatDate(current.created_at)}</p>
                        <h3 className="text-sm font-bold text-white leading-snug">{current.title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed max-h-28 overflow-y-auto">{current.desc}</p>
                    </div>

                    {total > 1 && (
                        <div className="flex items-center justify-between gap-3 pt-1">
                            <button
                                onClick={prev}
                                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-700/40 hover:bg-gray-700/60 text-gray-300 text-sm font-medium transition-all flex-1 justify-center"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Sebelumnya
                            </button>

                            <div className="flex gap-1.5 items-center">
                                {displayNews.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIndex(i)}
                                        className={`rounded-full transition-all ${i === index ? 'w-5 h-2 bg-purple-500' : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-700/40 hover:bg-gray-700/60 text-gray-300 text-sm font-medium transition-all flex-1 justify-center"
                            >
                                Selanjutnya
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Profile() {
    const { user, loading } = useAuth();
    const { customerNewsData } = useNewsHooks();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            const timer = setTimeout(() => setShowPopup(true), 600);
            return () => clearTimeout(timer);
        }
    }, [loading, user]);

    if (loading || !user) return <SpinnerLoader />;

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
                        {customerNewsData.length > 0 && (
                            <button
                                onClick={() => setShowPopup(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs text-purple-400 font-medium transition-all"
                            >
                                <Bell className="w-3.5 h-3.5" />
                                Berita
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-800/30 border border-gray-700/40 rounded-lg p-4">
                            <div className="flex items-center gap-3">
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
                            <div className="flex items-center gap-3">
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
                            <div className="flex items-center gap-3">
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

            {showPopup && (
                <NewsPopup
                    news={customerNewsData}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </CustomerDashboard>
    );
}