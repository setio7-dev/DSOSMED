<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('popup_news', function (Blueprint $table) {
            $table->id();
            $table->dateTime('tanggal');
            $table->string('id_layanan')->nullable();
            $table->string('nama_layanan')->nullable();
            $table->text('keterangan')->nullable();
            $table->bigInteger('old_price')->nullable();
            $table->bigInteger('new_price')->nullable();
            $table->timestamps();

            $table->unique(['tanggal','id_layanan']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('popup_news');
    }
};
