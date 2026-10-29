<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarouselSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class CarouselController extends Controller
{
    /** Public: list active slides, ordered. */
    public function publicIndex()
    {
        return response()->json(
            CarouselSlide::active()->get()
        );
    }

    /** Admin: list all slides (incl. inactive). */
    public function index()
    {
        return response()->json(
            CarouselSlide::orderByDesc('is_active')->orderBy('sort_order')->paginate(20)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'         => ['required', 'string', 'max:200'],
            'subtitle'      => ['nullable', 'string', 'max:300'],
            'media_type'    => ['nullable', 'in:image,video'],
            'image_url'     => ['nullable', 'string', 'max:500'],   // image OR video poster
            'video_url'     => ['nullable', 'string', 'max:500'],   // .mp4 / .webm
            'video_poster'  => ['nullable', 'string', 'max:500'],
            'cta_text'      => ['nullable', 'string', 'max:60'],
            'cta_link'      => ['nullable', 'string', 'max:500'],
            'badge'         => ['nullable', 'string', 'max:60'],
            'category'      => ['nullable', 'string', 'max:100'],
            'is_active'     => ['boolean'],
            'sort_order'    => ['integer'],
        ]);
        // Default media_type based on whether a video URL was provided
        if (empty($data['media_type'])) {
            $data['media_type'] = !empty($data['video_url']) ? 'video' : 'image';
        }
        // For an image slide, image_url is required (so there's always something
        // to show). For a video slide, image_url is the poster (still required
        // so users see something before the video loads).
        if (empty($data['image_url']) && empty($data['video_poster'])) {
            return response()->json([
                'message' => 'Either image_url (poster) or video_poster is required so the slide shows something while loading.',
            ], 422);
        }
        $slide = CarouselSlide::create($data);
        Cache::forget('public.home');
        return response()->json(['message' => 'Slide created.', 'slide' => $slide], 201);
    }

    public function update(Request $request, CarouselSlide $slide)
    {
        $data = $request->validate([
            'title'         => ['sometimes', 'required', 'string', 'max:200'],
            'subtitle'      => ['nullable', 'string', 'max:300'],
            'media_type'    => ['nullable', 'in:image,video'],
            'image_url'     => ['nullable', 'string', 'max:500'],
            'video_url'     => ['nullable', 'string', 'max:500'],
            'video_poster'  => ['nullable', 'string', 'max:500'],
            'cta_text'      => ['nullable', 'string', 'max:60'],
            'cta_link'      => ['nullable', 'string', 'max:500'],
            'badge'         => ['nullable', 'string', 'max:60'],
            'category'      => ['nullable', 'string', 'max:100'],
            'is_active'     => ['boolean'],
            'sort_order'    => ['integer'],
        ]);
        // Auto-detect media_type if not explicitly set
        if (empty($data['media_type']) && array_key_exists('video_url', $data)) {
            $data['media_type'] = !empty($data['video_url']) ? 'video' : 'image';
        }
        $slide->update($data);
        Cache::forget('public.home');
        return response()->json(['message' => 'Slide updated.', 'slide' => $slide->fresh()]);
    }

    public function destroy(CarouselSlide $slide)
    {
        $slide->delete();
        Cache::forget('public.home');
        return response()->json(['message' => 'Slide deleted.']);
    }

    public function toggleActive(CarouselSlide $slide)
    {
        $slide->update(['is_active' => ! $slide->is_active]);
        Cache::forget('public.home');
        return response()->json(['message' => 'Toggled.', 'is_active' => $slide->is_active]);
    }
}
