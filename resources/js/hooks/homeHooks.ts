/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Zap, Shield, TrendingUp, Users, MessageSquare, Heart } from 'lucide-react';

export default function useHomeHooks() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const featureData = ['Home', 'Features', 'Services', 'Pricing', 'Testimonials'];
    const iconData = [
        { icon: Zap, title: 'Proses Otomatis', desc: 'Order diproses instant dengan sistem otomatis 24/7', delay: '100' },
        { icon: Shield, title: 'Aman & Terpercaya', desc: 'Data Anda aman dengan enkripsi tingkat enterprise', delay: '200' },
        { icon: TrendingUp, title: 'Harga Fleksibel', desc: 'Atur markup dan pricing sesuai strategi bisnis Anda', delay: '300' },
        { icon: Users, title: 'Multi Layanan', desc: 'Akses 50+ layanan dari berbagai provider terbaik', delay: '100' },
        { icon: MessageSquare, title: 'Support 24/7', desc: 'Tim support siap membantu Anda kapan saja', delay: '200' },
        { icon: Heart, title: 'User Friendly', desc: 'Interface modern dan mudah digunakan untuk semua level', delay: '300' }
    ]
    const serviceData = [
        { title: 'Virtual Number (Nokos)', desc: 'Nomor virtual dari 50+ negara untuk verifikasi akun' },
        { title: 'Social Media Marketing', desc: 'Followers, likes, views untuk semua platform populer' },
        { title: 'Custom Pricing', desc: 'Atur harga jual sendiri dengan sistem markup fleksibel' },
        { title: 'Auto Invoice', desc: 'Sistem invoice otomatis dengan bukti transaksi' }
    ]
    const planData = [
        { name: 'Starter', price: '99K', features: ['50 Orders/bulan', 'Akses 20+ layanan', 'Email support', 'Dashboard basic'], popular: false, delay: '100' },
        { name: 'Professional', price: '299K', features: ['Unlimited orders', 'Akses semua layanan', 'Priority support 24/7', 'Advanced analytics', 'Custom branding'], popular: true, delay: '200' },
        { name: 'Enterprise', price: 'Custom', features: ['Dedicated server', 'API access', 'White label', 'Dedicated support', 'Custom integration'], popular: false, delay: '300' }
    ]
    const testimonialsData = [
        { name: 'Budi Santoso', role: 'Reseller SMM', text: 'Sangat membantu bisnis saya! Proses cepat dan harga kompetitif. Support juga responsive banget.', delay: '100' },
        { name: 'Rina Permata', role: 'Digital Marketer', text: 'Panel terbaik yang pernah saya pakai. Interface mudah dipahami, fitur lengkap, dan hasil memuaskan.', delay: '200' },
        { name: 'Ahmad Fauzi', role: 'Entrepreneur', text: 'Recommended! Sudah pakai 6 bulan lebih, sangat worth it. Auto pilot bisnis jadi lebih mudah.', delay: '300' }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ['home', 'features', 'services', 'pricing', 'testimonials', 'cta'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: any) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return {
        isScrolled,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        activeSection,
        scrollToSection,
        featureData,
        iconData,
        serviceData,
        planData,
        testimonialsData
    }
}
