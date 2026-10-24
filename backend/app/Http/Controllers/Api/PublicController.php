<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PublicController extends Controller
{
    /**
     * Paginated list of published blog posts (guest view).
     */
    public function index(Request $request)
    {
        $query = Post::published()
            ->latest('published_at')
            ->select([
                'id', 'title', 'slug', 'excerpt', 'media_type',
                'media_url', 'media_poster', 'category', 'tags',
                'is_featured', 'published_at', 'created_at',
            ]);

        if ($category = $request->get('category')) {
            $query->where('category', $category);
        }

        if ($search = $request->get('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return response()->json($query->paginate($request->get('per_page', 9)));
    }

    /**
     * Single published post by slug.
     */
    public function show(string $slug)
    {
        $post = Post::published()->where('slug', $slug)->firstOrFail();

        $related = Post::published()
            ->where('id', '!=', $post->id)
            ->when($post->category, fn ($q) => $q->where('category', $post->category))
            ->latest('published_at')
            ->limit(3)
            ->get(['id', 'title', 'slug', 'excerpt', 'media_url', 'media_poster', 'published_at']);

        return response()->json([
            'post'    => $post,
            'related' => $related,
        ]);
    }

    /**
     * Featured posts for the homepage hero / spotlight.
     */
    public function featured()
    {
        $posts = Post::published()
            ->where('is_featured', true)
            ->latest('published_at')
            ->limit(6)
            ->get();

        return response()->json($posts);
    }

    public function stats()
    {
        return response()->json([
            'posts_total' => Post::published()->count(),
            'featured'   => Post::published()->where('is_featured', true)->count(),
            'categories'  => Post::published()
                ->whereNotNull('category')
                ->distinct()
                ->pluck('category')
                ->values(),
        ]);
    }

    /**
     * Static list of services offered by Gigar Trading, mirrored
     * from the live reference site gigartrading.com.
     */
    public function services()
    {
        $services = [
            [
                'id'      => 'gps-speed-limit',
                'icon'    => 'speed',
                'title'   => 'GPS & Speed Limit Devices',
                'tagline' => 'Vehicle speed monitoring & compliance',
                'description' => 'Installation and certification of GPS-based speed-limiting devices for fleet and commercial vehicles, fully compliant with Ethiopian transport regulations.',
            ],
            [
                'id'      => 'car-lifts',
                'icon'    => 'lift',
                'title'   => 'Car Lifts (BendPak)',
                'tagline' => 'Premium BendPak two-post & four-post lifts',
                'description' => 'Authorized distributor of BendPak vehicle lifts — built for workshops, garages and industrial use with industry-leading safety ratings.',
            ],
            [
                'id'      => 'garage-equipment',
                'icon'    => 'garage',
                'title'   => 'Build Your Garage With Us',
                'tagline' => 'Complete garage setup & fit-out',
                'description' => 'Full garage fit-outs: lifts, tool benches, compressed-air systems, and storage — designed, supplied and installed by certified technicians.',
            ],
            [
                'id'      => 'elevators-escalators',
                'icon'    => 'elevator',
                'title'   => 'Lifts, Escalators & Stair Lifts',
                'tagline' => 'Vertical transport solutions',
                'description' => 'Supply, installation and maintenance of building elevators, escalators and stair lifts for residential and commercial properties.',
            ],
            [
                'id'      => 'washing-machines',
                'icon'    => 'washer',
                'title'   => 'LGS Duty Washing Machines',
                'tagline' => 'Industrial laundry equipment',
                'description' => 'Heavy-duty washing machines engineered for laundromats, hotels and hospitals — low water and energy consumption.',
            ],
            [
                'id'      => 'heavy-equipment',
                'icon'    => 'truck',
                'title'   => 'Heavy Equipment',
                'tagline' => 'Construction & industrial machinery',
                'description' => 'Import and distribution of heavy machinery — excavators, loaders, generators and material-handling equipment with after-sales support.',
            ],
            [
                'id'      => 'paint-booths',
                'icon'    => 'spray',
                'title'   => 'OMIA Paint Booths',
                'tagline' => 'Professional spray-paint booths',
                'description' => 'OMIA vehicle paint booths with advanced ventilation and temperature control for dust-free, professional finishes.',
            ],
            [
                'id'      => 'vehicle-test',
                'icon'    => 'gauge',
                'title'   => 'VTEQ Vehicle Test Equipment',
                'tagline' => 'Diagnostic & inspection systems',
                'description' => 'VTEQ vehicle test lanes — brake, suspension, side-slip and headlight alignment for inspection centers.',
            ],
            [
                'id'      => 'air-conditioners',
                'icon'    => 'ac',
                'title'   => 'Fujitsu Air Conditioners',
                'tagline' => 'Cooling solutions for any space',
                'description' => 'Fujitsu split, cassette and VRF air-conditioning systems for offices, homes and industrial facilities.',
            ],
        ];

        return response()->json(['services' => $services]);
    }

    /**
     * Contact form — stores message and emails the team.
     */
    public function contact(Request $request)
    {
        $data = $request->validate([
            'name'    => ['required', 'string', 'max:120'],
            'email'   => ['required', 'email'],
            'phone'   => ['nullable', 'string', 'max:30'],
            'subject' => ['nullable', 'string', 'max:200'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        // Log the contact message (so it persists even if mail is not configured)
        logger()->info('Contact form submission', $data);

        // Try to send mail (silently no-op if mail driver is `log`)
        try {
            Mail::raw(
                "New contact message from {$data['name']} ({$data['email']})\n\n"
                . "Phone: " . ($data['phone'] ?? 'n/a') . "\n"
                . "Subject: " . ($data['subject'] ?? 'n/a') . "\n\n"
                . $data['message'],
                function ($m) use ($data) {
                    $m->to('info@gigartrading.com')
                        ->subject('New website enquiry: ' . ($data['subject'] ?? 'Contact'))
                        ->replyTo($data['email'], $data['name']);
                }
            );
        } catch (\Throwable $e) {
            // ignore mail errors in dev
        }

        return response()->json(['message' => 'Thank you for contacting us. We will reply within 24 hours.']);
    }
}
