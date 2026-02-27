/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuthHooks from '@/hooks/authHooks';
import { router, usePage } from '@inertiajs/react';
import {
    ArrowDownToLine,
    Banknote,
    ChevronDown,
    ChevronRight,
    CreditCard,
    FileText,
    HelpCircle,
    History,
    LogOut,
    Smartphone,
    TrendingUp,
    User,
    User2Icon,
    Wallet,
    KeyRound,
    X,
    Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar({
    isSidebarOpen,
    setIsSidebarOpen,
    setLabel,
}: any) {
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
    const { url } = usePage();
    const { handleLogout } = useAuthHooks();
    const menuItems = [
        {
            id: 'beranda',
            label: 'Beranda',
            icon: User,
            color: 'text-red-400',
            submenus: [
                {
                    id: 'profile',
                    label: 'Informasi Pengguna',
                    icon: User2Icon,
                    link: '/customer/profile',
                },
            ],
        },
        {
            id: 'nokos',
            label: 'Nokos',
            icon: Smartphone,
            color: 'text-purple-400',
            submenus: [
                {
                    id: 'nokos-order',
                    label: 'Order Nokos',
                    icon: CreditCard,
                    link: '/customer/nokos/order',
                },
                {
                    id: 'nokos-otp',
                    label: 'OTP Nokos',
                    icon: KeyRound,
                    link: '/customer/nokos/otp',
                },
                {
                    id: 'nokos-history',
                    label: 'Riwayat Order Nokos',
                    icon: History,
                    link: '/customer/nokos/history',
                },
                {
                    id: 'nokos-panduan',
                    label: 'Panduan Nokos',
                    icon: FileText,
                    link: '/customer/nokos/guide',
                },
            ],
        },
        {
            id: 'suntik',
            label: 'Suntik Sosmed',
            icon: TrendingUp,
            color: 'text-orange-400',
            submenus: [
                {
                    id: 'suntik-order',
                    label: 'Order',
                    icon: CreditCard,
                    link: '/customer/suntik/order',
                },
                {
                    id: 'suntik-history',
                    label: 'Riwayat Order Suntik',
                    icon: History,
                    link: '/customer/suntik/history',
                },
                {
                    id: 'suntik-panduan',
                    label: 'Panduan',
                    icon: FileText,
                    link: '/customer/suntik/guide',
                },
            ],
        },
        {
            id: 'deposit',
            label: 'Deposit',
            icon: Wallet,
            color: 'text-green-400',
            submenus: [
                {
                    id: 'deposit',
                    label: 'Deposit',
                    icon: ArrowDownToLine,
                    link: '/customer/deposit',
                },
                {
                    id: 'history',
                    label: 'History',
                    icon: Banknote,
                    link: '/customer/deposit/history',
                },
            ],
        },
        {
            id: 'bantuan',
            label: 'Bantuan',
            icon: HelpCircle,
            color: 'text-orange-400',
            submenus: [
                {
                    id: 'bantuan',
                    label: 'Bantuan',
                    icon: HelpCircle    ,
                    link: '/customer/customer-service',
                },
            ],
        },
    ];

    const toggleMenu = (menuId: any) => {
        setExpandedMenus((prev) =>
            prev.includes(menuId)
                ? prev.filter((id) => id !== menuId)
                : [...prev, menuId],
        );
    };

    useEffect(() => {
        for (const item of menuItems) {
            for (const submenu of item.submenus) {
                if (url === submenu.link) {
                    setLabel(submenu.label);
                    setExpandedMenus([item.id]);
                    return;
                }
            }
        }
    }, [url]);

    return (
        <aside
            className={`
        fixed top-0 left-0 h-full w-72 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800
        transition-transform duration-300 z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
            <div className="flex h-full flex-col">
                <div className="border-b border-gray-800 p-4 sm:p-5 md:p-6">
                    <div className="flex items-center justify-between">
                        <div onClick={() => router.visit("/")} className="flex cursor-pointer items-center space-x-2 sm:space-x-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/20 sm:h-10 sm:w-10">
                                <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                            <span className="text-lg font-bold sm:text-xl">
                                DSOSMED
                            </span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="rounded-lg p-2 transition-colors hover:bg-gray-800 lg:hidden"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <nav className="custom-scrollbar flex-1 space-y-1.5 overflow-y-auto p-3 sm:space-y-2 sm:p-4">
                    {menuItems.map((item) => (
                        <div key={item.id}>
                            <button
                                onClick={() => toggleMenu(item.id)}
                                className={`flex w-full items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-300 hover:bg-gray-800/50 active:scale-95 sm:gap-3 sm:px-4 sm:py-3`}
                            >
                                <item.icon
                                    className={`h-5 w-5 flex-shrink-0 ${item.color}`}
                                />
                                <span className="flex-1 truncate text-left text-sm font-medium text-gray-300 sm:text-base">
                                    {item.label}
                                </span>
                                {expandedMenus.includes(item.id) ? (
                                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-400 transition-transform" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400 transition-transform" />
                                )}
                            </button>
                            {expandedMenus.includes(item.id) && (
                                <div className="mt-1 ml-3 space-y-1 sm:ml-4">
                                    {item.submenus.map((submenu) => (
                                        <button
                                            key={submenu.id}
                                            onClick={() => {
                                                router.visit(submenu.link);
                                                if (window.innerWidth < 1024) {
                                                    setIsSidebarOpen(false);
                                                }
                                            }}
                                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 ${url === submenu.link
                                                ? 'border border-purple-500/50 bg-gradient-to-r from-purple-600/30 to-purple-800/30 shadow-lg shadow-purple-500/20'
                                                : 'border border-transparent hover:bg-gray-800/30'
                                                } active:scale-95`}
                                        >
                                            <submenu.icon
                                                className={`h-4 w-4 flex-shrink-0 ${url === submenu.link ? 'text-purple-400' : 'text-gray-500'}`}
                                            />
                                            <span
                                                className={`flex-1 truncate text-left text-sm ${url === submenu.link
                                                    ? 'font-medium text-white'
                                                    : 'text-gray-400'
                                                    }`}
                                            >
                                                {submenu.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="border-t border-gray-800 p-3 sm:p-4">
                    <button
                        onClick={() => handleLogout()}
                        className="flex w-full items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 transition-all hover:border-red-500/50 hover:bg-red-600/20 active:scale-95 sm:gap-3 sm:px-4 sm:py-3"
                    >
                        <LogOut className="h-5 w-5 flex-shrink-0 text-red-400" />
                        <span className="text-sm font-medium text-gray-300 sm:text-base">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
