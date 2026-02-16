<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_suntiks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("service_id");
            $table->string('name')->nullable();
            $table->string('type')->nullable();
            $table->string('api_type')->nullable();
            $table->string('category')->nullable();
            $table->bigInteger('price')->nullable();
            $table->bigInteger('min')->nullable();
            $table->bigInteger('max')->nullable();
            $table->text('description')->nullable()->nullable();
            $table->bigInteger('refill')->default(0)->nullable();
            $table->string('average_time')->nullable()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_suntiks');
    }
};
