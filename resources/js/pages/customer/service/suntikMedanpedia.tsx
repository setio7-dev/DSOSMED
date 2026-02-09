import React, { useState } from 'react';
import {
    Search,
    Target,
    ShoppingCart,
    Package,
    AlertCircle,
    ChevronDown,
    Loader2,
    Download,
    X,
    Info,
    ChevronUp,
    Hash,
} from 'lucide-react';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { MedanPediaServiceProps } from '@/types';
import useMedanPediaHooks from '@/hooks/medanPediaHooks';
import jsPDF from 'jspdf';
import useTransactionHooks from '@/hooks/transactionHooks';

interface TargetItem {
    username: string;
    quantity: number;
}

interface OrderReceipt {
    serviceName: string;
    targets: TargetItem[];
    pricePerUnit: number;
    totalQuantity: number;
    totalPrice: number;
    orderId: string;
    timestamp: string;
}

export default function SuntikMedanpedia() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState<MedanPediaServiceProps | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderReceipt, setOrderReceipt] = useState<OrderReceipt | null>(null);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [defaultQuantity, setDefaultQuantity] = useState<string>('100');
    const [target, setTarget] = useState<string>('');
    const { customerserviceMedanPediaData } = useMedanPediaHooks();
    const { handleTransactionMedanPedia } = useTransactionHooks();

    const filteredServices = customerserviceMedanPediaData.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectService = (service: MedanPediaServiceProps) => {
        setSelectedService(service);
        setIsDropdownOpen(false);
        setSearchQuery('');
    };

    const parseTargets = (): TargetItem[] => {
        const lines = target.split('\n').filter(line => line.trim() !== '');
        const items: TargetItem[] = [];
        const defaultQty = parseInt(defaultQuantity) || 100;

        lines.forEach(line => {
            const parts = line.split('|').map(p => p.trim());

            if (parts.length === 2) {
                const username = parts[0];
                const quantity = parseInt(parts[1]);
                if (username && !isNaN(quantity) && quantity > 0) {
                    items.push({ username, quantity });
                }
            } else if (parts.length === 1 && parts[0]) {
                const username = parts[0];
                if (username) {
                    items.push({ username, quantity: defaultQty });
                }
            }
        });

        return items;
    };

    const targetItems = parseTargets();
    const totalQuantity = targetItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = selectedService ? (totalQuantity / 1000) * Number(selectedService.price) : 0;

    const hasValidTargets = targetItems.length > 0;
    const hasInvalidLines = target.trim() !== '' && target.split('\n').filter(line => line.trim() !== '').length !== targetItems.length;

    const onSubmitOrder = async () => {
        if (!selectedService || !hasValidTargets) return;

        setIsSubmitting(true);
        try {
            const orderSubmit = await handleTransactionMedanPedia(totalPrice, selectedService, targetItems)
            if (orderSubmit?.success) {
                const receipt: OrderReceipt = {
                    serviceName: selectedService.name,
                    targets: targetItems,
                    pricePerUnit: Number(selectedService.price),
                    totalQuantity: totalQuantity,
                    totalPrice: totalPrice,
                    orderId: `ORD-${Date.now()}`,
                    timestamp: new Date().toLocaleString('id-ID'),
                };
    
                setOrderReceipt(receipt);
                setSelectedService(null);
                setTarget('');
            }

        } finally {
            setIsSubmitting(false);
        }
    };

    const downloadReceiptPDF = () => {
        if (!orderReceipt) return;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('STRUK PEMBELIAN', 105, 20, { align: 'center' });

        doc.setFontSize(10);
        doc.text(`Order ID: ${orderReceipt.orderId}`, 20, 35);
        doc.text(`Tanggal: ${orderReceipt.timestamp}`, 20, 42);

        doc.setFontSize(12);
        doc.text('SERVICE', 20, 55);
        doc.setFontSize(10);
        doc.text(orderReceipt.serviceName, 20, 62);

        doc.setFontSize(12);
        doc.text('TARGET', 20, 75);
        doc.setFontSize(9);
        let yPos = 82;
        orderReceipt.targets.forEach((item, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`${index + 1}. ${item.username} - ${item.quantity} items`, 20, yPos);
            yPos += 7;
        });

        if (yPos > 240) {
            doc.addPage();
            yPos = 20;
        } else {
            yPos += 10;
        }

        doc.setFontSize(12);
        doc.text('RINGKASAN', 20, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.text(`Total Item: ${orderReceipt.totalQuantity}`, 20, yPos);
        yPos += 7;
        doc.text(`${orderReceipt.totalQuantity} x ${FormatRupiah(orderReceipt.pricePerUnit)} = ${FormatRupiah(orderReceipt.totalPrice)}`, 20, yPos);
        yPos += 7;
        doc.text(`Total Estimasi: ${FormatRupiah(orderReceipt.totalPrice)}`, 20, yPos);

        yPos += 15;
        doc.setFontSize(9);
        doc.text('Terima kasih atas pembelian Anda!', 105, yPos, { align: 'center' });

        doc.save(`receipt-${orderReceipt.orderId}.pdf`);
    };

    return (
        <div className="p-6 bg-black/30 space-y-6 backdrop-blur-sm rounded-lg">
            {orderReceipt ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-200">Resi Pembelian</h2>
                        <button
                            onClick={() => setOrderReceipt(null)}
                            className="p-2 hover:bg-gray-700/30 rounded-lg transition-all"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/30 rounded-xl p-6 space-y-4">
                        <div className="text-center pb-4 border-b border-purple-500/30">
                            <h3 className="text-xl font-bold text-white mb-1">Order Berhasil!</h3>
                            <p className="text-sm text-purple-300">ID: {orderReceipt.orderId}</p>
                            <p className="text-xs text-gray-400 mt-1">{orderReceipt.timestamp}</p>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-black/20 rounded-lg p-3">
                                <p className="text-xs text-gray-400 mb-1">Service</p>
                                <p className="text-sm font-semibold text-white">{orderReceipt.serviceName}</p>
                            </div>

                            <div className="bg-black/20 rounded-lg p-3 max-h-60 overflow-y-auto">
                                <p className="text-xs text-gray-400 mb-2">Target ({orderReceipt.targets.length} link)</p>
                                <div className="space-y-1">
                                    {orderReceipt.targets.map((item, index) => (
                                        <div key={index} className="text-xs font-mono text-white">
                                            <div className="flex justify-between">
                                                <span>{index + 1}. {item.username}</span>
                                                <span className="text-purple-400">{item.quantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-300">Total item:</span>
                                <span className="text-white font-semibold">{orderReceipt.totalQuantity}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2 border-t border-purple-500/20">
                                <span className="text-gray-300">
                                    {orderReceipt.totalQuantity} × {FormatRupiah(orderReceipt.pricePerUnit)}
                                </span>
                                <span className="text-purple-400 font-bold">
                                    {FormatRupiah(orderReceipt.totalPrice)}
                                </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-purple-500/30">
                                <span className="text-sm text-gray-300 font-semibold">Total estimasi:</span>
                                <span className="text-lg text-purple-400 font-bold">
                                    {FormatRupiah(orderReceipt.totalPrice)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={downloadReceiptPDF}
                            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all text-white"
                        >
                            <Download className="w-5 h-5" />
                            Download Resi PDF
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-lg font-semibold text-gray-200">Order Service</h2>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-300">
                            <Package className="w-4 h-4 text-purple-400" />
                            Pilih Service *
                        </label>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                disabled={isSubmitting}
                                className="w-full bg-gray-700/30 border border-gray-600/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:bg-gray-700/40 transition-all flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className={selectedService ? 'text-white' : 'text-gray-400'}>
                                    {selectedService ? selectedService.name : 'Pilih service...'}
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-600/50 rounded-xl shadow-xl max-h-80 overflow-hidden">
                                    <div className="p-3 border-b border-gray-600/50">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Cari service..."
                                                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg pl-10 pr-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>

                                    <div className="max-h-60 overflow-y-auto">
                                        {filteredServices.length > 0 ? (
                                            filteredServices.map((service) => (
                                                <button
                                                    key={service.id}
                                                    onClick={() => handleSelectService(service)}
                                                    className="w-full text-left px-4 py-3 hover:bg-gray-700/50 transition-colors border-b border-gray-700/30 last:border-b-0"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                                            {service.name
                                                                .split(' ')
                                                                .map((w: string) => w[0])
                                                                .join('')
                                                                .slice(0, 2)
                                                                .toUpperCase()}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm font-semibold text-white mb-1">
                                                                {service.name}
                                                            </h3>
                                                            <div className="text-xs text-gray-400 flex gap-2 flex-wrap">
                                                                <span className="flex items-center gap-1 text-green-400">
                                                                    <Package className="w-3 h-3" />
                                                                    {service.min} - {service.max}
                                                                </span>
                                                                <span>•</span>
                                                                <span>{service.category}</span>
                                                                <span>•</span>
                                                                <span className="text-purple-400 font-semibold">
                                                                    {FormatRupiah(Number(service.price))}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <Search className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                                                <p className="text-gray-400 text-sm">Tidak ada service ditemukan</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedService && (
                        <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                                className="w-full p-4 flex items-center gap-3 hover:bg-gray-700/40 transition-all"
                            >
                                <div className="w-10 h-10 bg-purple-600/30 border border-purple-500/40 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Info className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="text-sm font-semibold text-white">
                                        Deskripsi sebelum beli
                                    </h3>
                                </div>
                                {isDescriptionOpen ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {isDescriptionOpen && (
                                <div className="px-4 pb-4 pt-2 space-y-3 border-t border-gray-600/30">
                                    <div className="bg-black/20 rounded-lg p-3 space-y-2">
                                        <p className="text-xs text-purple-300">
                                            Waktu rata-rata: {selectedService.average_time || '0-5 jam'}
                                        </p>
                                        <p className="text-xs text-purple-300">
                                            Contoh link: https://t.me/RENZOMARKET
                                        </p>
                                    </div>

                                    <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-3">
                                        <p className="text-xs text-purple-300">
                                            Dengan memesan anda telah menyetujui ketentuan kami.
                                        </p>
                                    </div>


                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-300">
                            <Target className="w-4 h-4 text-purple-400" />
                            Target & Jumlah * {targetItems.length > 0 && (
                                <span className="text-xs text-purple-400">({targetItems.length} target valid)</span>
                            )}
                        </label>
                        <textarea
                            value={target}
                            onChange={e => setTarget(e.target.value)}
                            placeholder="Format 1: username | jumlah&#10;Format 2: username (pakai jumlah default)"
                            disabled={isSubmitting}
                            rows={5}
                            className="w-full bg-gray-700/30 border border-gray-600/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-gray-700/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none font-mono"
                        />
                        {hasInvalidLines && (
                            <p className="flex items-center gap-1 text-xs text-yellow-400">
                                <AlertCircle className="w-3 h-3" />
                                Beberapa baris tidak valid. Format: username/link atau username/link | jumlah
                            </p>
                        )}
                        {!target.trim() && (
                            <p className="flex items-center gap-1 text-xs text-red-400">
                                <AlertCircle className="w-3 h-3" />
                                Target wajib diisi
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-300">
                            <Hash className="w-4 h-4 text-purple-400" />
                            Jumlah Default *
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                                type="number"
                                value={defaultQuantity}
                                onChange={e => setDefaultQuantity(e.target.value)}
                                placeholder="100"
                                disabled={isSubmitting}
                                min="1"
                                className="flex-1 bg-gray-700/30 border border-gray-600/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-gray-700/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            {selectedService && (
                                <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl px-4 py-3 text-xs text-gray-300 text-center sm:whitespace-nowrap">
                                    <span className="text-gray-400">Min-Max: </span>
                                    <span className="text-green-400 font-semibold">
                                        {selectedService.min} - {selectedService.max}
                                    </span>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 flex items-start gap-1">
                            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>Digunakan jika username/link tanpa jumlah</span>
                        </p>
                    </div>

                    {targetItems.length > 0 && (
                        <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-4 space-y-3">
                            <p className="text-xs text-gray-400 mb-2">Preview Target:</p>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                                {targetItems.map((item, index) => (
                                    <div key={index} className="flex justify-between text-xs font-mono text-white">
                                        <span>{index + 1}. {item.username}</span>
                                        <span className="text-purple-400">{item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            {selectedService && (
                                <div className="pt-3 border-t border-gray-600/30 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Total item:</span>
                                        <span className="text-white font-semibold">{totalQuantity}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">
                                            {totalQuantity} × {FormatRupiah(Number(selectedService.price) / 100)}
                                        </span>
                                        <span className="text-purple-400 font-bold">
                                            {FormatRupiah(totalPrice)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-600/30">
                                        <span className="text-sm text-gray-300 font-semibold">Total estimasi:</span>
                                        <span className="text-lg text-purple-400 font-bold">
                                            {FormatRupiah(totalPrice)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        disabled={!selectedService || isSubmitting || !hasValidTargets}
                        onClick={onSubmitOrder}
                        className={`w-full py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all ${
                            selectedService && !isSubmitting && hasValidTargets
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-gray-600/40 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-5 h-5" />
                                Order Semua Baris
                            </>
                        )}
                    </button>
                </>
            )}
        </div>
    );
}
