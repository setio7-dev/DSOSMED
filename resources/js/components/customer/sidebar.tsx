/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import {
    X, Zap, DollarSign, Smartphone,
    CreditCard, TrendingUp, History, FileText,
    ChevronRight, ChevronDown, LogOut,
    User,
    User2Icon
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import useAuthHooks from '@/hooks/authHooks';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, setLabel }: any) {
    const [expandedMenus, setExpandedMenus] = useState(['nokos']);
    const { url } = usePage();
    const { handleLogout} = useAuthHooks();
    const menuItems = [
        {
            id: 'beranda',
            label: 'Beranda',
            icon: User,
            color: 'text-red-400',
            submenus: [
                { id: 'profile', label: 'Informasi Pengguna', icon: User2Icon, link: "/customer/profile", },
            ]
        },
        {
            id: 'nokos',
            label: 'Nokos',
            icon: Smartphone,
            color: 'text-purple-400',
            submenus: [
                { id: 'nokos-order', label: 'Order Nokos', icon: CreditCard, link: "/customer/nokos/order", },
                { id: 'nokos-history', label: 'Riwayat Order Nokos', icon: History, link: "/customer/nokos-otp/history", },
                { id: 'nokos-panduan', label: 'Panduan Nokos', icon: FileText, link: "/customer/nokos-otp/panduan", }
            ]
        },
        {
            id: 'suntik',
            label: 'Suntik Sosmed',
            icon: TrendingUp,
            color: 'text-orange-400',
            submenus: [
                { id: 'suntik-order', label: 'Order', icon: CreditCard, link: "/customer/suntik/order", },
                { id: 'suntik-history', label: 'History', icon: History, link: "/customer/suntik/history", },
                { id: 'suntik-panduan', label: 'Panduan', icon: FileText, link: "/customer/suntik/panduan", }
            ]
        },
        {
            id: 'transaction',
            label: 'Transaction',
            icon: DollarSign,
            color: 'text-green-400',
            submenus: [
                { id: 'transaction-deposit', label: 'Deposit', icon: CreditCard, link: "/customer/deposit", },
                { id: 'transaction-history', label: 'History', icon: History, link: "/customer/riwayat", }
            ]
        }
    ];

    const toggleMenu = (menuId: any) => {
        setExpandedMenus(prev =>
            prev.includes(menuId)
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    };

    useEffect(() => {
        const fetchActiveBar = () => {
            for (let index = 0; index < menuItems.length; index++) {
                const item = menuItems[index];

                for (let index = 0; index < item.submenus.length; index++) {
                    const submenu = item.submenus[index];

                    if (url === submenu.link) {
                        setLabel(submenu.label)
                    }
                }
                
            }
        }

        fetchActiveBar();
    }, [setLabel, url]);
    return (
        <aside className={`
        fixed top-0 left-0 h-full w-full sm:w-80 md:w-72 bg-gray-900/98 backdrop-blur-xl border-r border-gray-800
        transition-transform duration-300 ease-in-out z-50 shadow-2xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
            <div className="flex flex-col h-full">
                <div className="p-4 sm:p-5 md:p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold">DSOSMED</span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 sm:space-y-2 custom-scrollbar">
                    {menuItems.map((item) => (
                        <div key={item.id}>
                            <button
                                onClick={() => toggleMenu(item.id)}
                                className={`
                    w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300
                    hover:bg-gray-800/50 border border-transparent active:scale-95
                  `}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${item.color}`} />
                                <span className="flex-1 text-left text-sm sm:text-base font-medium text-gray-300 truncate">
                                    {item.label}
                                </span>
                                {expandedMenus.includes(item.id) ? (
                                    <ChevronDown className="w-4 h-4 flex-shrink-0 text-gray-400 transition-transform" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400 transition-transform" />
                                )}
                            </button>
                            {expandedMenus.includes(item.id) && (
                                <div className="ml-3 sm:ml-4 mt-1 space-y-1">
                                    {item.submenus.map((submenu) => (
                                        <button
                                            key={submenu.id}
                                            onClick={() => {
                                                router.visit(submenu.link)
                                                setIsSidebarOpen(false);
                                            }}
                                            className={`
                          w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-300
                          ${url === submenu.link
                                                    ? 'bg-gradient-to-r from-purple-600/30 to-purple-800/30 border border-purple-500/50 shadow-lg shadow-purple-500/20'
                                                    : 'hover:bg-gray-800/30 border border-transparent'
                                                }
                          active:scale-95
                        `}
                                        >
                                            <submenu.icon className={`w-4 h-4 flex-shrink-0 ${url === submenu.link ? 'text-purple-400' : 'text-gray-500'}`} />
                                            <span className={`flex-1 text-left text-sm truncate ${url === submenu.link ? 'text-white font-medium' : 'text-gray-400'
                                                }`}>
                                                {submenu.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-3 sm:p-4 border-t border-gray-800">
                    <button onClick={() => handleLogout()} className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl hover:bg-red-600/20 border border-transparent hover:border-red-500/50 transition-all active:scale-95">
                        <LogOut className="w-5 h-5 flex-shrink-0 text-red-400" />
                        <span className="text-sm sm:text-base font-medium text-gray-300">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}
