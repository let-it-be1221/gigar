<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'excerpt',
        'description',
        'media_type',
        'media_url',
        'media_poster',
        'category',
        'tags',
        'is_featured',
        'published_at',
        'status',
    ];

    protected $casts = [
        'tags'         => 'array',
        'is_featured'  => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Auto-generate slug from title when not provided.
     */
    protected static function booted(): void
    {
        static::creating(function (Post $post) {
            $post->slug ??= Str::slug($post->title) . '-' . Str::random(6);
            $post->published_at ??= now();
        });

        static::updating(function (Post $post) {
            if ($post->isDirty('title') && ! $post->isDirty('slug')) {
                $post->slug = Str::slug($post->title) . '-' . Str::random(6);
            }
        });
    }

    /**
     * Scope: only published posts visible to guests.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->where('published_at', '<=', now());
    }

    /**
     * Accessor: full media URL (stored media path -> public URL).
     */
    public function getMediaFullUrlAttribute(): ?string
    {
        if (! $this->media_url) {
            return null;
        }

        // Already a full URL (external link, e.g. YouTube embed)
        if (filter_var($this->media_url, FILTER_VALIDATE_URL)) {
            return $this->media_url;
        }

        return asset('storage/' . ltrim($this->media_url, '/'));
    }

    public function getMediaPosterFullUrlAttribute(): ?string
    {
        if (! $this->media_poster) {
            return null;
        }

        if (filter_var($this->media_poster, FILTER_VALIDATE_URL)) {
            return $this->media_poster;
        }

        return asset('storage/' . ltrim($this->media_poster, '/'));
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
