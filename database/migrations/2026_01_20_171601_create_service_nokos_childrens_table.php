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
        Schema::create('service_nokos_childrens', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('nokos_parent_id')->unsigned();
            $table->string('country');
            $table->string('stock');
            $table->string('price');
            $table->timestamps();

            $table->foreign('nokos_parent_id')->references('id')->on('service_nokos_parents')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_nokos_childrens');
    }
};
