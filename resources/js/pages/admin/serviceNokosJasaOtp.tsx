/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminDashboard from '@/components/admin/adminDashboard'
import useJasaotpHooks from '@/hooks/jasaotpHooks';
import { JasaOtpCountryProps, JasaOtpServiceDetailProps } from '@/types';
import SpinnerLoader from '@/ui/SpinnerLoader';
import { Plus, Search, X, Globe, Package, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react'

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    countryName: string;
    countryId: number;
    serviceDetail: any;
    onSelectService: (service: any) => void;
}

const ServiceModal = ({ isOpen, onClose, countryName, countryId, serviceDetail, onSelectService }: ServiceModalProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    if (!isOpen || !serviceDetail) return null;

    const services = serviceDetail?.service?.[countryId] || {};
    const serviceList = Object.entries(services).map(([key, value]: [string, any]) => ({
        code: key,
        ...value
    }));

    const filteredServices = serviceList.filter((service: any) =>
        service.layanan.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            <h2 className="text-2xl font-bold text-white mb-1 capitalize">{countryName}</h2>
                            <p className="text-sm text-gray-400">Country ID: {countryId}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari layanan..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredServices.map((service: any, index: number) => (
                            <div
                                key={index}
                                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-200"
                            >
                                <div className="mb-4">
                                    <h3 className="font-semibold text-white text-lg mb-2 capitalize">{service.layanan}</h3>
                                    <p className="text-xs text-gray-400">Code: {service.code}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-gray-900/50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp className="w-4 h-4 text-purple-400" />
                                            <span className="text-xs text-gray-400">Harga</span>
                                        </div>
                                        <p className="text-lg font-bold text-white">Rp {service.harga?.toLocaleString('id-ID')}</p>
                                    </div>

                                    <div className="bg-gray-900/50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Package className="w-4 h-4 text-blue-400" />
                                            <span className="text-xs text-gray-400">Stok</span>
                                        </div>
                                        <p className="text-lg font-bold text-white">{service.stok?.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        onSelectService(service);
                                        onClose();
                                    }}
                                    className="w-full px-4 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Pilih Layanan
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
        </div>
    );
};

export default function ServiceNokosJasaOtp() {
    const {
        jasaOtpData,
        jasaOtpDataDetail,
        handleShowJasaOtpDetail,
        handleChangeJasaOtpProfit,
        handleJasaOtpPost,
        profit
    } = useJasaotpHooks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedCountry, setSelectedCountry] = useState<JasaOtpCountryProps | null>(null);
    const [selectedService, setSelectedService] = useState<JasaOtpServiceDetailProps | null>(null);
    const [selectedOperator, setSelectedOperator] = useState('');

    const filteredCountries = jasaOtpData?.filter((country: any) =>
        country.nama_negara.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isLoading]);

    const handleOpenServiceModal = async (country: any) => {
        setSelectedCountry(country);
        await handleShowJasaOtpDetail(country.id_negara);
        setIsModalOpen(true);
    };

    const handleSelectService = (service: any) => {
        setSelectedService(service);
    };

    if (jasaOtpData?.length === 0) {
        return <SpinnerLoader />
    }

    return (
        <AdminDashboard title="Layanan Nokos Jasa Otp">
            {isLoading && <SpinnerLoader />}

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                countryName={selectedCountry?.nama_negara || ''}
                countryId={selectedCountry?.id_negara || 0}
                serviceDetail={jasaOtpDataDetail}
                onSelectService={handleSelectService}
            />

            <div className="space-y-8">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-6 text-purple-300">Tambah Layanan Baru</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Negara
                                </label>
                                <input
                                    type="text"
                                    value={selectedCountry?.id_negara || ''}
                                    disabled
                                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all capitalize"
                                    placeholder="Pilih negara terlebih dahulu"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Layanan
                                </label>
                                <input
                                    type="text"
                                    value={selectedService?.layanan || ''}
                                    disabled
                                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all capitalize"
                                    placeholder="Pilih layanan terlebih dahulu"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Profit
                                </label>
                                <input
                                    type="text"
                                    value={profit ? profit : selectedService?.harga}
                                    onChange={handleChangeJasaOtpProfit}
                                    name='profit'
                                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all capitalize"
                                    placeholder="Pilih layanan terlebih dahulu"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Operator
                                </label>
                                <select
                                    value={selectedOperator}
                                    onChange={(e) => setSelectedOperator(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                    disabled={!selectedCountry}
                                >
                                    <option value="">Pilih Operator</option>
                                    {jasaOtpDataDetail?.operator?.[selectedCountry!.id_negara]?.map((op: string, index: number) => (
                                        <option key={index} value={op} className="capitalize">
                                            {op}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={() => handleJasaOtpPost({
                                negara: selectedCountry,
                                layanan: selectedService,
                                operator: selectedOperator
                            })}
                            disabled={!selectedCountry || !selectedService || !selectedOperator}
                            className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah
                        </button>
                    </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <h2 className="text-xl font-semibold text-purple-300">Daftar Negara</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari negara..."
                                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all w-full md:w-64"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredCountries.map((country: any) => (
                            <div
                                key={country.id_negara}
                                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-200 group"
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-white text-sm mb-1 capitalize">
                                            {country.nama_negara}
                                        </h3>
                                        <p className="text-xs text-gray-400">ID: {country.id_negara}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleOpenServiceModal(country)}
                                    className="w-full px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Pilih Layanan
                                </button>
                            </div>
                        ))}
                    </div>

                    {filteredCountries.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">Tidak ada negara ditemukan</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminDashboard>
    )
}