import { useAuth } from "@/context/authContext";
import useMedanPediaHooks from "@/hooks/medanPediaHooks";
import useTransactionHooks from "@/hooks/transactionHooks";
import { SuntikServiceProps } from "@/types";
import SpinnerLoader from "@/ui/SpinnerLoader";
import { FormatRupiah } from "@/utils/FormatRupiah";
import { Trash, DollarSign, Package, Layers, Search, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuntikManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const { customerserviceMedanPediaData } = useMedanPediaHooks();
    const { handleDeleteServiceSuntik, handleUpdateChangeServiceSuntik, handleUpdateServiceSuntik } = useTransactionHooks();
    const [filteredServices, setFilteredServices] = useState<SuntikServiceProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<SuntikServiceProps | null>(null);
    const { loading } = useAuth();

    useEffect(() => {
        const filter = customerserviceMedanPediaData.filter((item) =>
            item.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
        );
        setFilteredServices(filter);
    }, [searchQuery, customerserviceMedanPediaData]);

    const openUpdateModal = (service: SuntikServiceProps) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    if (loading) return <SpinnerLoader />;

    return (
        <div className="px-2 sm:px-0">
            <div className="space-y-4 sm:space-y-8">
                <div className="">
                    <div className="flex flex-col gap-3 mb-5 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-purple-300">Daftar Layanan Suntik</h2>
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari layanan..."
                                className="pl-9 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all w-full"
                            />
                        </div>
                    </div>

                    <div className="w-full gap-3 sm:gap-6 flex flex-col">
                        {filteredServices.map((service) => (
                            <div key={service.id} className="bg-gray-800/20 border border-gray-700/40 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-200">
                                <div className="p-3.5 sm:p-4 border-b border-gray-700/40">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-poppins-semibold text-white text-sm mb-1 leading-snug">
                                                {service.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-poppins-regular leading-relaxed line-clamp-2">
                                                {service.description}
                                            </p>
                                            <span className="inline-block mt-1.5 text-xs text-purple-400/80 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                                                {service.api_type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                                            <button
                                                onClick={() => openUpdateModal(service)}
                                                className="p-2 bg-purple-600/20 active:bg-purple-600/40 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-all duration-200 touch-manipulation"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteServiceSuntik(Number(service.id))}
                                                className="p-2 bg-red-600/20 active:bg-red-600/40 hover:bg-red-600/30 text-red-400 rounded-lg transition-all duration-200 touch-manipulation"
                                            >
                                                <Trash className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 divide-x divide-gray-700/40">
                                    <div className="flex flex-col items-center justify-center gap-1 py-2.5 px-2">
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3 text-green-400 shrink-0" />
                                            <span className="text-xs text-gray-400">Harga</span>
                                        </div>
                                        <span className="text-xs font-poppins-medium text-white text-center leading-tight">{FormatRupiah(Number(service.price))}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1 py-2.5 px-2">
                                        <div className="flex items-center gap-1">
                                            <Package className="w-3 h-3 text-orange-400 shrink-0" />
                                            <span className="text-xs text-gray-400">Max</span>
                                        </div>
                                        <span className="text-xs font-poppins-medium text-white">{service.max}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1 py-2.5 px-2">
                                        <div className="flex items-center gap-1">
                                            <Layers className="w-3 h-3 text-pink-400 shrink-0" />
                                            <span className="text-xs text-gray-400">Tipe</span>
                                        </div>
                                        <span className="text-xs font-poppins-medium text-white text-center line-clamp-1">{service.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-sm">Tidak ada layanan ditemukan</p>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && selectedService && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative w-full sm:max-w-md bg-gray-900 border border-gray-700/50 sm:rounded-2xl rounded-t-2xl shadow-2xl shadow-black/50 z-10 max-h-[92dvh] flex flex-col">
                        <div className="w-10 h-1 bg-gray-600 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

                        <div className="flex items-center justify-between px-4 pt-2 pb-4 sm:p-5 border-b border-gray-700/50 shrink-0">
                            <div className="flex-1 min-w-0 pr-3">
                                <h3 className="text-base sm:text-lg font-semibold text-white">Update Layanan</h3>
                                <p className="text-xs text-gray-400 mt-0.5 truncate">{selectedService.name}</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-lg bg-gray-800/50 active:bg-gray-700 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-200 touch-manipulation shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
                            <div className="space-y-1.5">
                                <label className="text-xs font-poppins-medium text-gray-300">Nama Layanan</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={selectedService.name}
                                    onChange={handleUpdateChangeServiceSuntik}
                                    placeholder="Masukkan nama layanan..."
                                    className="w-full px-3.5 py-3 sm:py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-poppins-medium text-gray-300">Deskripsi</label>
                                <textarea
                                    name="description"
                                    defaultValue={selectedService.description}
                                    onChange={handleUpdateChangeServiceSuntik}
                                    placeholder="Masukkan deskripsi..."
                                    className="w-full min-h-60 px-3.5 py-3 sm:py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-3 gap-2 pt-1">
                                <div className="bg-gray-800/40 border border-gray-700/40 rounded-lg p-2.5 text-center">
                                    <p className="text-xs text-gray-500 mb-1">Harga</p>
                                    <p className="text-xs font-poppins-medium text-green-400 leading-tight">{FormatRupiah(Number(selectedService.price))}</p>
                                </div>
                                <div className="bg-gray-800/40 border border-gray-700/40 rounded-lg p-2.5 text-center">
                                    <p className="text-xs text-gray-500 mb-1">Max</p>
                                    <p className="text-xs font-poppins-medium text-orange-400">{selectedService.max}</p>
                                </div>
                                <div className="bg-gray-800/40 border border-gray-700/40 rounded-lg p-2.5 text-center">
                                    <p className="text-xs text-gray-500 mb-1">Kategori</p>
                                    <p className="text-xs font-poppins-medium text-pink-400 truncate">{selectedService.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 p-4 sm:p-5 border-t border-gray-700/50 shrink-0" style={{paddingBottom: "calc(1rem + env(safe-area-inset-bottom))"}}>
                            <button
                                onClick={closeModal}
                                className="flex-1 py-3 sm:py-2.5 px-4 bg-gray-800/50 active:bg-gray-700 hover:bg-gray-700/50 border border-gray-700/50 text-gray-300 hover:text-white text-sm font-poppins-medium rounded-lg transition-all duration-200 touch-manipulation"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleUpdateServiceSuntik(Number(selectedService.id))}
                                className="flex-1 py-3 sm:py-2.5 px-4 bg-purple-600 active:bg-purple-700 hover:bg-purple-500 text-white text-sm font-poppins-medium rounded-lg transition-all duration-200 shadow-lg shadow-purple-900/30 touch-manipulation"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}