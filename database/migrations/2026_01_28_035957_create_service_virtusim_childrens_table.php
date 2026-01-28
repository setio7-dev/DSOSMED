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
        Schema::create('service_virtusim_childrens', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("parent_id")->unsigned();
            $table->bigInteger("service_id");

            $table->string('name');
            $table->string('price');

            $table->boolean('is_promo');
            $table->boolean('status');
            $table->string('tersedia');

            $table->string('country');
            $table->string('category');
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('service_virtusim_parents')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_virtusim_childrens');
    }
};
