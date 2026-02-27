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
        Schema::create('nokos_countries', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("nokos_service_id")->unsigned();
            $table->string("type");
            $table->bigInteger("provider_country_id")->nullable();
            $table->bigInteger("provider_service_id")->nullable();
            $table->text("country_name")->nullable();
            $table->text("iso")->nullable();
            $table->text("prefix")->nullable();
            $table->text("operator")->nullable();
            $table->bigInteger("price");
            $table->text("stock")->nullable();
            $table->text("quality_score")->nullable();

            $table->foreign("nokos_service_id")->references("id")->on("nokos_services")->onDelete("CASCADE");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nokos_countries');
    }
};
