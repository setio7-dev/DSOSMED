/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/admin/sidebar';
import { useAuth } from '@/context/authContext';
import SpinnerLoader from '@/ui/SpinnerLoader';
import { router } from '@inertiajs/react';

export default function AdminDashboard({ children, title }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return <SpinnerLoader/>
  }

  if (!user || !user.isAdmin) {
    router.visit('/auth', {
      replace: true
    });
    return;
  }

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
                  <p className="text-sm font-semibold">{user?.username}</p>
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