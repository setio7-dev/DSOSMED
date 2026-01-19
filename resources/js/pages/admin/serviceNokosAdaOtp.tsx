/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminDashboard from '@/components/admin/adminDashboard'
import useAdaOtpHooks from '@/hooks/adaOtpHooks';
import SpinnerLoader from '@/utils/SpinnerLoader';
import { RefreshCwIcon, Plus, Search, CheckCircle, Clock, Package, TrendingUp, X, PhoneIcon } from 'lucide-react';
import { useEffect, useState } from 'react'

const CountriesModal = ({ isOpen, onClose, serviceName, serviceId, countryData, selectedData=null }: any) => {
  const getDemandColor = (status: any) => {
    switch (status) {
      case 'sangat_tinggi':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'tinggi':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'normal':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getDemandText = (status: any) => {
    switch (status) {
      case 'sangat_tinggi':
        return 'Sangat Tinggi';
      case 'tinggi':
        return 'Tinggi';
      case 'normal':
        return 'Normal';
      default:
        return status;
    }
  };

  const handleSelected = (country: any) => {
    selectedData(country);
    onClose();
  }
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 border border-gray-700/50 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{serviceName}</h2>
              <p className="text-sm text-gray-400">Service ID: {serviceId}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {countryData.map((country: any, index: number) => (
              <div
                key={index}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {country.iso}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{country.name}</h3>
                      <p className="text-xs text-gray-400">{country.prefix} • {country.operator}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDemandColor(country.current_demand_status)}`}>
                    {getDemandText(country.current_demand_status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-gray-400">Harga</span>
                    </div>
                    <p className="text-lg font-bold text-white">{country.price_formatted}</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-400">Stok</span>
                    </div>
                    <p className="text-lg font-bold text-white">{country.stock_formatted}</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">Delivery</span>
                    </div>
                    <p className="text-lg font-bold text-white">{country.delivery_formatted}</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-xs text-gray-400">Avg Time</span>
                    </div>
                    <p className="text-xs font-medium text-white">{country.avg_delivery_time_formatted}</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Total Order</p>
                      <p className="text-sm font-semibold text-white">{country.metrics.total_order}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Success</p>
                      <p className="text-sm font-semibold text-green-400">{country.metrics.total_success}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Today</p>
                      <p className="text-sm font-semibold text-blue-400">{country.metrics.today_order}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Complete</p>
                      <p className="text-sm font-semibold text-purple-400">{country.metrics.complete_currently}</p>
                    </div>
                  </div>
                </div>

                {country.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {country.labels.map((label: any, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs font-medium border border-purple-500/30"
                      >
                        {label.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}

                <button onClick={() => handleSelected(country)} className="flex-1 cursor-pointer mt-6 px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5">
                  <PhoneIcon className="w-3.5 h-3.5" />
                  Pakai ID
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServiceNokosAdaOtp() {
  const { servicesData, handleShowCountry, countryData } = useAdaOtpHooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState("");  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedData, setSelectedData] = useState<any>(null);

  const filteredServices = servicesData.filter(service =>
    service.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  const handleOpenServiceModal = async (id: any, name: string) => {
    await handleShowCountry(id);
    setServiceId(id);
    setServiceName(name);
    setIsModalOpen(true);    
  }

  return (
    <AdminDashboard title="Layanan Nokos Ada Otp">
      {isLoading && <SpinnerLoader />}

      <CountriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={serviceName}
        serviceId={serviceId}
        countryData={countryData}
        selectedId={null}
        selectedData={setSelectedData}
      />

      <div className="space-y-8">
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 text-purple-300">Tambah Layanan Baru</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nomor ID Layanan
                </label>
                <input
                  type="text"
                  name="nomorId"
                  value={selectedData?.id}
                  // onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Masukkan nomor ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service ID
                </label>
                <input
                  type="text"
                  name="serviceId"
                  value={serviceId}
                  // onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Masukkan service ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profit
                </label>
                <input
                  type="text"
                  name="profit"
                  // value={formData.profit}
                  // onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Masukkan profit"
                />
              </div>
            </div>

            <button
              // onClick={handleSubmit}
              className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
            >
              <Plus className="w-5 h-5" />
              Tambah
            </button>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-purple-300">Daftar Layanan</h2>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={service.icon}
                      alt={service.text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm mb-1 truncate">
                      {service.text}
                    </h3>
                    <p className="text-xs text-gray-400">Service ID: {service.id}</p>
                  </div>
                </div>

                <button onClick={() => handleOpenServiceModal(service.id, service.text)} className="flex-1 cursor-pointer mt-6 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5">
                  <RefreshCwIcon className="w-3.5 h-3.5" />
                  Refresh Countries
                </button>
              </div>
            ))}
          </div>
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Tidak ada layanan ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </AdminDashboard>
  )
}
