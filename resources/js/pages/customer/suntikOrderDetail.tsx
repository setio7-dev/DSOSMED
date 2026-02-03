import {
    ArrowLeft,
    ShoppingCart,
    Target,
    Hash,
    Package,
    AlertCircle,
} from 'lucide-react';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { MedanPediaServiceProps } from '@/types';
import useMedanPediaHooks from '@/hooks/medanPediaHooks';

interface SuntikOrderDetailProps {
    selectedParent: MedanPediaServiceProps;
    onBack: () => void;
}

export default function SuntikOrderDetail({
    selectedParent,
    onBack,
}: SuntikOrderDetailProps) {
    const {
        target,
        setTarget,
        quantity,
        setQuantity,
        errors,
        isValid,
        handleSubmitOrder,
    } = useMedanPediaHooks();

    return (
        <div className="p-6 bg-black/30 space-y-6 backdrop-blur-sm rounded-lg">
            <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30 rounded-lg transition-all text-sm font-medium text-white"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali
            </button>

            <h2 className="text-lg font-semibold text-gray-200">
                Detail Order
            </h2>

            <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-white font-bold">
                        {selectedParent.name
                            .split(' ')
                            .map(w => w[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">
                            {selectedParent.name}
                        </h3>
                        <div className="text-xs text-gray-400 flex gap-2 flex-wrap">
                            <span className="flex items-center gap-1 text-green-400">
                                <Package className="w-3 h-3" />
                                {selectedParent.min} - {selectedParent.max}
                            </span>
                            <span>•</span>
                            <span>{selectedParent.category}</span>
                            <span>•</span>
                            <span>{selectedParent.type}</span>
                            <span>•</span>
                            <span className="text-purple-400 font-semibold">
                                {FormatRupiah(Number(selectedParent.price))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                    <Target className="w-4 h-4 text-purple-400" />
                    Target *
                </label>
                <input
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                    placeholder="Username / URL / Nomor"
                    className="w-full bg-gray-700/30 border border-gray-600/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-gray-700/40 transition-all"
                />
                {errors.target && !target && (
                    <p className="flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="w-3 h-3" />
                        {errors.target}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                    <Hash className="w-4 h-4 text-purple-400" />
                    Jumlah *
                </label>
                <input
                    type="number"
                    min={1}
                    value={quantity ?? ''}
                    onChange={e => {
                        const val = e.target.value;
                        setQuantity(val === '' ? null : Number(val));
                    }}
                    placeholder="0"
                    className="w-full bg-gray-700/30 border border-gray-600/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-gray-700/40 transition-all"
                />
                {errors.quantity && (
                    <p className="flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="w-3 h-3" />
                        {errors.quantity}
                    </p>
                )}
            </div>

            {quantity && quantity > 0 && (
                <div className="bg-gray-700/20 border border-gray-600/30 rounded-xl p-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Total</span>
                        <span className="text-purple-400 font-bold">
                            {FormatRupiah(quantity * Number(selectedParent.price))}
                        </span>
                    </div>
                </div>
            )}

            <button
                disabled={!isValid}
                onClick={() => handleSubmitOrder(selectedParent.service_id)}
                className={`w-full py-3 rounded-xl font-semibold flex justify-center gap-2 ${isValid
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-600/40 text-gray-500'
                }`}
            >
                <ShoppingCart className="w-4 h-4" />
                Konfirmasi Order
            </button>
        </div>
    );
}
