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
        Schema::create('service_ada_otp_childrens', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("parent_id")->unsigned();
            $table->bigInteger("service_id")->nullable();
            $table->string('name')->nullable();
            $table->string('iso')->nullable();
            $table->string('prefix', 10)->nullable();
            $table->bigInteger('price')->nullable();
            $table->integer('stock')->nullable();
            $table->bigInteger('delivery_percent')->nullable();

            $table->string('operator')->nullable();
            $table->string('quality_score')->nullable();
            $table->string('provider_rate')->nullable();

            $table->string('current_demand_status')->nullable();
            $table->bigInteger('avg_delivery_time')->nullable();
            $table->string('avg_delivery_time_formatted')->nullable();
            $table->timestamps();

            $table->foreign("parent_id")->on("service_ada_otp_parents")->references("id")->onDelete("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_ada_otp_childrens');
    }
};
