<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('slug')->unique();
            $table->string('logo_url', 500)->nullable();      // customer logo
            $table->string('cover_image', 500)->nullable();   // a project / building photo
            $table->string('sector', 100)->nullable();        // e.g. Hotel, Hospital, Workshop, Government
            $table->string('location', 120)->nullable();      // e.g. Addis Ababa
            $table->string('project_name', 200)->nullable();
            $table->year('year')->nullable();
            $table->string('equipment_category', 100)->nullable();  // matches a product id (e.g. building-elevators, car-lifts)
            $table->integer('units_installed')->default(1);
            $table->string('testimonial_author', 120)->nullable();
            $table->text('testimonial')->nullable();
            $table->longText('description')->nullable();     // longer story / case study
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->index(['is_active', 'sort_order']);
            $table->index('equipment_category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
