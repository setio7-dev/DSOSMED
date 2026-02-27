/* eslint-disable react-hooks/set-state-in-effect */
import { useAuth } from '@/context/authContext';
import useNokosHooks from '@/hooks/nokosHooks';
import { NokosService } from '@/types';
import SpinnerLoader from '@/ui/SpinnerLoader';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { Trash, DollarSign, Package, Globe, Layers, Search, PhoneCall } from 'lucide-react';
import { useEffect, useState } from 'react'

export default function NokosManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const {
        nokosData,
        handleNokosDelete
    } = useNokosHooks();
    const [filteredServices, setFilteredServices] = useState<NokosService[]>([]);
    const { loading } = useAuth();

    useEffect(() => {
        const filter = nokosData.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredServices(filter);
    }, [searchQuery, nokosData]);

    if (loading) {
        return <SpinnerLoader />
    }

    return (
        <div>
            <div className="space-y-8">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <h2 className="text-xl font-semibold text-purple-300">Daftar Layanan Nokos</h2>
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

                    <div className="w-full gap-8 flex flex-col">
                        {filteredServices.map((service) => (
                            <div key={service.id} className="space-y-2">
                                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-200 group">
                                    <div className="flex flex-row lg:items-center items-start lg:gap-3 gap-6">
                                        {service.icon && (
                                            <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                <img
                                                    src={service.icon}
                                                    alt={service.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-poppins-semibold text-white text-sm mb-1 truncate">
                                                {service.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-poppins-regular">Code: {service.code}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-4 space-y-2">
                                    {service.country.map((country) => (
                                        <div
                                            key={country.id}
                                            className="bg-gray-800/30 border border-gray-700/40 rounded-lg p-3 hover:border-primary/40 hover:bg-gray-800/40 transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded bg-primary/20 flex items-center justify-center">
                                                        <Globe className="w-3.5 h-3.5 text-primary" />
                                                    </div>
                                                    <span className="text-xs font-poppins-semibold text-white">{country.country_name}</span>
                                                </div>

                                                <div className="h-4 w-px bg-gray-700" />

                                                <div className="flex items-center gap-1.5">
                                                    <DollarSign className="w-3.5 h-3.5 text-green-400" />
                                                    <span className="text-xs font-poppins-medium text-white">{FormatRupiah(country.price)}</span>
                                                </div>

                                                <div className="h-4 w-px bg-gray-700" />

                                                <div className="flex items-center gap-1.5">
                                                    <Package className="w-3.5 h-3.5 text-orange-500" />
                                                    <span className="text-xs font-poppins-regular text-gray-300">stok: {country.stock}</span>
                                                </div>

                                                <div className="h-4 w-px bg-gray-700" />

                                                <div className="flex items-center gap-1.5">
                                                    <PhoneCall className="w-3.5 h-3.5 text-purple-500" />
                                                    <span className="text-xs font-poppins-regular text-gray-300">jenis API: {country.type}</span>
                                                </div>

                                                {country.operator && (
                                                    <>
                                                        <div className="h-4 w-px bg-gray-700" />
                                                        <div className="flex items-center gap-1.5">
                                                            <Layers className="w-3.5 h-3.5 text-pink-400" />
                                                            <span className="text-xs font-poppins-regular text-gray-300">operator: {country.operator}</span>
                                                        </div>
                                                    </>
                                                )}

                                                <div className="ml-auto flex items-center gap-2">
                                                    <button onClick={() => handleNokosDelete(country.id)} className="p-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-all duration-200">
                                                        <Trash className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
        </div>
    )
}