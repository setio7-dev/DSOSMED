/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminDashboard from '@/components/admin/adminDashboard'
import { useAuth } from '@/context/authContext';
import useMiraiPediaHooks from '@/hooks/miraiPediaHooks';
import { SuntikServiceProps } from '@/types';
import SpinnerLoader from '@/ui/SpinnerLoader';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { Plus, Search, X, TrendingUp, Clock, Package, Settings } from 'lucide-react';
import { useState } from 'react'

interface ServiceSettingsModalProps {
  isOpen: boolean;
  onClose: any;
  serviceData: SuntikServiceProps | null;
}

const ServiceSettingsModal = ({ isOpen, onClose, serviceData }: ServiceSettingsModalProps) => {
  const { profit, handleMiraiPost, handleMiraiChange } = useMiraiPediaHooks();
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'instagram':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'facebook':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'youtube':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'tiktok':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'twitter':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (!isOpen || !serviceData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 border border-gray-700/50 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Pengaturan Layanan</h2>
              <p className="text-sm text-gray-400">ID: {serviceData.id} • {serviceData.type}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white mb-1">{serviceData.name}</h3>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(serviceData.category)}`}>
                  {serviceData.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-gray-400">Harga</span>
                </div>
                <p className="text-sm font-bold text-white">{FormatRupiah(serviceData.price)}</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">Min/Max</span>
                </div>
                <p className="text-sm font-bold text-white">{serviceData.min}/{serviceData.max}</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">Waktu</span>
                </div>
                <p className="text-sm font-bold text-white">{serviceData.avg_time_in_seconds}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profit (Rp)
              </label>
              <input
                type="number"
                name="profit"
                value={profit}
                onChange={handleMiraiChange}
                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Masukkan profit"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200"
            >
              Batal
            </button>
            <button
              onClick={() => handleMiraiPost(serviceData)}
              className="flex-1 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-5 h-5" />
              Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServiceSuntikMiraiPedia() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading } = useAuth();
  const [selectedService, setSelectedService] = useState<SuntikServiceProps | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { miraiServiceData } = useMiraiPediaHooks();

  const filteredServices = miraiServiceData?.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenSettings = (service: SuntikServiceProps) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'instagram':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'facebook':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'youtube':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'tiktok':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'twitter':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading || miraiServiceData?.length === 0) {
    return <SpinnerLoader/>
  }

  return (
    <AdminDashboard title="Layanan Suntik (MiraiPedia)">
      <ServiceSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceData={selectedService}
      />

      <div className="space-y-8">
        <div className="">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-purple-300">Daftar Layanan MiraiPedia</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari layanan..."
                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all w-full md:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredServices?.map((service) => (
              <div
                key={service.id}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-200 group"
              >
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white text-sm line-clamp-2 flex-1">
                      {service.name}
                    </h3>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${getCategoryColor(service.category)}`}>
                      {service.category.slice(0, 14) + "..."}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">ID: {service.id} • {service.type}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <span className="text-xs text-gray-400 block mb-0.5">Harga</span>
                      <p className="text-sm font-bold text-white">{FormatRupiah(service.price)}</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <span className="text-xs text-gray-400 block mb-0.5">Min/Max</span>
                      <p className="text-sm font-bold text-white">{service.min}/{service.max}</p>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-2 mb-3">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Clock className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-gray-400">Waktu Pengerjaan</span>
                    </div>
                    <p className="text-xs font-medium text-white">{service.avg_time_in_seconds}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleOpenSettings(service)} 
                  className="w-full cursor-pointer px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Tambah Layanan
                </button>
              </div>
            ))}
          </div>

          {filteredServices?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Tidak ada layanan ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </AdminDashboard>
  )
}