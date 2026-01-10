/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/admin/sidebar';

export default function AdminDashboard({ children, title }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const renderContent = () => {
  //   switch(activeMenu) {
  //     case 'penghasilan':
  //       return (
  //         <div className="space-y-6">
  //           <h1 className="text-3xl font-bold">Penghasilan</h1>
  //           <div className="grid md:grid-cols-3 gap-6">
  //             <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6">
  //               <p className="text-gray-400 text-sm mb-2">Total Penghasilan</p>
  //               <h2 className="text-3xl font-bold text-green-400">Rp 5.250.000</h2>
  //             </div>
  //             <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6">
  //               <p className="text-gray-400 text-sm mb-2">Bulan Ini</p>
  //               <h2 className="text-3xl font-bold text-blue-400">Rp 850.000</h2>
  //             </div>
  //             <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6">
  //               <p className="text-gray-400 text-sm mb-2">Hari Ini</p>
  //               <h2 className="text-3xl font-bold text-purple-400">Rp 125.000</h2>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     case 'setting':
  //       return (
  //         <div className="space-y-6">
  //           <h1 className="text-3xl font-bold">Setting User</h1>
  //           <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
  //             <p className="text-gray-400">Pengaturan profil dan akun Anda</p>
  //           </div>
  //         </div>
  //       );
  //     case 'nokos-otp':
  //       return (
  //         <div className="space-y-6">
  //           <h1 className="text-3xl font-bold">Layanan Nokos Ada OTP</h1>
  //           <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
  //             <p className="text-gray-400">Kelola layanan nomor virtual dengan OTP</p>
  //           </div>
  //         </div>
  //       );
  //     case 'nokos-virtusim':
  //       return (
  //         <div className="space-y-6">
  //           <h1 className="text-3xl font-bold">Layanan Nokos Virtusim</h1>
  //           <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
  //             <p className="text-gray-400">Kelola layanan Virtusim</p>
  //           </div>
  //         </div>
  //       );
  //     case 'suntik':
  //       return (
  //         <div className="space-y-6">
  //           <h1 className="text-3xl font-bold">Layanan Suntik</h1>
  //           <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
  //             <p className="text-gray-400">Kelola layanan social media marketing</p>
  //           </div>
  //         </div>
  //       );
  //     case 'riwayat':
  //       return (
  //         <div className="space-y-6">
  //           <h1 className="text-3xl font-bold">Riwayat Order Layanan</h1>
  //           <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
  //             <p className="text-gray-400">Lihat semua transaksi Anda</p>
  //           </div>
  //         </div>
  //       );
  //     case 'cs':
  //       return (
  //         <div className="space-y-6">
  //           <h1 className="text-3xl font-bold">Customer Service</h1>
  //           <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
  //             <p className="text-gray-400">Hubungi tim support kami</p>
  //           </div>
  //         </div>
  //       );
  //     case 'edit-teks':
  //       return (
  //         <div className="space-y-6">
  //           <h1 className="text-3xl font-bold">Edit Teks</h1>
  //           <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
  //             <p className="text-gray-400">Edit konten dan template teks</p>
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      <div className="lg:ml-72 min-h-screen">
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

        <main className="p-4 md:p-8">
          <div className="space-y-6">
            <h1 className="lg:text-3xl text-2xl font-bold">{title}</h1>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}