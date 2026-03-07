/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, useMemo } from 'react';
import { Search, Edit2, User, Shield, Wallet, X, TrendingUp, TrendingDown, Activity, Layers, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import AdminDashboard from '@/components/admin/adminDashboard';
import useUserHook from '@/hooks/userHook';
import { FormatRupiah } from '@/utils/FormatRupiah';
import { FormatDate } from '@/utils/FormatDate';
import { SuntikServiceProps, UserProps } from '@/types';
import useNewsHooks from '@/hooks/newsHooks';
import useMedanPediaHooks from '@/hooks/medanPediaHooks';

const useCountUp = (target: number, duration = 1200, start = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
};

const PulsingDot = ({ color }: { color: string }) => (
    <span className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color}`} />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
    </span>
);

const StatCard = ({ label, value, icon: Icon, color, delay, animate }: any) => {
    const count = useCountUp(value, 1000, animate);
    return (
        <div
            className="relative overflow-hidden rounded-xl border p-4 flex flex-col gap-2 group"
            style={{
                background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
                borderColor: `${color}40`,
                animationDelay: `${delay}ms`,
            }}
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 50%, ${color}15 0%, transparent 70%)` }} />
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: `${color}cc` }}>{label}</p>
                <div className="p-1.5 rounded-lg" style={{ background: `${color}25` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                </div>
            </div>
            <p className="text-3xl font-black text-white tabular-nums">{count.toLocaleString()}</p>
        </div>
    );
};

interface NewsItem {
    tanggal: string;
    id_layanan: string;
    nama_layanan: string;
    keterangan: string;
    old_price: string | null;
    new_price: string | null;
}

interface EnrichedNewsItem extends NewsItem {
    currentPrice: number;
    newPriceNum: number;
    serviceName: string;
    hasPriceChange: boolean;
    isPriceIncrease: boolean;
    suntikService: SuntikServiceProps;
}

const PriceChangeRow = ({
    item,
    index,
    onSync,
    syncing,
}: {
    item: EnrichedNewsItem;
    index: number;
    onSync: (id: string, newPrice: number, suntikService: SuntikServiceProps) => void;
    syncing: boolean;
}) => {
    const diff = item.newPriceNum - item.currentPrice;
    const pct = ((Math.abs(diff) / item.currentPrice) * 100).toFixed(1);
    const isIncrease = diff > 0;

    return (
        <div
            className="flex items-start gap-3 p-3 rounded-xl border border-gray-700/40 bg-gray-800/30 hover:bg-gray-800/60 transition-all duration-300"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${isIncrease ? 'bg-rose-500/20' : 'bg-emerald-500/20'}`}>
                {isIncrease
                    ? <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                    : <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                }
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-purple-400 font-mono">#{item.id_layanan}</span>
                    <p className="text-xs font-medium text-gray-200 leading-snug line-clamp-2">{item.serviceName}</p>
                </div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs text-gray-500 font-mono">Lokal: {FormatRupiah(item.currentPrice)}</span>
                    <ChevronRight className="w-3 h-3 text-gray-600" />
                    <span className="text-xs font-mono font-bold" style={{ color: isIncrease ? '#f87171' : '#34d399' }}>
                        API: {FormatRupiah(item.newPriceNum)}
                    </span>
                </div>
                {item.keterangan && (
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed italic border-l-2 border-gray-700 pl-2">
                        {item.keterangan}
                    </p>
                )}
                <p className="text-xs text-gray-600 mt-1">{new Date(item.tanggal).toLocaleString('id-ID')}</p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className={`px-2 py-1 rounded-md text-xs font-bold tabular-nums ${isIncrease ? 'bg-rose-500/15 text-rose-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
                    {isIncrease ? '+' : '-'}{pct}%
                </div>
                <button
                    onClick={() => onSync(item.id_layanan, item.newPriceNum, item.suntikService)}
                    disabled={syncing}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                        boxShadow: '0 2px 10px rgba(124,58,237,0.4)',
                    }}
                >
                    <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
                    Sesuaikan
                </button>
            </div>
        </div>
    );
};

