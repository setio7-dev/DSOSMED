/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpen, Sparkles, CheckCircle, Zap, Star, Target, Rocket, Crown, Trophy, Award, Gift, TrendingUp, ShieldCheck, Lightbulb } from 'lucide-react';
import CustomerDashboard from '@/components/customer/customerDashboard';
import SpinnerLoader from '@/ui/SpinnerLoader';
import useGuideHooks from '@/hooks/guideHooks';
import { useAuth } from '@/context/authContext';
import { useEffect } from 'react';

export default function GuideSuntik() {
    const { guideData, setSelectedId } = useGuideHooks();
    const { loading } = useAuth();

    useEffect(() => {
        setSelectedId(2);
    }, [setSelectedId]);

    const parseSteps = (desc: string) => {
        if (!desc) return [];
        return desc.split('\n').filter(step => step.trim());
    };

    if (loading) {
        return <SpinnerLoader />
    }

    const steps = parseSteps(guideData?.desc as any);

    const floatingIcons = [
        { Icon: Star, delay: 0, duration: 3, x: 10, y: 15 },
        { Icon: Sparkles, delay: 0.5, duration: 3.5, x: 85, y: 20 },
        { Icon: Zap, delay: 1, duration: 4, x: 20, y: 60 },
        { Icon: Trophy, delay: 1.5, duration: 3.2, x: 90, y: 70 },
        { Icon: Crown, delay: 2, duration: 3.8, x: 50, y: 30 },
        { Icon: Gift, delay: 2.5, duration: 3.3, x: 70, y: 50 },
        { Icon: Award, delay: 3, duration: 3.6, x: 30, y: 80 }
    ];

    return (
        <CustomerDashboard title="Panduan Pengguna">
            <div className="space-y-4 sm:space-y-6 relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                    {floatingIcons.map(({ Icon, delay, duration, x, y }, idx) => (
                        <div
                            key={idx}
                            className="absolute animate-pulse"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                animationDelay: `${delay}s`,
                                animationDuration: `${duration}s`
                            }}
                        >
                            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary/10" />
                        </div>
                    ))}
                </div>

                <div 
                    className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden group"
                    data-aos="fade-down"
                    data-aos-duration="800"
                >
                    <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    
                    <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-blue-500/50 rounded-full blur-xl animate-pulse"></div>
                            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-blue-600/30 rounded-full flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                                <BookOpen className="w-7 h-7 sm:w-10 sm:h-10 text-blue-400 animate-pulse" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                <h2 className="text-xl sm:text-3xl font-poppins-semibold text-white truncate">Panduan Lengkap</h2>
                                <Lightbulb className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400 animate-pulse flex-shrink-0" />
                            </div>
                            <p className="text-sm sm:text-base text-gray-300 font-poppins-regular">Ikuti langkah-langkah mudah untuk memulai</p>
                        </div>
                    </div>
                </div>

                <div 
                    className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-4 sm:p-8 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden"
                    data-aos="fade-up"
                    data-aos-duration="800"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="relative z-10">
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg animate-pulse"></div>
                                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-blue-600/20 rounded-xl flex items-center justify-center relative group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <BookOpen className="w-7 h-7 sm:w-10 sm:h-10 text-blue-400" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                    <h3 className="text-xl sm:text-3xl font-poppins-semibold text-white group-hover:text-blue-400 transition-colors duration-300 truncate">
                                        {guideData?.name}
                                    </h3>
                                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 flex-shrink-0 hidden sm:block" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm font-poppins-medium text-blue-400">
                                        {steps.length} Langkah Mudah
                                    </span>
                                </div>
                            </div>
                            <div className="hidden lg:flex gap-3">
                                <Star className="w-8 h-8 text-blue-400 animate-pulse" style={{ animationDelay: '0s' }} />
                                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                                <Zap className="w-8 h-8 text-yellow-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                            </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            {steps.map((step, stepIndex) => (
                                <div
                                    key={stepIndex}
                                    className="flex items-start gap-3 sm:gap-4 bg-gray-900/40 border border-gray-700/50 rounded-lg p-3 sm:p-5 hover:bg-gray-900/60 hover:border-blue-500/30 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-300 group/step"
                                    data-aos="fade-right"
                                    data-aos-duration="600"
                                    data-aos-delay={stepIndex * 100}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-green-500/30 rounded-full blur-md animate-pulse"></div>
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600/20 rounded-full flex items-center justify-center relative group-hover/step:scale-110 transition-transform duration-300">
                                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-200 font-poppins-regular leading-relaxed text-sm sm:text-base">
                                            {step}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div 
                        className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="100"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/30 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                            </div>
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 animate-pulse" />
                        </div>
                        <h4 className="text-base sm:text-lg font-poppins-semibold text-white mb-1 sm:mb-2">Cepat & Efisien</h4>
                        <p className="text-xs sm:text-sm text-gray-300 font-poppins-regular">Proses order hanya dalam hitungan detik</p>
                    </div>

                    <div 
                        className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="200"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/30 rounded-lg flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                            </div>
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-pulse" />
                        </div>
                        <h4 className="text-base sm:text-lg font-poppins-semibold text-white mb-1 sm:mb-2">100% Aman</h4>
                        <p className="text-xs sm:text-sm text-gray-300 font-poppins-regular">Transaksi terjamin keamanannya</p>
                    </div>

                    <div 
                        className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="300"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/30 rounded-lg flex items-center justify-center">
                                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                            </div>
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse" />
                        </div>
                        <h4 className="text-base sm:text-lg font-poppins-semibold text-white mb-1 sm:mb-2">Terpercaya</h4>
                        <p className="text-xs sm:text-sm text-gray-300 font-poppins-regular">Dipercaya ribuan pengguna aktif</p>
                    </div>
                </div>
            </div>
        </CustomerDashboard>
    );
}