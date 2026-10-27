<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $postId = $this->route('post')?->id;

        return [
            'title'        => ['sometimes', 'required', 'string', 'max:255'],
            'slug'         => ['sometimes', 'nullable', 'string', 'max:255', Rule::unique('posts', 'slug')->ignore($postId)],
            'excerpt'      => ['nullable', 'string', 'max:500'],
            'description'  => ['sometimes', 'required', 'string'],
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
