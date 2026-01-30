/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
    Search, ArrowLeft, ShoppingCart,
    Package
} from 'lucide-react';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { MedanPediaServiceProps } from '@/types';
import useMedanPediaHooks from '@/hooks/medanPediaHooks';

export default function SuntikMedanpedia() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedParent, setSelectedParent] = useState<MedanPediaServiceProps | null>(null);
    const { customerserviceMedanPediaData } = useMedanPediaHooks();

    const filteredParents = customerserviceMedanPediaData.filter(parent =>
        parent.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-black/30 space-y-6 backdrop-blur-sm rounded-lg">
            {selectedParent && (
                <button
                    onClick={() => setSelectedParent(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30 rounded-lg transition-all text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Platform
                </button>
            )}

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

            {!selectedParent && (
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-200">Pilih Platform (Medanpedia)</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {filteredParents.length > 0 ? (
                            filteredParents.map((parent) => (
                                <button
                                    key={parent.id}
                                    onClick={() => {
                                        setSelectedParent(parent)
                                    }}
                                    className="group bg-gray-700/30 border border-gray-600/30 hover:border-purple-500/40 hover:bg-gray-700/40 rounded-xl p-4 transition-all text-left"
                                >
                                    <h3 className="text-sm font-semibold text-white mb-1">{parent.name}</h3>
                                    <p className="text-xs text-gray-400">{parent.description}</p>
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
                        <h2 className="text-lg font-bold text-white">{selectedParent.name}</h2>
                    </div>

                    <div className="bg-gray-700/30 border border-gray-600/30 hover:border-purple-500/30 rounded-xl p-4 transition-all"                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-11 h-11 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                    {selectedParent.name
                                        .split(' ')
                                        .map(word => word[0])
                                        .join('')
                                        .slice(0, 2)
                                        .toUpperCase()
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-white mb-1">{selectedParent.name}</h3>
                                    <div className="flex items-center gap-3 text-xs">
                                        <span className="flex items-center gap-1 text-green-500">
                                            <Package className="w-3.5 h-3.5" />
                                            {selectedParent.min + " - " + selectedParent.max}
                                        </span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-purple-400 font-semibold">
                                            {selectedParent.category}
                                        </span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-purple-400 font-semibold">
                                            {selectedParent.type}
                                        </span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-purple-400 font-semibold">
                                            {FormatRupiah(Number(selectedParent.price))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                // onClick={() => handleOrder(selectedParent as any)}
                                disabled={Number(selectedParent.min) === 0}
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${Number(selectedParent.min) > 0
                                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                                    : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {Number(selectedParent.min) > 0 ? 'Order' : 'Habis'}
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}