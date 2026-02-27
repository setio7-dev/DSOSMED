/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpen, CheckCircle, TrendingUp, ShieldCheck, Trophy } from 'lucide-react';
import CustomerDashboard from '@/components/customer/customerDashboard';
import SpinnerLoader from '@/ui/SpinnerLoader';
import useGuideHooks from '@/hooks/guideHooks';
import { useAuth } from '@/context/authContext';
import { useEffect } from 'react';

export default function GuideNokos() {
    const { guideData, setSelectedId } = useGuideHooks();
    const { loading } = useAuth();

    useEffect(() => {
        setSelectedId(1);
    }, [setSelectedId]);

    const parseSteps = (desc: string) => {
        if (!desc) return [];
        return desc.split('\n').filter(step => step.trim());
    };

    if (loading) {
        return <SpinnerLoader />
    }

    const steps = parseSteps(guideData?.desc as any);

    return (
        <CustomerDashboard title="Panduan Pengguna">
            <div className="space-y-4 sm:space-y-6">

                {/* Header Banner */}
                <div
                    className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden"
                    data-aos="fade-down"
                    data-aos-duration="800"
                >
                    <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                    <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-blue-500/50 rounded-full blur-xl animate-pulse" />
                            <div className="w-12 h-12 sm:w-20 sm:h-20 bg-blue-600/30 rounded-full flex items-center justify-center relative">
                                <BookOpen className="w-6 h-6 sm:w-10 sm:h-10 text-blue-400" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl sm:text-3xl font-poppins-semibold text-white leading-tight mb-1">
                                Panduan Lengkap
                            </h2>
                            <p className="text-xs sm:text-base text-gray-300 font-poppins-regular leading-relaxed">
                                Ikuti langkah-langkah mudah untuk memulai
                            </p>
                        </div>
                    </div>
                </div>

                {/* Steps Card */}
                <div
                    className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden group"
                    data-aos="fade-up"
                    data-aos-duration="800"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg animate-pulse" />
                                <div className="w-12 h-12 sm:w-20 sm:h-20 bg-blue-600/20 rounded-xl flex items-center justify-center relative group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <BookOpen className="w-6 h-6 sm:w-10 sm:h-10 text-blue-400" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-3xl font-poppins-semibold text-white group-hover:text-blue-400 transition-colors duration-300 leading-snug break-words">
                                    {guideData?.name}
                                </h3>
                                <p className="text-xs sm:text-sm font-poppins-medium text-blue-400 mt-1">
                                    {steps.length} Langkah Mudah
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            {steps.map((step, stepIndex) => (
                                <div
                                    key={stepIndex}
                                    className="flex items-start gap-3 sm:gap-4 bg-gray-900/40 border border-gray-700/50 rounded-lg p-3 sm:p-5 hover:bg-gray-900/60 hover:border-blue-500/30 transition-all duration-300"
                                    data-aos="fade-right"
                                    data-aos-duration="600"
                                    data-aos-delay={stepIndex * 100}
                                >
                                    <div className="relative flex-shrink-0 mt-0.5">
                                        <div className="absolute inset-0 bg-green-500/30 rounded-full blur-md animate-pulse" />
                                        <div className="w-7 h-7 sm:w-10 sm:h-10 bg-green-600/20 rounded-full flex items-center justify-center relative">
                                            <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
                                        </div>
                                    </div>
                                    <p className="flex-1 text-gray-200 font-poppins-regular leading-relaxed text-sm sm:text-base break-words">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div
                        className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="100"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/30 rounded-lg flex items-center justify-center mb-3">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                        </div>
                        <h4 className="text-base sm:text-lg font-poppins-semibold text-white mb-1">Cepat & Efisien</h4>
                        <p className="text-xs sm:text-sm text-gray-300 font-poppins-regular leading-relaxed">
                            Proses order hanya dalam hitungan detik
                        </p>
                    </div>

                    <div
                        className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="200"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/30 rounded-lg flex items-center justify-center mb-3">
                            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                        </div>
                        <h4 className="text-base sm:text-lg font-poppins-semibold text-white mb-1">100% Aman</h4>
                        <p className="text-xs sm:text-sm text-gray-300 font-poppins-regular leading-relaxed">
                            Transaksi terjamin keamanannya
                        </p>
                    </div>

                    <div
                        className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="300"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/30 rounded-lg flex items-center justify-center mb-3">
                            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        </div>
                        <h4 className="text-base sm:text-lg font-poppins-semibold text-white mb-1">Terpercaya</h4>
                        <p className="text-xs sm:text-sm text-gray-300 font-poppins-regular leading-relaxed">
                            Dipercaya ribuan pengguna aktif
                        </p>
                    </div>
                </div>
            </div>
        </CustomerDashboard>
    );
}