<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\CustomerService::insert([
            [
                "name"  => "Customer Service",
                "desc"  => "1. Melayani pertanyaan umum terkait layanan\n"
                    . "2. Membantu proses pendaftaran dan verifikasi akun\n"
                    . "3. Menangani kendala login dan keamanan akun\n"
                    . "4. Membantu masalah transaksi dan pembayaran\n"
                    . "5. Menangani laporan gagal transaksi\n"
                    . "6. Memberikan panduan penggunaan aplikasi\n"
                    . "7. Menjawab pertanyaan terkait promo dan fitur\n"
                    . "8. Menangani keluhan dan masukan dari pengguna",
                "phone" => "+6283800106050"
            ]
        ]);

        \App\Models\Guide::insert([
            [
                'name' => 'Panduan Order Nokos',
                'desc' => "1. Pilih layanan nokos sesuai kebutuhan,\n2. Pastikan saldo mencukupi,\n3. Klik tombol order dan tunggu nomor muncul",
                'type' => 'nokos',
            ],
            [
                'name' => 'Panduan Proses Suntik',
                'desc' => "1. Pastikan username atau link target sudah benar,\n2. Proses suntik akan berjalan otomatis setelah order berhasil,\n3. Pantau status order di menu riwayat",
                'type' => 'suntik',
            ],
        ]);

        \App\Models\User::insert([
            [
                "username" => "admin",
                "password" => Hash::make("admin123"),
                "isAdmin" => true,
                "saldo" => 0,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "username" => "user",
                "password" => Hash::make("user123"),
                "isAdmin" => false,
                "saldo" => 0,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
        ]);
    }
}
