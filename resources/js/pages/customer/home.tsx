/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Menu, X, Zap, DollarSign, Smartphone,
  CreditCard, TrendingUp, History, MessageCircle, FileText,
  ChevronRight, ChevronDown, LogOut
} from 'lucide-react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('nokos-order');
  const [expandedMenus, setExpandedMenus] = useState(['nokos']);

  const menuItems = [
    {
      id: 'nokos',
      label: 'Nokos',
      icon: Smartphone,
      color: 'text-purple-400',
      submenus: [
        { id: 'nokos-order', label: 'Order', icon: CreditCard },
        { id: 'nokos-otp', label: 'OTP', icon: MessageCircle },
        { id: 'nokos-history', label: 'History', icon: History },
        { id: 'nokos-panduan', label: 'Panduan', icon: FileText }
      ]
    },
    {
      id: 'suntik',
      label: 'Suntik Sosmed',
      icon: TrendingUp,
      color: 'text-orange-400',
      submenus: [
        { id: 'suntik-order', label: 'Order', icon: CreditCard },
        { id: 'suntik-history', label: 'History', icon: History },
        { id: 'suntik-panduan', label: 'Panduan', icon: FileText }
      ]
    },
    {
      id: 'transaction',
      label: 'Transaction',
      icon: DollarSign,
      color: 'text-green-400',
      submenus: [
        { id: 'transaction-deposit', label: 'Deposit', icon: CreditCard },
        { id: 'transaction-history', label: 'History', icon: History }
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

  const renderContent = () => {
    switch(activeMenu) {
      case 'nokos-order':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Nokos - Order</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-400">Pesan nomor virtual untuk kebutuhan Anda</p>
            </div>
          </div>
        );
      case 'nokos-otp':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Nokos - OTP</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-400">Kelola OTP nomor virtual Anda</p>
            </div>
          </div>
        );
      case 'nokos-history':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Nokos - History</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-400">Riwayat pesanan nomor virtual</p>
            </div>
          </div>
        );
      case 'nokos-panduan':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Nokos - Panduan</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-400">Panduan penggunaan layanan Nokos</p>
            </div>
          </div>
        );
      case 'suntik-order':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Suntik Sosmed - Order</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-400">Pesan layanan social media marketing</p>
            </div>
          </div>
        );
      case 'suntik-history':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Suntik Sosmed - History</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-400">Riwayat pesanan social media marketing</p>
            </div>
          </div>
        );
      case 'suntik-panduan':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Suntik Sosmed - Panduan</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-400">Panduan penggunaan layanan Suntik Sosmed</p>
            </div>
          </div>
        );
      case 'transaction-deposit':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Transaction - Deposit</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-400">Top up saldo akun Anda</p>
            </div>
          </div>
        );
      case 'transaction-history':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Transaction - History</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-400">Riwayat transaksi dan deposit</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .sidebar-enter {
          animation: slideIn 0.3s ease-out;
        }

        .overlay-enter {
          animation: fadeIn 0.3s ease-out;
        }

        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.7);
        }
      `}</style>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden overlay-enter"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-full sm:w-80 md:w-72 bg-gray-900/98 backdrop-blur-xl border-r border-gray-800
        transition-transform duration-300 ease-in-out z-50 shadow-2xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">

          {/* Header */}
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

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 sm:space-y-2 custom-scrollbar">
            {menuItems.map((item) => (
              <div key={item.id}>
                {/* Main Menu */}
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

                {/* Submenus */}
                {expandedMenus.includes(item.id) && (
                  <div className="ml-3 sm:ml-4 mt-1 space-y-1">
                    {item.submenus.map((submenu) => (
                      <button
                        key={submenu.id}
                        onClick={() => {
                          setActiveMenu(submenu.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-300
                          ${activeMenu === submenu.id
                            ? 'bg-gradient-to-r from-purple-600/30 to-purple-800/30 border border-purple-500/50 shadow-lg shadow-purple-500/20'
                            : 'hover:bg-gray-800/30 border border-transparent'
                          }
                          active:scale-95
                        `}
                      >
                        <submenu.icon className={`w-4 h-4 flex-shrink-0 ${activeMenu === submenu.id ? 'text-purple-400' : 'text-gray-500'}`} />
                        <span className={`flex-1 text-left text-sm truncate ${
                          activeMenu === submenu.id ? 'text-white font-medium' : 'text-gray-400'
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

          {/* Footer - Logout */}
          <div className="p-3 sm:p-4 border-t border-gray-800">
            <button className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl hover:bg-red-600/20 border border-transparent hover:border-red-500/50 transition-all active:scale-95">
              <LogOut className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span className="text-sm sm:text-base font-medium text-gray-300">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">

        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-gray-900/98 backdrop-blur-xl border-b border-gray-800 shadow-lg">
          <div className="flex items-center justify-between p-3 sm:p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors active:scale-95"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Page Title - Mobile */}
            <h2 className="lg:hidden text-base sm:text-lg font-semibold truncate flex-1 mx-4">
              {menuItems.flatMap(m => m.submenus).find(s => s.id === activeMenu)?.label || 'Dashboard'}
            </h2>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto lg:ml-0">
              {/* Online Status - Hidden on mobile, shown on tablet+ */}
              <div className="hidden sm:flex items-center gap-2 sm:gap-3 bg-gray-800/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-gray-700/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm text-gray-300">Online</span>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg shadow-purple-500/20">
                  AD
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-gray-400">admin@dsosmed.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-3 sm:p-4 md:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}