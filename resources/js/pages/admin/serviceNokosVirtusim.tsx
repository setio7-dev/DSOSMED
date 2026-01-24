/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminDashboard from '@/components/admin/adminDashboard'
import useNokosHooks from '@/hooks/nokosHooks';
import { ServiceVirtusimListCountryProps, ServiceVirtusimListServiceProps } from '@/types';
import SpinnerLoader from '@/ui/SpinnerLoader';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { RefreshCwIcon, Plus, Search, CheckCircle, Package, TrendingUp, X, Tag, Phone } from 'lucide-react';
import { useEffect, useState } from 'react'

interface CountryDataProps {
    isOpen: boolean;
    onClose: any;
    serviceName: string;
    serviceId: number;
    countryData: ServiceVirtusimListServiceProps[];
    selectedData: any;
}

const CountriesModal = ({ isOpen, onClose, serviceName, serviceId, countryData, selectedData = null }: CountryDataProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OTP':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'SMS':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'CALL':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusColor = (status: any) => {
    if (status === "1" || status === 1) {
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
    return 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  const getStatusText = (status: any) => {
    if (status === "1" || status === 1) {
      return 'Aktif';
    }
    return 'Nonaktif';
  };

  const handleSelected = (country: ServiceVirtusimListServiceProps) => {
    if (selectedData) {
      selectedData(country);
    }
    onClose();
  };

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
            {countryData && countryData.map((country, index) => (
              <div
                key={index}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {country.country?.substring(0, 2).toUpperCase() || 'ID'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{country.country || 'Unknown'}</h3>
                      <p className="text-xs text-gray-400">ID: {country.id} • {country.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(country.category)}`}>
                      {country.category}
                    </span>
                    {country.is_promo === "1" && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium border bg-yellow-500/20 text-yellow-300 border-yellow-500/30 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Promo
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-gray-400">Harga</span>
                    </div>
                    <p className="text-lg font-bold text-white">{FormatRupiah(Number(country.price))}</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-400">Tersedia</span>
                    </div>
                    <p className="text-lg font-bold text-white">{country.tersedia} pcs</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-3 col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">Status</span>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(country.status)}`}>
                      {getStatusText(country.status)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => handleSelected(country)} 
                  className="w-full cursor-pointer px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Pilih Layanan Ini
                </button>
              </div>
            ))}
          </div>

          {(!countryData || countryData.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-400">Tidak ada data negara tersedia</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ServiceNokosVirtusim() {
  const { 
    serviceVirtusimData,
    handleShowService, 
    serviceVirtusimCountryData,
    serviceId,
    setServiceId,
    setCountryId,
    countryId,
    profit,
    handleChangeService,
    handlePostServiceVirtusim
  } = useNokosHooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceName, setServiceName] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = serviceVirtusimData.filter(service =>
    service.country_name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleOpenServiceModal = async (service: ServiceVirtusimListCountryProps) => {
    await handleShowService(service.country_name);
    setServiceId(service.id);
    setServiceName(service.country_name);
    setIsModalOpen(true);    
  }

  return (
    <AdminDashboard title="Layanan Nokos Virtusim">
      {isLoading && <SpinnerLoader />}

      <CountriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={serviceName}
        serviceId={serviceId}
        countryData={serviceVirtusimCountryData}
        selectedData={setCountryId}
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
                  name="country"
                  value={countryId?.id}
                  disabled
                  onChange={handleChangeService}
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
                  name="service"
                  value={serviceId}
                  disabled
                  onChange={handleChangeService}
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
                  value={profit}
                  onChange={handleChangeService}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Masukkan profit"
                />
              </div>
            </div>

            <button
              onClick={() => handlePostServiceVirtusim()}
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
                      src={service.img_link}
                      alt={service.country_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm mb-1 truncate">
                      {service.country_name}
                    </h3>
                    <p className="text-xs text-gray-400">Service ID: {service.id}</p>
                  </div>
                </div>

                <button onClick={() => handleOpenServiceModal(service)} className="flex-1 cursor-pointer mt-6 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5">
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
