import React from 'react';
import { Menu, X, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import useHomeHooks from '@/hooks/homeHooks';
import home from "../../../public/image/home/welcome.png"
import { Link } from '@inertiajs/react';
import SpinnerLoader from '@/ui/SpinnerLoader';
import { useAuth } from '@/context/authContext';

export default function Home() {
    const { isMobileMenuOpen, isScrolled, activeSection, scrollToSection, setIsMobileMenuOpen, featureData, iconData, serviceData, planData, testimonialsData } = useHomeHooks();
    const { user, loading } = useAuth();

    if (loading) {
        return <SpinnerLoader/>
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        <div className="flex items-center space-x-2 animate-fadeInLeft">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                                <Zap className="w-6 h-6" />
                            </div>
                            <span className="text-xl md:text-2xl font-bold">DSOSMED</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            {featureData.map((item, idx) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className={`text-sm font-medium transition-all duration-300 hover:text-purple-400 ${activeSection === item.toLowerCase() ? 'text-purple-400' : 'text-gray-300'
                                        } animate-fadeInUp delay-${idx * 100}`}
                                >
                                    {item}
                                </button>
                            ))}
                            <Link href={user ? "/customer/nokos-otp/order" : "/auth"}>
                                <button
                                    className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 animate-fadeInUp delay-400 cursor-pointer"
                                >
                                    {user ? "Dashboard" : "Login"}
                                </button>
                            </Link>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gray-900/98 backdrop-blur-lg border-t border-gray-800 animate-fadeInUp">
                        <div className="px-4 py-6 space-y-4">
                            {['Home', 'Features', 'Services', 'Pricing', 'Testimonials'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-purple-400 hover:bg-gray-800 rounded-lg transition-all"
                                >
                                    {item}
                                </button>
                            ))}
                            <Link href={user ? "/customer/nokos-otp/order" : "/auth"}>
                                <button
                                    onClick={() => scrollToSection('cta')}
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
            <section id="home" className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 md:space-y-8 animate-fadeInLeft">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    Solusi Terlengkap
                                </span>
                                <br />
                                Nokos & Suntik Sosmed
                            </h1>
                            <p className="text-lg text-justify md:text-xl text-gray-300 leading-relaxed">
                                Platform all-in-one untuk kebutuhan nomor virtual dan layanan social media marketing dengan harga terjangkau dan proses otomatis
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="group bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Mulai Sekarang
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => scrollToSection('features')}
                                    className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-purple-500 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105"
                                >
                                    Lihat Fitur
                                </button>
                            </div>
                            <div className="flex items-center gap-8 pt-4">
                                <div>
                                    <div className="text-3xl font-bold text-purple-400">10K+</div>
                                    <div className="text-sm text-gray-400">Happy Clients</div>
                                </div>
                                <div className="h-12 w-px bg-gray-700"></div>
                                <div>
                                    <div className="text-3xl font-bold text-purple-400">50+</div>
                                    <div className="text-sm text-gray-400">Services</div>
                                </div>
                                <div className="h-12 w-px bg-gray-700"></div>
                                <div>
                                    <div className="text-3xl font-bold text-purple-400">24/7</div>
                                    <div className="text-sm text-gray-400">Support</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative animate-fadeInRight">
                            <div className="relative z-10 animate-float">
                                <img
                                    src={home}
                                    alt="Dashboard"
                                    className="rounded-2xl shadow-2xl border border-purple-500/20"
                                />
                            </div>
                            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
                            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-fadeInUp">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Kenapa Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">DSOSMED?</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Kami menyediakan layanan terbaik dengan teknologi terkini untuk kebutuhan bisnis digital Anda
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {iconData.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`group p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 animate-fadeInUp delay-${feature.delay}`}
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative animate-fadeInLeft order-2 md:order-1">
                            <div className="relative z-10 animate-float" style={{ animationDelay: '0.5s' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop"
                                    alt="Services"
                                    className="rounded-2xl shadow-2xl border border-purple-500/20"
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
                        </div>

                        <div className="space-y-6 animate-fadeInRight order-1 md:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Layanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Lengkap</span> Untuk Anda
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Dapatkan akses ke berbagai layanan premium untuk mengembangkan bisnis digital Anda
                            </p>

                            <div className="space-y-4">
                                {serviceData.map((service, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                                            <ChevronRight className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">{service.title}</h4>
                                            <p className="text-gray-400 text-sm">{service.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-fadeInUp">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Paket</span> Terbaik
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Harga transparan tanpa biaya tersembunyi
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {planData.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`relative p-8 rounded-2xl ${plan.popular
                                    ? 'bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-2 border-purple-500 shadow-2xl shadow-purple-500/20 scale-105'
                                    : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50'
                                    } hover:-translate-y-2 transition-all duration-300 animate-fadeInUp delay-${plan.delay}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-gray-400">/bulan</span>}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-center gap-2 text-gray-300">
                                            <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${plan.popular
                                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:shadow-lg hover:shadow-purple-500/50'
                                    : 'border-2 border-purple-500 hover:bg-purple-500/10'
                                    } hover:scale-105`}>
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-fadeInUp">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Apa Kata <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Mereka?</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Testimoni dari pelanggan setia kami
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonialsData.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className={`p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 animate-fadeInUp delay-${testimonial.delay}`}
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-xl font-bold">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Siap Tingkatkan Bisnis Digital Anda?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Bergabung dengan ribuan reseller sukses lainnya. Mulai sekarang dan rasakan kemudahan berbisnis online!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="group bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                            Daftar Gratis Sekarang
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                            Hubungi Sales
                        </button>
                    </div>
                </div>
            </section>
            <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <span className="text-xl font-bold">DSOSMED</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Solusi terlengkap untuk kebutuhan nokos dan social media marketing Anda.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Layanan</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Virtual Number</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">SMM Panel</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">API Access</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">White Label</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Perusahaan</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Tentang Kami</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Karir</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Kontak</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Refund Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2026 DSOSMED. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.37h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
