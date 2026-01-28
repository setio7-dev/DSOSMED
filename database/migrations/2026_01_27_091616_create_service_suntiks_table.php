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
            $table->string('name');
            $table->string('type');
            $table->string('category');
            $table->bigInteger('price');
            $table->bigInteger('min');
            $table->bigInteger('max');
            $table->text('description')->nullable();
            $table->bigInteger('refill')->default(0);
            $table->string('average_time')->nullable();
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
