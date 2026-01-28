/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { X, Zap, Settings, Smartphone, CreditCard, TrendingUp, History, MessageCircle, FileText, ChevronRight, LogOut, Server } from 'lucide-react';
import { usePage, Link } from '@inertiajs/react';
import useAuthHooks from '@/hooks/authHooks';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: any) {
    const { url } = usePage();
    const { handleLogout } = useAuthHooks();
    const menuItems = [
        { id: 'manajemen', label: 'Manajemen User', icon: Settings, color: 'text-blue-400', link: "/admin/pengguna" },
        { id: 'nokos-otp', label: 'Layanan Nokos Ada OTP', icon: Smartphone, color: 'text-purple-400', link: "/admin/layanan/nokos-ada-otp" },
        { id: 'nokos-virtusim', label: 'Layanan Nokos Virtusim', icon: CreditCard, color: 'text-pink-400', link: "/admin/layanan/nokos-virtusim" },
        { id: 'suntik', label: 'Layanan Suntik', icon: TrendingUp, color: 'text-orange-400', link: "/admin/layanan/suntik" },
        { id: 'layanan', label: 'Pengaturan Layanan', icon: Server, color: 'text-yellow-400', link: "/admin/layanan/pengaturan" },
        { id: 'riwayat', label: 'Riwayat Order Layanan', icon: History, color: 'text-yellow-400', link: "/" },
        { id: 'cs', label: 'Customer Service', icon: MessageCircle, color: 'text-cyan-400', link: "/" },
        { id: 'edit-teks', label: 'Edit Teks', icon: FileText, color: 'text-red-400', link: "/" }
    ];

    return (
        <aside className={`
        fixed top-0 left-0 h-full w-72 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800
        transition-transform duration-300 z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
            <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                                <Zap className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">DSOSMED</span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${url === item.link
                                        ? 'bg-gradient-to-r from-purple-600/30 to-purple-800/30 border border-purple-500/50 shadow-lg shadow-purple-500/20'
                                        : 'hover:bg-gray-800/50 border border-transparent'
                                    }
                `}
                            >
                                <item.icon className={`w-5 h-5 ${url === item.link ? item.color : 'text-gray-400'}`} />
                                <span className={`flex-1 text-left text-sm font-medium ${url === item.link ? 'text-white' : 'text-gray-300'
                                    }`}>
                                    {item.label}
                                </span>
                                {url === item.link && (
                                    <ChevronRight className="w-4 h-4 text-purple-400" />
                                )}
                            </button>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={() => handleLogout()} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600/20 border border-transparent hover:border-red-500/50 transition-all">
                        <LogOut className="w-5 h-5 text-red-400" />
                        <span className="text-sm font-medium text-gray-300">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}
