<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarouselSlide;
use Illuminate\Http\Request;
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
            'title'       => ['required', 'string', 'max:200'],
            'subtitle'    => ['nullable', 'string', 'max:300'],
            'image_url'   => ['required', 'string', 'max:500'],
            'cta_text'    => ['nullable', 'string', 'max:60'],
            'cta_link'    => ['nullable', 'string', 'max:500'],
            'badge'       => ['nullable', 'string', 'max:60'],
            'category'    => ['nullable', 'string', 'max:100'],
            'is_active'   => ['boolean'],
            'sort_order'  => ['integer'],
        ]);
        $slide = CarouselSlide::create($data);
        return response()->json(['message' => 'Slide created.', 'slide' => $slide], 201);
    }

    public function update(Request $request, CarouselSlide $slide)
    {
        $data = $request->validate([
            'title'       => ['sometimes', 'required', 'string', 'max:200'],
            'subtitle'    => ['nullable', 'string', 'max:300'],
            'image_url'   => ['sometimes', 'required', 'string', 'max:500'],
            'cta_text'    => ['nullable', 'string', 'max:60'],
            'cta_link'    => ['nullable', 'string', 'max:500'],
            'badge'       => ['nullable', 'string', 'max:60'],
            'category'    => ['nullable', 'string', 'max:100'],
            'is_active'   => ['boolean'],
            'sort_order'  => ['integer'],
        ]);
        $slide->update($data);
        return response()->json(['message' => 'Slide updated.', 'slide' => $slide->fresh()]);
    }

    public function destroy(CarouselSlide $slide)
    {
        $slide->delete();
        return response()->json(['message' => 'Slide deleted.']);
    }

    public function toggleActive(CarouselSlide $slide)
    {
        $slide->update(['is_active' => ! $slide->is_active]);
        return response()->json(['message' => 'Toggled.', 'is_active' => $slide->is_active]);
    }
}
