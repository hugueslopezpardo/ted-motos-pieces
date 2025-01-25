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
        Schema::create('delivery_service_rates', function (Blueprint $table) {
            $table->id();
            $table->integer('min_weight');
            $table->integer('max_weight');
            $table->float('rate');
            $table->foreignId('delivery_service_id')->constrained()->cascadeOnDelete();
            $table->foreignId('location_region_type_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_services');
    }
};
