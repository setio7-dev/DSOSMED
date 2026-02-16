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
        Schema::create('service_jasa_otp_childrens', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('parent_id')->unsigned();
            $table->string('code');
            $table->bigInteger('price');
            $table->string('service');
            $table->string('operator');
            $table->bigInteger('stock');
            $table->timestamps();

            $table->foreign("parent_id")->on("service_jasa_otp_parents")->references("id")->onDelete("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_jasa_otp_childrens');
    }
};
