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
        Schema::create('motorcycle_parts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->decimal('weight', 10, 2);
            $table->json('images');
            $table->boolean('is_active')->default(false);
            $table->boolean('is_sold_out')->default(false);
            $table->boolean('is_heavy')->default(false);
            $table->foreignId('motorcycle_id')->constrained();
            $table->foreignId('motorcycle_part_type_id')->constrained();
            $table->foreignId('motorcycle_part_quality_id')->constrained();
            $table->foreignId('delivery_service_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motorcycle_parts');
    }
};
