/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Search, Globe, ChevronRight, ArrowLeft, ShoppingCart,
  Package
} from 'lucide-react';
import CustomerDashboard from '@/components/customer/customerDashboard';
import { ServiceOrderAdaOtpProps } from '@/types';
import useAdaOtpHooks from '@/hooks/adaOtpHooks';
import { FormatRupiah } from '@/utils/FormatRupiah';

export default function NokosOrder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParent, setSelectedParent] = useState<ServiceOrderAdaOtpProps | null>(null);
  const { serviceOrderData } = useAdaOtpHooks();

  const filteredParents = serviceOrderData.filter(parent =>
    parent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCountries = selectedParent
    ? selectedParent.child.filter(c => c.nokos_parent_id === selectedParent.id)
    : [];

  return (
    <CustomerDashboard>
      <div className="space-y-6">
        {selectedParent && (
          <button
            onClick={() => setSelectedParent(null)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30 rounded-lg transition-all text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Platform
          </button>
        )}

        {/* Search Bar */}
        {!selectedParent && (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari platform (WhatsApp, Telegram, dll)..."
              className="w-full bg-gray-700/30 border border-gray-600/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-gray-700/40 transition-all"
            />
          </div>
        )}

        {/* Platform Grid */}
        {!selectedParent && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Pilih Platform</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredParents.length > 0 ? (
                filteredParents.map((parent) => (
                  <button
                    key={parent.id}
                    onClick={() => setSelectedParent(parent)}
                    className="group bg-gray-700/30 border border-gray-600/30 hover:border-purple-500/40 hover:bg-gray-700/40 rounded-xl p-4 transition-all text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <img src={parent.image} alt={parent.name} className="w-full h-full object-contain" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">{parent.name}</h3>
                    <p className="text-xs text-gray-400">
                      {parent.child.filter((c: any) => c.nokos_parent_id === parent.id).length} negara
                    </p>
                  </button>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <Search className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Tidak ada platform ditemukan</p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedParent && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-600/30">
              <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
                <img src={selectedParent.image} alt={selectedParent.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{selectedParent.name}</h2>
                <p className="text-sm text-gray-400">{filteredCountries.length} negara tersedia</p>
              </div>
            </div>

            <div className="space-y-3">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <div
                    key={country.id}
                    className="bg-gray-700/30 border border-gray-600/30 hover:border-purple-500/30 rounded-xl p-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-11 h-11 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                          {country.country
                            .split(' ')
                            .map(word => word[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white mb-1">{country.country}</h3>
                          <div className="flex items-center gap-3 text-xs">
                            <span className={`flex items-center gap-1 ${Number(country.stock) > 100 ? 'text-green-400' :
                                Number(country.stock) > 50 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                              <Package className="w-3.5 h-3.5" />
                              {country.stock}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-purple-400 font-semibold">
                              {FormatRupiah(Number(country.price))}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        // onClick={() => handleOrder(country as any)}
                        disabled={Number(country.stock) === 0}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${Number(country.stock) > 0
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                            : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {Number(country.stock) > 0 ? 'Order' : 'Habis'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Globe className="w-12 h-12 text-gray-500 mx-auto mb-2" />
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