<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'logo_url',
        'cover_image',
        'sector',
        'location',
        'project_name',
        'year',
        'equipment_category',
        'units_installed',
        'testimonial_author',
        'testimonial',
        'description',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'year'           => 'integer',
        'units_installed' => 'integer',
        'is_featured'    => 'boolean',
        'is_active'      => 'boolean',
        'sort_order'     => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (Customer $c) {
            $c->slug ??= Str::slug($c->name) . '-' . Str::random(6);
        });
    }

    public function scopeActive($q)
    {
        return $q->where('is_active', true)->orderBy('sort_order')->orderByDesc('created_at');
    }
}
