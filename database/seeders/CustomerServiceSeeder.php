<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CustomerService;

class CustomerServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CustomerService::insert([
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
    }
}
