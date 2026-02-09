<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
    }
}
