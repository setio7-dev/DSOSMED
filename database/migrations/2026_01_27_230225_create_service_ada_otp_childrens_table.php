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
            $table->bigInteger("service_id");
            $table->string('name');
            $table->string('iso');
            $table->string('prefix', 10);
            $table->bigInteger('price');
            $table->integer('stock');
            $table->bigInteger('delivery_percent');

            $table->string('operator');
            $table->string('quality_score');
            $table->string('provider_rate');

            $table->string('current_demand_status');
            $table->bigInteger('avg_delivery_time');
            $table->string('avg_delivery_time_formatted');
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
