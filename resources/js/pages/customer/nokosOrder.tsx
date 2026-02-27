import React, { useState } from 'react';
import { Search, ChevronRight, ArrowLeft, ShoppingCart, Package, Globe } from 'lucide-react';
import { FormatRupiah } from '@/utils/FormatRupiah';
import useNokosHooks from '@/hooks/nokosHooks';
import useTransactionHooks from '@/hooks/transactionHooks';
import { NokosService, NokosCountry } from '@/types';
import CustomerDashboard from '@/components/customer/customerDashboard';

export default function NokosOrder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<NokosService | null>(null);
  const { customerNokosData } = useNokosHooks();
  const { handleTransactionNokos } = useTransactionHooks();

  const filteredServices = customerNokosData.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const countries = selectedService?.country ?? [];

  return (
    <CustomerDashboard>
      <div className='flex flex-col gap-10'>
        {selectedService ? (
          <button
            onClick={() => setSelectedService(null)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30 rounded-lg transition-all text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Platform
          </button>
        ) : (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari platform..."
              className="w-full bg-gray-700/30 border border-gray-600/30 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-gray-700/40 transition-all"
            />
          </div>
        )}

        {!selectedService && (
          <div>
            <h2 className="text-sm font-semibold mb-3 text-gray-300">Pilih Platform</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="group bg-gray-700/30 border border-gray-600/30 hover:border-purple-500/40 hover:bg-gray-700/40 rounded-xl p-4 transition-all text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                        {service.icon ? (
                          <img src={service.icon} alt={service.name} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-xs font-bold text-gray-700">
                            {service.code?.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1 truncate">{service.name}</h3>
                    <p className="text-xs text-gray-400">{service.country.length} negara</p>
                  </button>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <Search className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Platform tidak ditemukan</p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedService && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-600/30">
              <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                {selectedService.icon ? (
                  <img src={selectedService.icon} alt={selectedService.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-xs font-bold text-gray-700">
                    {selectedService.code?.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-white truncate">{selectedService.name}</h2>
                <p className="text-xs text-gray-400">{countries.length} negara tersedia</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 justify-between gap-8 grid-cols-1">
              {countries.length > 0 ? (
                countries.map((country: NokosCountry) => (
                  <div
                    key={country.id}
                    className="bg-gray-700/30 border border-gray-600/30 hover:border-purple-500/30 rounded-xl p-4 transition-all"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-xs font-bold text-purple-300 flex-shrink-0">
                          {country.iso
                            ? country.iso.toUpperCase()
                            : country.country_name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white truncate">
                            {country.country_name}
                          </h3>
                          {country.operator && (
                            <p className="text-xs text-gray-400 truncate">{country.operator}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-3 text-xs flex-wrap">
                          <span className={`flex items-center gap-1 ${country.stock > 100 ? 'text-green-400' :
                              country.stock > 50 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                            <Package className="w-3.5 h-3.5" />
                            Stok: {country.stock}
                          </span>
                        </div>
                        <span className="text-purple-400 font-bold text-sm">
                          {FormatRupiah(country.price)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleTransactionNokos(selectedService, country)}
                        disabled={country.stock === 0}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${country.stock > 0
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white' : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        <ShoppingCart className='w-4 h-auto'/>
                        Pesan
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <Globe className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Belum ada negara tersedia</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </CustomerDashboard>
  );
}