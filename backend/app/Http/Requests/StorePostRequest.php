<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'        => ['required', 'string', 'max:255'],
            'slug'         => ['nullable', 'string', 'max:255', 'unique:posts,slug'],
            'excerpt'      => ['nullable', 'string', 'max:500'],
            'description'  => ['required', 'string'],
            'media_type'   => ['nullable', 'in:image,video,youtube,none'],
            'media_url'    => ['nullable', 'string', 'max:500'],
            'media_poster' => ['nullable', 'string', 'max:500'],
            'category'     => ['nullable', 'string', 'max:120'],
            'tags'         => ['nullable', 'array'],
            'tags.*'       => ['string', 'max:60'],
            'is_featured'  => ['boolean'],
            'status'       => ['nullable', 'in:draft,published,archived'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
