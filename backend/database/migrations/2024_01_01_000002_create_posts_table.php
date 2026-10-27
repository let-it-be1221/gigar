<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('excerpt', 500)->nullable();
            $table->longText('description');
            $table->enum('media_type', ['image', 'video', 'youtube', 'none'])->default('none');
            $table->string('media_url', 500)->nullable();
            $table->string('media_poster', 500)->nullable();
            $table->string('category', 120)->nullable();
            $table->json('tags')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'published_at']);
            $table->index('slug');
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
