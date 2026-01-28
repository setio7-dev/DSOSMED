/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from '@/context/authContext';
import useAdaOtpHooks from '@/hooks/adaOtpHooks';
import { ServicesAdaOtpProps, ServiceCountryAdaOtpProps } from '@/types';
import SpinnerLoader from '@/ui/SpinnerLoader';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { Pen, Trash, DollarSign, Package, Globe, Activity, Layers, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface adaOtpManagement {
    isOpen: boolean;
    onClose: () => void;
    service: ServicesAdaOtpProps;
    country: ServiceCountryAdaOtpProps;
}

function ServiceCountryModal({
    isOpen,
    onClose,
    service,
    country
}: adaOtpManagement) {

    const {
        formPutAdaOtp,
        setFormPutAdaOtp,
        handleChangeAdaOtpServiceUpdate,
        handleUpdateAdaOtpServiceCountry
    } = useAdaOtpHooks();

    useEffect(() => {
        const fetchForm = () => {
            setFormPutAdaOtp({
                price: country?.price,
                name: country?.name,
                stock: country?.stock
            })
        }

        fetchForm();
    }, [country, setFormPutAdaOtp]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-700/50 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                    <h2 className="text-xl font-poppins-semibold text-white">
                        Ubah Layanan Ada OTP {service.text}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-poppins-medium text-gray-300 mb-2">
                                Nama
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formPutAdaOtp.name}
                                onChange={handleChangeAdaOtpServiceUpdate}
                                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-poppins-regular focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-poppins-medium text-gray-300 mb-2">
                                Harga
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formPutAdaOtp.price}
                                onChange={handleChangeAdaOtpServiceUpdate}
                                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-poppins-regular focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-poppins-medium text-gray-300 mb-2">
                                Stok
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formPutAdaOtp.stock}
                                onChange={handleChangeAdaOtpServiceUpdate}
                                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-poppins-regular focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-700/50">
                        <button
                            onClick={onClose}
                            type="button"
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-poppins-medium transition-all duration-200"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            onClick={() => handleUpdateAdaOtpServiceCountry(country.id)}
                            className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg font-poppins-medium transition-all duration-200"
                        >
                            Ubah Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdaOtpManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const {
        customerServicesAdaOtpData,
        handleDeleteAdaOtpServiceCountry
    } = useAdaOtpHooks();
    const [filteredServices, setFilteredServices] = useState<ServicesAdaOtpProps[]>([]);
    const [showAdaOtpModal, setShowAdaOtpModal] = useState(false);

    const [selectedServiceAdaOtp, setSelectedServiceAdaOtp] = useState<ServicesAdaOtpProps | null>(null);
    const [selectedAdaOtp, setSelectedAdaOtp] = useState<ServiceCountryAdaOtpProps | null>(null);
    const { loading } = useAuth();

    useEffect(() => {
        const fetchFiltering = () => {
            const filter = customerServicesAdaOtpData.filter((item) => {
                return item.text.toLowerCase().includes(searchQuery.toLowerCase());
            })

            setFilteredServices(filter);
        }

        fetchFiltering();
    }, [searchQuery, customerServicesAdaOtpData]);

    const handleAdaOtpModal = (country: ServiceCountryAdaOtpProps, service: ServicesAdaOtpProps) => {
        setShowAdaOtpModal(true);
        setSelectedServiceAdaOtp(service)
        setSelectedAdaOtp(country)
    }

    if (loading) {
        return <SpinnerLoader />
    }

    return (
        <div>
            <ServiceCountryModal
                isOpen={showAdaOtpModal}
                onClose={() => setShowAdaOtpModal(false)}
                service={selectedServiceAdaOtp as any}
                country={selectedAdaOtp as any}
            />

            <div className="space-y-8">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <h2 className="text-xl font-semibold text-purple-300">Daftar Layanan Nokos Ada OTP</h2>
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
                                        <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                            <img
                                                src={service.icon}
                                                alt={service.text}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-poppins-semibold text-white text-sm mb-1 truncate">
                                                {service.text}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-poppins-regular">Service ID: {service.id}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-4 space-y-2">
                                    {service.children.map((child) => (
                                        <div
                                            key={child.id}
                                            className="bg-gray-800/30 border border-gray-700/40 rounded-lg p-3 hover:border-primary/40 hover:bg-gray-800/40 transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded bg-primary/20 flex items-center justify-center">
                                                        <Globe className="w-3.5 h-3.5 text-primary" />
                                                    </div>
                                                    <span className="text-xs font-poppins-semibold text-white">{child.name}</span>
                                                </div>

                                                <div className="h-4 w-px bg-gray-700"></div>

                                                <div className="flex items-center gap-1.5">
                                                    <DollarSign className="w-3.5 h-3.5 text-green-400" />
                                                    <span className="text-xs font-poppins-medium text-white">{FormatRupiah(child.price)}</span>
                                                </div>

                                                <div className="h-4 w-px bg-gray-700"></div>

                                                <div className="flex items-center gap-1.5">
                                                    <Package className="w-3.5 h-3.5 text-orange-500" />
                                                    <span className="text-xs font-poppins-regular text-gray-300">{child.stock}</span>
                                                </div>

                                                <div className="h-4 w-px bg-gray-700"></div>

                                                <div className="flex items-center gap-1.5">
                                                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                                                    <span className="text-xs font-poppins-regular text-gray-300 capitalize">{child.current_demand_status}</span>
                                                </div>

                                                <div className="h-4 w-px bg-gray-700"></div>

                                                <div className="flex items-center gap-1.5">
                                                    <Layers className="w-3.5 h-3.5 text-pink-400" />
                                                    <span className="text-xs font-poppins-regular text-gray-300">{child.operator}</span>
                                                </div>

                                                <div className="ml-auto flex items-center gap-2">
                                                    <button onClick={() => handleAdaOtpModal(child, service)} className="p-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded transition-all duration-200">
                                                        <Pen className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button onClick={() => handleDeleteAdaOtpServiceCountry(child.id)} className="p-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-all duration-200">
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
