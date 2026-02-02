import CustomerDashboard from '@/components/customer/customerDashboard';
import useDepositHooks from "@/hooks/iskapayHooks";
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Info,
    Wallet,
    XCircle,
} from 'lucide-react';

export default function Deposit() {
     const {
        amount,
        selectedAmount,
        loading,
        paymentData,
        quickAmounts,
        handleAmountChange,
        handleQuickAmount,
        handleDeposit,
        handleCancel,
    } = useDepositHooks();

    return (
        <div>
            <CustomerDashboard title="Deposit">
                <div className="h-full space-y-0">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-8 shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                                <Wallet className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    DEPOSIT
                                </h1>
                                <p className="text-purple-100">
                                    Isi saldo akun Anda dengan mudah dan cepat
                                </p>
                            </div>
                        </div>
                    </div>

                    {paymentData && (
                        <div className="border-b border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-purple-800/40 p-8">
                            <div className="mx-auto max-w-2xl">
                                <div className="mb-6 text-center">
                                    <h3 className="text-2xl font-bold text-purple-200">
                                        QR Code Pembayaran
                                    </h3>
                                    <p className="mt-2 text-purple-300">
                                        Scan QR code di bawah ini untuk
                                        melakukan pembayaran
                                    </p>
                                </div>

                                <div className="rounded-2xl border-2 border-purple-400/50 bg-white p-8 shadow-2xl">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="rounded-xl bg-white p-4 shadow-lg">
                                            <img
                                                src={paymentData.qr_code}
                                                alt="QR Code Pembayaran"
                                                className="h-64 w-64 object-contain"
                                            />
                                        </div>

                                        <div className="w-full space-y-3 rounded-xl bg-purple-50 p-6">
                                            <div className="flex justify-between border-b border-purple-200 pb-2">
                                                <span className="font-semibold text-gray-700">
                                                    Nominal:
                                                </span>
                                                <span className="text-xl font-bold text-purple-700">
                                                    Rp{' '}
                                                    {Number(
                                                        paymentData.amount,
                                                    )?.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="flex justify-between border-b border-purple-200 pb-2">
                                                <span className="font-semibold text-gray-700">
                                                    Status:
                                                </span>
                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-bold ${
                                                        paymentData.status ===
                                                        'paid'
                                                            ? 'bg-green-100 text-green-700'
                                                            : paymentData
                                                                    .time_remaining
                                                                    ?.is_expired
                                                              ? 'bg-red-100 text-red-700'
                                                              : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                                >
                                                    {paymentData.status}
                                                </span>
                                            </div>
                                            {paymentData.transaction_id && (
                                                <div className="flex justify-between">
                                                    <span className="font-semibold text-gray-700">
                                                        ID Transaksi:
                                                    </span>
                                                    <span className="font-mono text-sm text-gray-600">
                                                        {
                                                            paymentData.transaction_id
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full rounded-lg border border-yellow-400 bg-yellow-50 p-4">
                                            <div className="flex gap-3">
                                                <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-600" />
                                                <div className="text-sm text-yellow-800">
                                                    <p className="font-semibold">
                                                        Penting:
                                                    </p>
                                                    <p>
                                                        Pastikan transfer sesuai
                                                        dengan nominal yang
                                                        tertera. Saldo akan
                                                        masuk maksimal 5 menit
                                                        setelah pembayaran
                                                        berhasil.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="border-b border-blue-500/30 bg-blue-500/10 p-8">
                        <div className="flex gap-4">
                            <Info className="mt-1 h-6 w-6 flex-shrink-0 text-blue-400" />
                            <div className="flex-1 space-y-3">
                                <h3 className="text-xl font-bold text-blue-300">
                                    Cara Deposit:
                                </h3>
                                <ol className="space-y-3 text-gray-300">
                                    <li className="flex gap-3">
                                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-sm font-bold text-blue-400">
                                            1
                                        </span>
                                        <span className="pt-0.5">
                                            Pilih nominal atau masukkan jumlah
                                            sendiri (minimal Rp2.000). Anda
                                            dapat menggunakan tombol nominal
                                            cepat atau mengisi manual di kolom
                                            yang tersedia.
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-sm font-bold text-blue-400">
                                            2
                                        </span>
                                        <span className="pt-0.5">
                                            Klik tombol "Deposit Sekarang" untuk
                                            melanjutkan ke halaman pembayaran.
                                            Pastikan nominal yang dimasukkan
                                            sudah benar.
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-sm font-bold text-blue-400">
                                            3
                                        </span>
                                        <span className="pt-0.5">
                                            Jika ada transaksi deposit yang
                                            masih pending, harap batalkan
                                            terlebih dahulu sebelum membuat
                                            deposit baru. Sistem hanya
                                            mengizinkan satu deposit aktif per
                                            waktu.
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-sm font-bold text-blue-400">
                                            4
                                        </span>
                                        <span className="pt-0.5">
                                            Scan QR code yang muncul untuk
                                            melakukan transfer pembayaran.
                                            Status transaksi pending akan dicek
                                            secara otomatis oleh sistem. Saldo
                                            akan masuk maksimal 5 menit setelah
                                            pembayaran berhasil.
                                        </span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-yellow-500/30 bg-yellow-500/10 p-8">
                        <div className="flex gap-4">
                            <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-400" />
                            <div className="flex-1 space-y-3">
                                <h3 className="text-xl font-bold text-yellow-300">
                                    Informasi Penting:
                                </h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex gap-2">
                                        <span className="text-yellow-400">
                                            •
                                        </span>
                                        <span>
                                            Minimal deposit adalah Rp2.000 dan
                                            maksimal Rp10.000.000 per transaksi.
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-yellow-400">
                                            •
                                        </span>
                                        <span>
                                            Proses deposit akan otomatis
                                            terverifikasi setelah pembayaran
                                            diterima.
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-yellow-400">
                                            •
                                        </span>
                                        <span>
                                            Jangan lakukan pembayaran lebih dari
                                            satu kali untuk transaksi yang sama.
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-yellow-400">
                                            •
                                        </span>
                                        <span>
                                            Pastikan transfer sesuai dengan
                                            nominal yang tertera pada QR code.
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-yellow-400">
                                            •
                                        </span>
                                        <span>
                                            Hubungi customer service jika saldo
                                            tidak masuk dalam 15 menit.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-700 bg-gray-800/50 p-8">
                        <h3 className="mb-6 text-2xl font-bold text-gray-200">
                            Pilih Nominal Cepat
                        </h3>
                        <p className="mb-6 text-gray-400">
                            Klik salah satu nominal di bawah ini untuk mengisi
                            otomatis jumlah deposit yang Anda inginkan.
                        </p>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {quickAmounts.map((item) => (
                                <button
                                    key={item.value}
                                    onClick={() =>
                                        handleQuickAmount(item.value)
                                    }
                                    disabled={loading || !!paymentData}
                                    className={`rounded-xl px-6 py-4 text-lg font-bold transition-all duration-200 ${
                                        selectedAmount === item.value
                                            ? 'scale-95 bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-xl ring-2 shadow-purple-500/50 ring-purple-400'
                                            : 'border-2 border-gray-600 bg-gray-700/50 text-gray-300 hover:border-purple-500 hover:bg-gray-700'
                                    } disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800/50 p-8">
                        <h3 className="mb-6 text-2xl font-bold text-gray-200">
                            Atau Masukkan Jumlah Sendiri
                        </h3>
                        <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />
                                <div className="flex-1">
                                    <p className="font-semibold text-yellow-300">
                                        Ketentuan Input Manual:
                                    </p>
                                    <p className="mt-1 text-sm text-gray-400">
                                        Minimal Rp2.000 dan maksimal
                                        Rp10.000.000. Anda boleh menggunakan
                                        tanda titik (.) atau koma (,) sebagai
                                        pemisah ribuan. Tanda pemisah akan
                                        otomatis dihapus oleh sistem sebelum
                                        diproses.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="mb-3 block text-lg font-semibold text-gray-300">
                                    Jumlah Deposit
                                </label>
                                <div className="relative">
                                    <span className="absolute top-1/2 left-5 -translate-y-1/2 text-xl font-bold text-gray-400">
                                        Rp
                                    </span>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="0"
                                        disabled={loading || !!paymentData}
                                        className="w-full rounded-xl border-2 border-gray-600 bg-gray-900/70 py-5 pr-6 pl-16 text-xl font-semibold text-white placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                                {amount &&
                                    parseInt(amount.replace(/[.,]/g, '')) >=
                                        2000 && (
                                        <p className="mt-2 text-sm text-green-400">
                                            ✓ Jumlah deposit: Rp{' '}
                                            {parseInt(
                                                amount.replace(/[.,]/g, ''),
                                            ).toLocaleString('id-ID')}
                                        </p>
                                    )}
                                {amount &&
                                    parseInt(amount.replace(/[.,]/g, '')) <
                                        2000 && (
                                        <p className="mt-2 text-sm text-red-400">
                                            ✗ Minimal deposit Rp 2.000
                                        </p>
                                    )}
                            </div>

                            <div className="flex gap-4">
                                {!paymentData && (
                                    <button
                                        onClick={handleDeposit}
                                        disabled={loading}
                                        className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-5 text-xl font-bold text-white shadow-xl shadow-purple-500/40 transition-all duration-200 hover:from-purple-700 hover:to-purple-800 hover:shadow-2xl hover:shadow-purple-500/60 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {loading
                                            ? 'Memproses...'
                                            : 'Deposit Sekarang'}
                                    </button>
                                )}

                                {paymentData && (
                                    <button
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="flex-1 rounded-xl border-2 border-red-500 bg-red-500/10 px-8 py-5 text-xl font-bold text-red-400 transition-all duration-200 hover:bg-red-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {loading
                                            ? 'Membatalkan...'
                                            : 'Batalkan'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 bg-gray-900/50 p-8">
                        <h3 className="mb-6 text-xl font-bold text-gray-200">
                            Status Transaksi Deposit
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <Clock className="h-6 w-6 text-yellow-400" />
                                    <h4 className="font-bold text-yellow-300">
                                        Pending
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Menunggu pembayaran dari Anda. Segera
                                    lakukan transfer sesuai nominal yang
                                    tertera.
                                </p>
                            </div>
                            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <CheckCircle className="h-6 w-6 text-green-400" />
                                    <h4 className="font-bold text-green-300">
                                        Success
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Pembayaran berhasil diterima dan saldo sudah
                                    ditambahkan ke akun Anda.
                                </p>
                            </div>
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5">
                                <div className="mb-3 flex items-center gap-3">
                                    <XCircle className="h-6 w-6 text-red-400" />
                                    <h4 className="font-bold text-red-300">
                                        Failed/Cancelled
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Transaksi dibatalkan atau gagal. Silakan
                                    buat deposit baru jika diperlukan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomerDashboard>
        </div>
    );
}
