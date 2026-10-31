<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('carousel_slides', function (Blueprint $table) {
            // Optional video — if set, the slide plays a looping muted
            // background video on the homepage hero. The image_url is
            // then used as the poster (the still frame shown before the
            // video starts loading / while it buffers).
            $table->string('video_url', 500)->nullable()->after('image_url');
            $table->string('video_poster', 500)->nullable()->after('video_url');
            // 'image' or 'video' — lets the frontend decide render path.
            $table->string('media_type', 20)->default('image')->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('carousel_slides', function (Blueprint $table) {
            $table->dropColumn(['video_url', 'video_poster', 'media_type']);
        });
    }
};
