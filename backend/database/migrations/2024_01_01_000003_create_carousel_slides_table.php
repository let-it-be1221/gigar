<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('carousel_slides', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->string('subtitle', 300)->nullable();
            $table->string('image_url', 500);          // background image (still frame / poster)
            $table->string('video_url', 500)->nullable(); // optional background video (mp4)
            $table->string('cta_text', 60)->nullable();
            $table->string('cta_link', 500)->nullable();
            $table->string('badge', 60)->nullable();
            $table->string('category', 100)->nullable();  // e.g. Elevators, Lifts, Paint Booths, Vehicle Test, Facility
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->index(['is_active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carousel_slides');
    }
};
