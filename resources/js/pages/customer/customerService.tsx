import { Headphones, Phone, MessageCircle, Clock, Star, Sparkles, Zap, Heart, Shield, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';
import CustomerDashboard from '@/components/customer/customerDashboard';
import useCustomerServiceHooks from '@/hooks/customerServiceHooks';
import { useAuth } from '@/context/authContext';
import SpinnerLoader from '@/ui/SpinnerLoader';
import { FormatPhone } from '@/utils/FormatPhone';

export default function CustomerService() {
    const { customerServiceData } = useCustomerServiceHooks();
    const { loading } = useAuth();

    const parseServices = (desc: string) => {
        if (!desc) return [];
        return desc.split('\n').filter(service => service.trim());
    };

    const floatingIcons = [
        { Icon: Star, delay: 0, duration: 3, x: 5, y: 10 },
        { Icon: Sparkles, delay: 0.5, duration: 3.5, x: 90, y: 15 },
        { Icon: Zap, delay: 1, duration: 4, x: 15, y: 65 },
        { Icon: Heart, delay: 1.5, duration: 3.2, x: 85, y: 75 },
        { Icon: Award, delay: 2, duration: 3.8, x: 45, y: 25 },
        { Icon: Shield, delay: 2.5, duration: 3.3, x: 70, y: 55 }
    ];

    const features = [
        {
            icon: Clock,
            title: "24/7 Tersedia",
            desc: "Siap melayani Anda kapan saja",
            gradient: "from-blue-600/20 to-blue-800/20",
            border: "border-blue-500/30",
            iconColor: "text-blue-400",
            iconBg: "bg-blue-600/20"
        },
        {
            icon: Users,
            title: "Tim Profesional",
            desc: "Didukung oleh tim ahli",
            gradient: "from-purple-600/20 to-purple-800/20",
            border: "border-purple-500/30",
            iconColor: "text-purple-400",
            iconBg: "bg-purple-600/20"
        },
        {
            icon: TrendingUp,
            title: "Respon Cepat",
            desc: "Tanggapan dalam hitungan menit",
            gradient: "from-green-600/20 to-green-800/20",
            border: "border-green-500/30",
            iconColor: "text-green-400",
            iconBg: "bg-green-600/20"
        },
        {
            icon: Shield,
            title: "Terpercaya",
            desc: "Keamanan data terjamin",
            gradient: "from-yellow-600/20 to-yellow-800/20",
            border: "border-yellow-500/30",
            iconColor: "text-yellow-400",
            iconBg: "bg-yellow-600/20"
        }
    ];

    const handleWhatsApp = (phone: string) => {
        const cleanPhone = phone.replace(/\D/g, '');
        const whatsappNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
        window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    };

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    if (loading) {
        return <SpinnerLoader/>
    }

    return (
        <CustomerDashboard title="Customer Service">
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

                {customerServiceData?.map((cs, index) => {
                    const services = parseServices(cs.desc);
                    return (
                        <div 
                            key={cs.id}
                            className="bg-gradient-to-br from-blue-600/20 to-purple-800/20 border border-blue-500/30 rounded-xl p-4 sm:p-8 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden"
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={index * 100}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                            <div className="relative z-10">
                                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg animate-pulse"></div>
                                        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-blue-600/20 rounded-xl flex items-center justify-center relative group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                            <Headphones className="w-7 h-7 sm:w-10 sm:h-10 text-blue-400" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                            <h3 className="text-xl sm:text-3xl font-poppins-semibold text-white group-hover:text-blue-400 transition-colors duration-300 truncate">
                                                {cs.name}
                                            </h3>
                                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 animate-pulse flex-shrink-0" />
                                        </div>
                                        <p className="text-xs sm:text-sm text-blue-400 font-poppins-medium">
                                            {services.length} Layanan Tersedia
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-900/40 border border-gray-700/50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                                    <h4 className="text-base sm:text-lg font-poppins-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                                        <span className="truncate">Layanan Yang Kami Sediakan</span>
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                        {services.map((service, serviceIndex) => (
                                            <div
                                                key={serviceIndex}
                                                className="flex items-start gap-2 sm:gap-3 bg-gray-800/30 border border-gray-700/40 rounded-lg p-3 sm:p-4 hover:bg-gray-800/50 hover:border-blue-500/30 transition-all duration-300 group/service"
                                                data-aos="fade-right"
                                                data-aos-duration="600"
                                                data-aos-delay={serviceIndex * 50}
                                            >
                                                <div className="relative flex-shrink-0">
                                                    <div className="absolute inset-0 bg-green-500/30 rounded-full blur-md animate-pulse"></div>
                                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600/20 rounded-full flex items-center justify-center relative">
                                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                                    </div>
                                                </div>
                                                <p className="text-gray-200 font-poppins-regular text-xs sm:text-sm leading-relaxed flex-1">
                                                    {service}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <button
                                        onClick={() => handleWhatsApp(cs.phone)}
                                        className="flex items-center gap-3 sm:gap-4 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 hover:border-green-500/50 rounded-lg p-4 sm:p-5 transition-all duration-300 group/btn"
                                    >
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-green-500/30 rounded-full blur-md animate-pulse"></div>
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/30 rounded-full flex items-center justify-center relative group-hover/btn:scale-110 transition-transform duration-300">
                                                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                                            </div>
                                        </div>
                                        <div className="flex-1 text-left min-w-0">
                                            <p className="text-xs sm:text-sm text-green-300 font-poppins-medium mb-1">WhatsApp</p>
                                            <p className="text-sm sm:text-base text-white font-poppins-semibold truncate">{FormatPhone(cs.phone)}</p>
                                        </div>
                                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 group-hover/btn:rotate-12 transition-transform duration-300 flex-shrink-0" />
                                    </button>

                                    <button
                                        onClick={() => handleCall(cs.phone)}
                                        className="flex items-center gap-3 sm:gap-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 rounded-lg p-4 sm:p-5 transition-all duration-300 group/btn"
                                    >
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md animate-pulse"></div>
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/30 rounded-full flex items-center justify-center relative group-hover/btn:scale-110 transition-transform duration-300">
                                                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                                            </div>
                                        </div>
                                        <div className="flex-1 text-left min-w-0">
                                            <p className="text-xs sm:text-sm text-blue-300 font-poppins-medium mb-1">Telepon</p>
                                            <p className="text-sm sm:text-base text-white font-poppins-semibold truncate">{FormatPhone(cs.phone)}</p>
                                        </div>
                                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover/btn:rotate-12 transition-transform duration-300 flex-shrink-0" />
                                    </button>
                                </div>

                                <div className="bg-gray-900/40 border border-gray-700/50 rounded-lg p-4 sm:p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs sm:text-sm text-gray-400 font-poppins-medium">Jam Operasional</p>
                                            <p className="text-sm sm:text-base text-white font-poppins-semibold">24 Jam Setiap Hari</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 group`}
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={index * 100}
                        >
                            <div className="relative mb-3 sm:mb-4">
                                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.iconBg} rounded-lg flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.iconColor}`} />
                                </div>
                            </div>
                            <h4 className="text-base sm:text-lg font-poppins-semibold text-white mb-1 sm:mb-2">{feature.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-300 font-poppins-regular">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </CustomerDashboard>
    );
}