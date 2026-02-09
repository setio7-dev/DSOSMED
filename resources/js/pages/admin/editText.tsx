/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminDashboard from '@/components/admin/adminDashboard'
import { useAuth } from '@/context/authContext';
import useCustomerServiceHooks from '@/hooks/customerServiceHooks';
import useGuideHooks from '@/hooks/guideHooks'
import SpinnerLoader from '@/ui/SpinnerLoader';
import { Edit3, FileText, AlignLeft, Save, RotateCcw, Sparkles, CheckCircle, AlertCircle, ChevronDown, Search, ListFilter, Headphones, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function EditText() {
    const { guideFormData, handleChangeGuide, handleUpdateGuide, guideData, setSelectedId, guidesData } = useGuideHooks();
    const { customerServiceData, handleChangeCustomerService, handleUpdateCustomerService, customerServiceForm, setCustomerServiceForm } = useCustomerServiceHooks();
    const [selectedGuide, setSelectedGuide] = useState<any>('');
    const { loading } = useAuth();

    useEffect(() => {
        setSelectedId(selectedGuide);
        if (customerServiceData) {
            setCustomerServiceForm({
                name: customerServiceData[0]?.name,
                desc: customerServiceData[0]?.desc,
                phone: customerServiceData[0]?.phone
            })
        }
    }, [selectedGuide, setSelectedId, customerServiceData, setCustomerServiceForm]);

    const handleSelectGuide = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGuide(e.target.value);
    };

    if (loading || customerServiceData.length == 0 || guidesData.length == 0) {
        return <SpinnerLoader/>
    }

    return (
        <AdminDashboard title="Edit Teks">
            <div className="space-y-6">
                <div className="space-y-6">
                    <div
                        className="bg-gradient-to-r from-purple-700 via-purple-600/20 to-pink-600/20 border border-primary/30 rounded-xl p-6"
                        data-aos="fade-down"
                        data-aos-duration="800"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/50 rounded-full blur-xl animate-pulse"></div>
                                <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center relative">
                                    <Edit3 className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-2xl font-poppins-semibold text-white">Edit Panduan</h2>
                                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                                </div>
                                <p className="text-gray-300 font-poppins-regular">Perbarui informasi panduan pengguna</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl p-6"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-600/30 rounded-lg flex items-center justify-center">
                                <ListFilter className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-poppins-semibold text-white">Pilih Panduan</h3>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                <select
                                    value={selectedGuide}
                                    onChange={handleSelectGuide}
                                    className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-primary/50 rounded-lg pl-12 pr-12 py-4 text-white font-poppins-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 relative appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Pilih panduan yang ingin diubah...</option>
                                    {guidesData?.map((guide) => (
                                        <option key={guide.id} value={guide.id} className="bg-gray-800 py-2">
                                            {guide.name} - {guide.type}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {selectedGuide && guideData && (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div
                                    className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6"
                                    data-aos="fade-right"
                                    data-aos-duration="800"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                            <AlertCircle className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h3 className="text-lg font-poppins-semibold text-white">Data Saat Ini</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-gray-800/50 border border-gray-700/40 rounded-lg p-4">
                                            <p className="text-xs text-gray-400 font-poppins-medium mb-2">Nama Panduan</p>
                                            <p className="text-white font-poppins-regular">{guideData?.name || '-'}</p>
                                        </div>

                                        <div className="bg-gray-800/50 border border-gray-700/40 rounded-lg p-4">
                                            <p className="text-xs text-gray-400 font-poppins-medium mb-2">Tipe</p>
                                            <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-poppins-medium">
                                                {guideData?.type || '-'}
                                            </span>
                                        </div>

                                        <div className="bg-gray-800/50 border border-gray-700/40 rounded-lg p-4">
                                            <p className="text-xs text-gray-400 font-poppins-medium mb-2">Deskripsi</p>
                                            <p className="text-white font-poppins-regular whitespace-pre-line leading-relaxed">
                                                {guideData?.desc || '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/30 rounded-xl p-6"
                                    data-aos="fade-left"
                                    data-aos-duration="800"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-primary/30 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-poppins-semibold text-white">Data Baru</h3>
                                    </div>

                                    <form onSubmit={() => handleUpdateGuide(guideData.type)} className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-poppins-medium text-gray-300">
                                                <FileText className="w-4 h-4 text-primary" />
                                                Nama Panduan
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={guideFormData.name}
                                                    onChange={handleChangeGuide}
                                                    className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-primary/50 rounded-lg px-4 py-3 text-white font-poppins-regular placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 relative"
                                                    placeholder="Masukkan nama panduan"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-poppins-medium text-gray-300">
                                                <AlignLeft className="w-4 h-4 text-primary" />
                                                Deskripsi
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                                                <textarea
                                                    name="desc"
                                                    value={guideFormData.desc}
                                                    onChange={handleChangeGuide}
                                                    rows={8}
                                                    className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-primary/50 rounded-lg px-4 py-3 text-white font-poppins-regular placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 relative resize-none"
                                                    placeholder="Masukkan deskripsi panduan&#10;Gunakan enter untuk baris baru"
                                                    required
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 font-poppins-regular">Gunakan Enter untuk memisahkan setiap langkah</p>
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <button
                                                type="submit"
                                                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 cursor-pointer text-white font-poppins-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                                            >
                                                <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                                Simpan Perubahan
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => window.location.reload()}
                                                className="bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/50 text-gray-300 hover:text-white font-poppins-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                                            >
                                                <RotateCcw className="w-5 h-5" />
                                                Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    )}

                    {!selectedGuide && (
                        <div
                            className="bg-gray-900/30 border border-gray-700/40 rounded-xl p-12 text-center"
                            data-aos="fade-up"
                            data-aos-duration="800"
                        >
                            <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-poppins-semibold text-gray-400 mb-2">Pilih Panduan Terlebih Dahulu</h3>
                            <p className="text-gray-500 font-poppins-regular">Silakan pilih panduan dari dropdown di atas untuk memulai edit</p>
                        </div>
                    )}
                </div>
                <div className="space-y-6">
                    <div
                        className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 rounded-xl p-6"
                        data-aos="fade-down"
                        data-aos-duration="800"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/50 rounded-full blur-xl animate-pulse"></div>
                                <div className="w-16 h-16 bg-blue-600/30 rounded-full flex items-center justify-center relative">
                                    <Headphones className="w-8 h-8 text-blue-400" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-2xl font-poppins-semibold text-white">Edit Customer Service</h2>
                                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                                </div>
                                <p className="text-gray-300 font-poppins-regular">Perbarui informasi customer service</p>
                            </div>
                        </div>
                    </div>


                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                        <div
                            className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl p-6"
                            data-aos="fade-left"
                            data-aos-duration="800"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-600/30 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-lg font-poppins-semibold text-white">Ubah Data</h3>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-poppins-medium text-gray-300">
                                        <FileText className="w-4 h-4 text-blue-400" />
                                        Nama Customer Service
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={customerServiceForm.name}
                                            onChange={handleChangeCustomerService}
                                            className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 rounded-lg px-4 py-3 text-white font-poppins-regular placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 relative"
                                            placeholder="Masukkan nama customer service"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-poppins-medium text-gray-300">
                                        <Phone className="w-4 h-4 text-green-400" />
                                        Nomor Telepon
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={customerServiceForm.phone}
                                            onChange={handleChangeCustomerService}
                                            className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-green-500/50 rounded-lg px-4 py-3 text-white font-poppins-regular placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 relative"
                                            placeholder="Contoh: +6283800106050"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 font-poppins-regular">Format: +62 atau 08xx</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-poppins-medium text-gray-300">
                                        <AlignLeft className="w-4 h-4 text-purple-400" />
                                        Deskripsi Layanan
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                                        <textarea
                                            name="desc"
                                            value={customerServiceForm.desc}
                                            onChange={handleChangeCustomerService}
                                            rows={10}
                                            className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 rounded-lg px-4 py-3 text-white font-poppins-regular placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 relative resize-none"
                                            placeholder="Masukkan deskripsi layanan&#10;1. Layanan pertama&#10;2. Layanan kedua&#10;dst..."
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 font-poppins-regular">Gunakan Enter untuk memisahkan setiap layanan</p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        onClick={() => handleUpdateCustomerService()}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-600/80 hover:to-purple-600/80 text-white font-poppins-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                        Simpan Perubahan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => window.location.reload()}
                                        className="bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/50 text-gray-300 hover:text-white font-poppins-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboard>
    )
}