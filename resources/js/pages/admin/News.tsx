import useNewsHooks from '@/hooks/newsHooks';
import { NewsProps } from '@/types';
import React, { useState, useRef } from 'react';
import {
    Plus, Pencil, Trash2, X, ImagePlus, Newspaper,
    Calendar, AlertTriangle, Eye
} from 'lucide-react';
import { useAuth } from '@/context/authContext';
import AdminDashboard from '@/components/admin/adminDashboard';
import SpinnerLoader from '@/ui/SpinnerLoader';

type ModalType = 'form' | 'delete' | 'preview' | null;

export default function News() {
    const {
        newsData,
        handlePostNews,
        handleChange,
        handleDeleteNews,
        handleImageChange,
        handleUpdateNews,
        formData,
        setFormData
    } = useNewsHooks();

    const [modalType, setModalType] = useState<ModalType>(null);
    const [selectedNews, setSelectedNews] = useState<NewsProps | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const { loading } = useAuth();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    const openCreate = () => {
        setIsEdit(false);
        setSelectedNews(null);
        setImagePreview(null);
        setModalType('form');
    };

    const openEdit = (news: NewsProps) => {
        setIsEdit(true);
        setSelectedNews(news);
        setImagePreview(typeof news.image === 'string' ? news.image : null);
        handleChange({ target: { name: 'title', value: news.title } } as React.ChangeEvent<HTMLInputElement>);
        handleChange({ target: { name: 'desc', value: news.desc } } as React.ChangeEvent<HTMLInputElement>);
        setModalType('form');
    };

    const openDelete = (news: NewsProps) => {
        setSelectedNews(news);
        setModalType('delete');
    };

    const openPreview = (news: NewsProps) => {
        setSelectedNews(news);
        setModalType('preview');
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedNews(null);
        setImagePreview(null);
        setFormData({ title: '', desc: '', image: null});
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageChange(e);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async () => {
        if (isEdit && selectedNews) {
            await handleUpdateNews(selectedNews.id);
        } else {
            await handlePostNews();
        }
        closeModal();
    };

    const onDelete = async () => {
        if (!selectedNews) return;
        await handleDeleteNews(selectedNews.id);
        closeModal();
    };

    if (loading) return <SpinnerLoader/>

    return (
        <AdminDashboard title="Berita">
            <div className="p-4 sm:p-6 space-y-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl sm:text-xl font-bold text-white">Manajemen Berita</h1>
                        <p className="text-xs text-gray-400 mt-0.5">{newsData.length} artikel tersedia</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-900/30"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Tambah Berita</span>
                        <span className="sm:hidden">Tambah</span>
                    </button>
                </div>

                {newsData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gray-700/40 border border-gray-600/30 flex items-center justify-center mb-4">
                            <Newspaper className="w-8 h-8 text-gray-500" />
                        </div>
                        <p className="text-gray-300 font-semibold text-sm">Belum ada berita</p>
                        <p className="text-gray-500 text-xs mt-1">Tambahkan berita pertama Anda</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {newsData.map((news: NewsProps) => (
                            <div
                                key={news.id}
                                className="group bg-gray-800/40 border border-gray-700/40 hover:border-purple-500/30 rounded-2xl overflow-hidden transition-all"
                            >
                                <div className="relative w-full aspect-video bg-gray-700/40 overflow-hidden">
                                    {news.image ? (
                                        <img
                                            src={`/storage/${news.image}`}
                                            alt={news.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Newspaper className="w-10 h-10 text-gray-600" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs text-gray-300">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(news.created_at)}
                                    </div>
                                </div>

                                <div className="p-4 space-y-3">
                                    <div>
                                        <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">{news.title}</h3>
                                        <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{news.desc}</p>
                                    </div>

                                    <div className="flex items-center gap-2 pt-1">
                                        <button
                                            onClick={() => openPreview(news)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-700/40 hover:bg-gray-700/60 text-gray-300 text-xs font-medium transition-all"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            Lihat
                                        </button>
                                        <button
                                            onClick={() => openEdit(news)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-xs font-medium transition-all"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDelete(news)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {(modalType === 'form') && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full sm:max-w-lg bg-gray-900 border border-gray-700/50 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-700/40">
                            <div>
                                <h2 className="text-base font-bold text-white">
                                    {isEdit ? 'Edit Berita' : 'Tambah Berita'}
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {isEdit ? 'Perbarui informasi berita' : 'Isi detail berita baru'}
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-400 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative w-full aspect-video rounded-xl border-2 border-dashed border-gray-600/50 hover:border-purple-500/50 bg-gray-800/40 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden"
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={isEdit ? `/storage/${imagePreview}` : imagePreview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <div className="flex items-center gap-2 text-white text-sm font-medium">
                                                <ImagePlus className="w-4 h-4" />
                                                Ganti Gambar
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ImagePlus className="w-8 h-8 text-gray-500 mb-2" />
                                        <p className="text-xs text-gray-400 font-medium">Klik untuk upload gambar</p>
                                        <p className="text-xs text-gray-600 mt-0.5">JPG, PNG, WEBP</p>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={onImageChange}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-300">Judul Berita</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Masukkan judul berita..."
                                    className="w-full bg-gray-800/60 border border-gray-600/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-300">Deskripsi</label>
                                <textarea
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>}
                                    placeholder="Tulis isi berita di sini..."
                                    rows={5}
                                    className="w-full bg-gray-800/60 border border-gray-600/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-all resize-none leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 px-5 py-4 border-t border-gray-700/40">
                            <button
                                onClick={closeModal}
                                className="flex-1 py-3 rounded-xl bg-gray-700/40 hover:bg-gray-700/60 text-gray-300 text-sm font-semibold transition-all"
                            >
                                Batal
                            </button>
                            <button
                                onClick={onSubmit}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all"
                            >
                                {isEdit ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                {isEdit ? 'Simpan Perubahan' : 'Tambah Berita'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalType === 'delete' && selectedNews && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full sm:max-w-sm bg-gray-900 border border-gray-700/50 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 text-center space-y-3">
                            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                                <AlertTriangle className="w-7 h-7 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-white">Hapus Berita?</h2>
                                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                                    Berita <span className="text-white font-semibold">"{selectedNews.title}"</span> akan dihapus secara permanen.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 px-5 pb-6">
                            <button
                                onClick={closeModal}
                                className="flex-1 py-3 rounded-xl bg-gray-700/40 hover:bg-gray-700/60 text-gray-300 text-sm font-semibold transition-all"
                            >
                                Batal
                            </button>
                            <button
                                onClick={onDelete}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/80 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-semibold transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalType === 'preview' && selectedNews && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full sm:max-w-lg bg-gray-900 border border-gray-700/50 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
                        {selectedNews.image && (
                            <div className="relative w-full aspect-video overflow-hidden">
                                <img
                                    src={`/storage/${selectedNews.image}`}
                                    alt={selectedNews.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                                <button
                                    onClick={closeModal}
                                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <div className="p-5 space-y-3 max-h-[50vh] overflow-y-auto">
                            {!selectedNews.image && (
                                <div className="flex items-center justify-between">
                                    <span />
                                    <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-400">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(selectedNews.created_at)}
                                {selectedNews.updated_at !== selectedNews.created_at && (
                                    <span className="ml-1 text-gray-500">· Diperbarui {formatDate(selectedNews.updated_at)}</span>
                                )}
                            </div>
                            <h2 className="text-base font-bold text-white leading-snug">{selectedNews.title}</h2>
                            <p className="text-sm text-gray-300 leading-relaxed">{selectedNews.desc}</p>
                        </div>
                        <div className="flex gap-3 px-5 py-4 border-t border-gray-700/40">
                            <button
                                onClick={() => { closeModal(); openEdit(selectedNews); }}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-sm font-semibold transition-all"
                            >
                                <Pencil className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => { closeModal(); openDelete(selectedNews); }}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-semibold transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminDashboard>
    );
}