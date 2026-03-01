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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('service_id')->nullable();
            $table->bigInteger('user_id')->unsigned();
            $table->string("type");
            $table->bigInteger("order_id")->nullable();
            $table->string("price");
            $table->string("quantity")->nullable();
            $table->string("status");
            $table->string("target")->nullable();
            $table->string("result")->nullable();
            $table->string("api_type")->nullable();
            $table->string("refill_id")->nullable();
            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