const OtherChangeRow = ({ item, index }: { item: NewsItem; index: number }) => (
    <div
        className="flex items-start gap-3 p-3 rounded-xl border border-gray-700/40 bg-gray-800/30 hover:bg-gray-800/60 transition-all duration-300"
        style={{ animationDelay: `${index * 80}ms` }}
    >
        <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-cyan-500/20">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-purple-400 font-mono">#{item.id_layanan}</span>
                {item.nama_layanan && (
                    <p className="text-xs font-medium text-gray-200 leading-snug line-clamp-1">{item.nama_layanan}</p>
                )}
            </div>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.keterangan}</p>
            <p className="text-xs text-gray-600 mt-1">{new Date(item.tanggal).toLocaleString('id-ID')}</p>
        </div>
    </div>
);

const AdminNewsModal = ({
    isOpen,
    onClose,
    data,
}: {
    isOpen: boolean;
    onClose: () => void;
    data: NewsItem[] | null;
}) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'price' | 'others'>('overview');
    const [syncingId, setSyncingId] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { customerserviceMedanPediaData } = useMedanPediaHooks();
    const { handleUpdatePriceSuntikFromNews } = useNewsHooks();

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            setTimeout(() => setVisible(true), 20);
        } else {
            setVisible(false);
            const t = setTimeout(() => setMounted(false), 400);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isOpen) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
        const colors = ['#a855f7', '#6366f1', '#ec4899', '#06b6d4'];
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.1,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        let raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
    }, [isOpen, mounted]);

    const { priceChanges, otherChanges } = useMemo(() => {
        if (!data || !customerserviceMedanPediaData) return { priceChanges: [], otherChanges: [] };

        const serviceMap = new Map(
            customerserviceMedanPediaData.map((s: any) => [String(s.service_id), s])
        );

        const filtered = data.filter(item => serviceMap.has(String(item.id_layanan)));

        const pc: EnrichedNewsItem[] = [];
        const oc: NewsItem[] = [];

        filtered.forEach(item => {
            const service = serviceMap.get(String(item.id_layanan));
            if (item.new_price !== null && item.new_price !== undefined) {
                const currentPrice = service?.price ?? 0;
                const newPriceNum = parseFloat(item.new_price);
                if (currentPrice !== newPriceNum) {
                    pc.push({
                        ...item,
                        currentPrice,
                        newPriceNum,
                        serviceName: item.nama_layanan || service?.name || `Layanan #${item.id_layanan}`,
                        hasPriceChange: true,
                        isPriceIncrease: newPriceNum > currentPrice,
                        suntikService: service as SuntikServiceProps,
                    });
                }
            } else {
                oc.push(item);
            }
        });

        return { priceChanges: pc, otherChanges: oc };
    }, [data, customerserviceMedanPediaData]);

    const priceIncreases = priceChanges.filter(i => i.isPriceIncrease);
    const priceDecreases = priceChanges.filter(i => !i.isPriceIncrease);

    const handleSync = async (id_layanan: string, newPrice: number) => {
        setSyncingId(id_layanan);
        try {
            await handleUpdatePriceSuntikFromNews(Number(id_layanan), newPrice);
        } finally {
            setSyncingId(null);
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview', count: null },
        { id: 'price', label: 'Perubahan Harga', count: priceChanges.length },
        { id: 'others', label: 'Lainnya', count: otherChanges.length },
    ];

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(88,28,135,0.35) 0%, rgba(0,0,0,0.85) 70%)',
                    opacity: visible ? 1 : 0,
                    backdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
                }}
                onClick={onClose}
            />

            <div
                className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
                style={{
                    background: 'linear-gradient(145deg, #0f0a1e 0%, #130d24 50%, #0a0a18 100%)',
                    border: '1px solid rgba(168,85,247,0.25)',
                    boxShadow: '0 0 0 1px rgba(168,85,247,0.1), 0 25px 80px rgba(0,0,0,0.8), 0 0 60px rgba(88,28,135,0.3)',
                    transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)',
                    opacity: visible ? 1 : 0,
                    transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

                <div className="relative z-10 flex items-start justify-between p-6 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                            <Zap className="w-5 h-5 text-white" />
                            <div className="absolute inset-0 rounded-xl animate-pulse opacity-50"
                                style={{ boxShadow: '0 0 20px rgba(124,58,237,0.8)' }} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tight">Laporan Perubahan Layanan</h2>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <PulsingDot color="bg-emerald-400" />
                                <span className="text-xs text-gray-400 font-medium">
                                    {priceChanges.length} perlu sinkronisasi · {otherChanges.length} perubahan lain
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/40 hover:border-gray-600/60 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="relative z-10 flex gap-1 px-6 pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className="relative px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5"
                            style={{
                                color: activeTab === tab.id ? '#fff' : '#6b7280',
                                background: activeTab === tab.id ? 'rgba(124,58,237,0.25)' : 'transparent',
                                border: activeTab === tab.id ? '1px solid rgba(124,58,237,0.4)' : '1px solid transparent',
                            }}
                        >
                            {tab.label}
                            {tab.count !== null && tab.count > 0 && (
                                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold"
                                    style={{
                                        background: activeTab === tab.id ? 'rgba(168,85,247,0.4)' : 'rgba(107,114,128,0.3)',
                                        color: activeTab === tab.id ? '#e9d5ff' : '#9ca3af',
                                    }}>
                                    {tab.count}
                                </span>
                            )}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-purple-500 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-6 pt-2 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700">

                    {activeTab === 'overview' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                                <StatCard label="Total Berita" value={data?.length ?? 0} icon={Layers} color="#a855f7" delay={0} animate={visible} />
                                <StatCard label="Harga Naik" value={priceIncreases.length} icon={TrendingUp} color="#f43f5e" delay={80} animate={visible} />
                                <StatCard label="Harga Turun" value={priceDecreases.length} icon={TrendingDown} color="#10b981" delay={160} animate={visible} />
                            </div>

                            <div className="rounded-xl border border-gray-700/40 overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-700/40 bg-gray-800/20">
                                    <p className="text-xs font-bold tracking-widest uppercase text-gray-400">Distribusi Perubahan</p>
                                </div>
                                {[
                                    { label: 'Harga Naik', value: priceIncreases.length, color: '#f43f5e', total: priceChanges.length + otherChanges.length },
                                    { label: 'Harga Turun', value: priceDecreases.length, color: '#10b981', total: priceChanges.length + otherChanges.length },
                                    { label: 'Perubahan Lain', value: otherChanges.length, color: '#06b6d4', total: priceChanges.length + otherChanges.length },
                                    { label: 'Tidak Relevan', value: (data?.length ?? 0) - priceChanges.length - otherChanges.length, color: '#f59e0b', total: data?.length ?? 1 },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-800/60 last:border-0 hover:bg-gray-800/20 transition-colors">
                                        <p className="text-sm text-gray-300 w-36 flex-shrink-0">{item.label}</p>
                                        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{
                                                    width: visible ? `${Math.max((item.value / Math.max(item.total, 1)) * 100, item.value > 0 ? 3 : 0)}%` : '0%',
                                                    background: item.color,
                                                    boxShadow: `0 0 8px ${item.color}80`,
                                                    transitionDelay: `${i * 120 + 300}ms`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm font-bold text-white w-8 text-right tabular-nums">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {priceChanges.length > 0 && (
                                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                        <RefreshCw className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-purple-300">
                                            {priceChanges.length} layanan perlu disesuaikan harganya
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Buka tab "Perubahan Harga" untuk melihat detail dan menyesuaikan satu per satu
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'price' && (
                        <div className="space-y-4">
                            {priceIncreases.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-rose-400" />
                                        <p className="text-sm font-bold text-rose-400 tracking-wide">Harga Naik ({priceIncreases.length})</p>
                                    </div>
                                    {priceIncreases.map((item, i) => (
                                        <PriceChangeRow
                                            key={`${item.id_layanan}-${item.tanggal}`}
                                            item={item}
                                            index={i}
                                            onSync={handleSync}
                                            syncing={syncingId === item.id_layanan}
                                        />
                                    ))}
                                </div>
                            )}
                            {priceDecreases.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <TrendingDown className="w-4 h-4 text-emerald-400" />
                                        <p className="text-sm font-bold text-emerald-400 tracking-wide">Harga Turun ({priceDecreases.length})</p>
                                    </div>
                                    {priceDecreases.map((item, i) => (
                                        <PriceChangeRow
                                            key={`${item.id_layanan}-${item.tanggal}`}
                                            item={item}
                                            index={i}
                                            onSync={handleSync}
                                            syncing={syncingId === item.id_layanan}
                                        />
                                    ))}
                                </div>
                            )}
                            {priceChanges.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 gap-3">
                                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <p className="text-sm font-semibold text-emerald-400">Semua harga sudah sinkron</p>
                                    <p className="text-xs text-gray-500 text-center">Tidak ada perubahan harga yang perlu disesuaikan</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'others' && (
                        <div className="space-y-2">
                            {otherChanges.length > 0 ? (
                                otherChanges.map((item, i) => (
                                    <OtherChangeRow key={`${item.id_layanan}-${item.tanggal}`} item={item} index={i} />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 gap-3">
                                    <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <p className="text-sm font-semibold text-cyan-400">Tidak ada perubahan lain</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="relative z-10 flex items-center justify-between px-6 py-4 border-t border-gray-800/60 bg-black/20">
                    <p className="text-xs text-gray-600 font-mono">
                        {data?.length ?? 0} total berita · {priceChanges.length + otherChanges.length} relevan
                    </p>
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                            boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                        }}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

const UserModal = ({ isOpen, onClose, user }: any) => {
    const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
    const { handleUpdateUserStatus } = useUserHook();

    useEffect(() => {
        if (user) {
            setIsAdmin(!!user.isAdmin);
        }
    }, [user]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 border border-gray-700/50 rounded-2xl w-full max-w-md shadow-2xl">
                <div className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Ubah Status Pengguna</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Admin Access</p>
                                <p className="text-xs text-gray-400">Berikan hak akses admin</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e: any) => setIsAdmin(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
                        </label>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button onClick={onClose} className="flex-1 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg transition-all">
                            Batal
                        </button>
                        <button
                            onClick={() => handleUpdateUserStatus(user.id, isAdmin)}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-500/20"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function UserManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(true);
    const { users } = useUserHook();
    const { adminNewsData } = useNewsHooks();

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditUser = (user: UserProps | any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <AdminDashboard>
            <div className="space-y-6" data-aos="fade-up" data-aos-duration="800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-purple-300">Total Users</p>
                            <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{users.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-blue-300">Total Admin</p>
                            <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{users.filter(u => u.isAdmin).length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-green-300">Total Saldo</p>
                            <Wallet className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-2xl font-bold text-white">
                            {FormatRupiah(users.reduce((sum, user) => sum + user.saldo, 0))}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari username..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setIsNewsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                            boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
                        }}
                    >
                        <Zap className="w-4 h-4" />
                        Lihat Laporan
                    </button>
                </div>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700/50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Username</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Saldo</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tanggal Dibuat</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                    {user.username.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{user.username}</p>
                                                    <p className="text-xs text-gray-400">ID: {user.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Wallet className="w-4 h-4 text-green-400" />
                                                <span className="text-sm font-semibold text-white">{FormatRupiah(user.saldo)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isAdmin ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                                                    <Shield className="w-3.5 h-3.5" />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-600/20 text-gray-300 rounded-full text-xs font-medium border border-gray-500/30">
                                                    <User className="w-3.5 h-3.5" />
                                                    User
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-300">{FormatDate(user.created_at)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="p-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">Tidak ada user ditemukan</p>
                        </div>
                    )}
                </div>
            </div>

            <AdminNewsModal
                isOpen={isNewsModalOpen}
                onClose={() => setIsNewsModalOpen(false)}
                data={adminNewsData as any}
            />

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
            />
        </AdminDashboard>
    );
}