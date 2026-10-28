<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add video_url to carousel_slides for users who already had the
        // original migration (2024_01_01_000003_create_carousel_slides_table)
        // run before video support was added.
        if (! Schema::hasColumn('carousel_slides', 'video_url')) {
            Schema::table('carousel_slides', function (Blueprint $table) {
                $table->string('video_url', 500)->nullable()->after('image_url');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('carousel_slides', 'video_url')) {
            Schema::table('carousel_slides', function (Blueprint $table) {
                $table->dropColumn('video_url');
            });
        }
    }
};
