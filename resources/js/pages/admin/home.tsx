import React, { useState } from 'react';
import { 
  Menu, X, Zap, DollarSign, Settings, Smartphone, 
  CreditCard, TrendingUp, History, MessageCircle, FileText,
  ChevronRight, LogOut
} from 'lucide-react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('penghasilan');

  const menuItems = [
    { id: 'penghasilan', label: 'Penghasilan', icon: DollarSign, color: 'text-green-400' },
    { id: 'setting', label: 'Setting User', icon: Settings, color: 'text-blue-400' },
    { id: 'nokos-otp', label: 'Layanan Nokos Ada OTP', icon: Smartphone, color: 'text-purple-400' },
    { id: 'nokos-virtusim', label: 'Layanan Nokos Virtusim', icon: CreditCard, color: 'text-pink-400' },
    { id: 'suntik', label: 'Layanan Suntik', icon: TrendingUp, color: 'text-orange-400' },
    { id: 'riwayat', label: 'Riwayat Order Layanan', icon: History, color: 'text-yellow-400' },
    { id: 'cs', label: 'Customer Service', icon: MessageCircle, color: 'text-cyan-400' },
    { id: 'edit-teks', label: 'Edit Teks', icon: FileText, color: 'text-red-400' }
  ];

  const renderContent = () => {
    switch(activeMenu) {
      case 'penghasilan':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Penghasilan</h1>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Total Penghasilan</p>
                <h2 className="text-3xl font-bold text-green-400">Rp 5.250.000</h2>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Bulan Ini</p>
                <h2 className="text-3xl font-bold text-blue-400">Rp 850.000</h2>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Hari Ini</p>
                <h2 className="text-3xl font-bold text-purple-400">Rp 125.000</h2>
              </div>
            </div>
          </div>
        );
      case 'setting':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Setting User</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <p className="text-gray-400">Pengaturan profil dan akun Anda</p>
            </div>
          </div>
        );
      case 'nokos-otp':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Layanan Nokos Ada OTP</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <p className="text-gray-400">Kelola layanan nomor virtual dengan OTP</p>
            </div>
          </div>
        );
      case 'nokos-virtusim':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Layanan Nokos Virtusim</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <p className="text-gray-400">Kelola layanan Virtusim</p>
            </div>
          </div>
        );
      case 'suntik':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Layanan Suntik</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <p className="text-gray-400">Kelola layanan social media marketing</p>
            </div>
          </div>
        );
      case 'riwayat':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Riwayat Order Layanan</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <p className="text-gray-400">Lihat semua transaksi Anda</p>
            </div>
          </div>
        );
      case 'cs':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Customer Service</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <p className="text-gray-400">Hubungi tim support kami</p>
            </div>
          </div>
        );
      case 'edit-teks':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Edit Teks</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <p className="text-gray-400">Edit konten dan template teks</p>
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
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        .sidebar-enter { animation: slideIn 0.3s ease-out; }
      `}</style>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800
        transition-transform duration-300 z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
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

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${activeMenu === item.id 
                    ? 'bg-gradient-to-r from-purple-600/30 to-purple-800/30 border border-purple-500/50 shadow-lg shadow-purple-500/20' 
                    : 'hover:bg-gray-800/50 border border-transparent'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${activeMenu === item.id ? item.color : 'text-gray-400'}`} />
                <span className={`flex-1 text-left text-sm font-medium ${
                  activeMenu === item.id ? 'text-white' : 'text-gray-300'
                }`}>
                  {item.label}
                </span>
                {activeMenu === item.id && (
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                )}
              </button>
            ))}
          </nav>

          {/* Footer - Logout */}
          <div className="p-4 border-t border-gray-800">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600/20 border border-transparent hover:border-red-500/50 transition-all">
              <LogOut className="w-5 h-5 text-red-400" />
              <span className="text-sm font-medium text-gray-300">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden md:flex items-center gap-3 bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Online</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-sm font-bold">
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
        <main className="p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}