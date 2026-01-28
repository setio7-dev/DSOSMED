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
        Schema::create('service_ada_otp_parents', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("parent_service_id");
            $table->text("text");
            $table->text("description")->nullable();
            $table->text("icon");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_ada_otp_parents');
    }
};
