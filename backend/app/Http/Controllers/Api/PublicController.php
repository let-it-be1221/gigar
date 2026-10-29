<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class PublicController extends Controller
{
    /**
     * Combined home-page payload — replaces the 4 parallel calls the home
     * page used to make (services, products, featuredPosts, customerStats).
     * One HTTP round-trip instead of four. Cached for 5 minutes.
     */
    public function home()
    {
        $data = Cache::remember('public.home', 300, function () {
            return [
                'services'           => $this->servicesArray(),
                'products'           => $this->productsArray(),
                'featured_posts'     => Post::published()
                    ->where('is_featured', true)
                    ->latest('published_at')
                    ->limit(6)
                    ->get(['id','title','slug','excerpt','media_type','media_url','media_poster','category','tags','is_featured','published_at','created_at']),
                'carousel'           => \App\Models\CarouselSlide::active()->get(),
                'customer_stats'     => $this->customerStatsArray(),
                'featured_customers' => Customer::active()->where('is_featured', true)->limit(8)->get(),
            ];
        });

        return response()->json($data);
    }

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
     * Static list of service lines offered by Gigar Trading.
     * Organized into the three service lines the company sells:
     *   1. Supplying & Installing Equipments
     *   2. Maintenance Service
     *   3. Technical Consultancy
     */
    public function services()
    {
        return response()->json(['services' => $this->servicesArray()]);
    }

    /**
     * Static list of service lines — also used by /home. Cached 5 min.
     */
    protected function servicesArray()
    {
        return Cache::remember('public.services', 300, function () {
            return [
                [
                    'id'          => 'supplying-and-installing',
                    'icon'        => 'toolbox',
                    'line'        => 'Supplying & Installing Equipments',
                    'title'       => 'Equipment Supply & Installation',
                    'tagline'     => 'Importing & commissioning world-class equipment',
                    'description' => 'Gigar Trading imports and professionally installs a complete portfolio of industrial equipment — BendPak car lifts, building elevators & escalators, OMIA paint booths, VTEQ vehicle test lanes, Fujitsu air conditioners and LGS duty washing machines. Every project includes site survey, supply, installation, commissioning and operator training.',
                    'highlights'  => [
                        'Authorized distributor of BendPak, Fujitsu, OMIA, VTEQ and Electrolux',
                        'Full turnkey installation by certified technicians',
                        '5-year structural warranty on major equipment',
                        'Operator training included with every install',
                    ],
                ],
                [
                    'id'          => 'maintenance-service',
                    'icon'        => 'wrench',
                    'line'        => 'Maintenance Service',
                    'title'       => 'Preventive & Emergency Maintenance',
                    'tagline'     => 'Keeping your equipment productive for decades',
                    'description' => 'Annual maintenance contracts (AMC) and 24/7 emergency call-out support for every installation. Our certified technicians perform scheduled preventive maintenance, safety inspections, parts replacement and breakdown repairs — minimizing downtime and extending equipment lifespan.',
                    'highlights'  => [
                        'Annual Maintenance Contracts (AMC) with fixed response times',
                        '24/7 emergency breakdown call-out across Addis Ababa',
                        'Genuine OEM spare parts inventory',
                        'Safety inspection & certification reports',
                    ],
                ],
                [
                    'id'          => 'technical-consultancy',
                    'icon'        => 'compass',
                    'line'        => 'Technical Consultancy',
                    'title'       => 'Workshop & Facility Design Consultancy',
                    'tagline'     => 'Engineering the right solution from day one',
                    'description' => 'Our engineers help you plan, design and optimize your workshop or facility before you buy. We provide load calculations, equipment sizing, layout design, capacity planning and project cost analysis — ensuring you invest in the right equipment the first time.',
                    'highlights'  => [
                        'Workshop layout & equipment sizing consultancy',
                        'Elevator load & traffic analysis for buildings',
                        'Project cost estimation & ROI analysis',
                        'Compliance review with Ethiopian regulations',
                    ],
                ],
            ];
        });
    }

    /**
     * Product catalog — the equipment categories Gigar Trading supplies.
     * Each product can also be added/removed by the admin as a blog post
     * tagged with the matching category.
     *
     * The 5 categories highlighted in the Services sidebar each carry
     * a `long_description` (shown on the Services page right panel) and a
     * `cover_image` URL. Client count + units installed are joined in
     * from the customers table by the /public/customers/stats endpoint
     * on the frontend.
     */
    public function products()
    {
        return response()->json(['products' => $this->productsArray()]);
    }

    /**
     * Product catalog array — also used by /home. Cached 5 min.
     */
    protected function productsArray()
    {
        return Cache::remember('public.products', 300, function () {
            return [
                [
                    'id'               => 'building-elevators',
                    'icon'             => 'elevator',
                    'title'            => 'Building Elevators',
                    'tagline'          => 'Traction, hydraulic & MRL elevator systems',
                    'description'      => 'Traction elevators for mid/high-rise buildings, hydraulic elevators for low-rise installations, and machine-room-less (MRL) elevators for modern commercial buildings. All systems include steel ropes, counterweights, regenerative drives and emergency backup.',
                    'long_description' => 'Gigar Trading is renowned for importing high-quality building elevators and equipping them with professional installation teams. We have successfully installed elevators for government agencies and private commercial buildings across Ethiopia, with full traffic analysis, load calculations and 24/7 emergency call-out support. Every installation is backed by a multi-year Annual Maintenance Contract and genuine OEM spare parts inventory.',
                    'cover_image'      => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop',
                    'features'         => ['Traction (6+ floors)', 'Hydraulic (2-5 floors)', 'MRL systems', '24/7 emergency support'],
                ],
                [
                    'id'               => 'building-lifts',
                    'icon'             => 'lift',
                    'title'            => 'Building Lifts',
                    'tagline'          => 'Vertical mobility for any staircase',
                    'description'      => 'Stair lifts for elderly and mobility-impaired residents, curved and straight rail systems with custom 3D-measured rails. Includes seatbelts, obstruction sensors, swivel seats, battery backup and remote control call-and-send operation.',
                    'long_description' => 'Gigar Trading supplies and installs stair lifts for residential and commercial buildings, restoring independent mobility for elderly and mobility-impaired residents. Every rail is custom 3D-measured to follow the exact geometry of your staircase — straight or curved, single-flight or multi-landing. Our team handles installation in a single day with no structural modifications, and every unit includes battery backup for power cuts, obstruction sensors, swivel seats and remote call-and-send operation.',
                    'cover_image'      => 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop',
                    'features'         => ['Straight-rail stair lifts', 'Curved-rail stair lifts', 'Battery backup', 'Same-day installation'],
                ],
                [
                    'id'               => 'paint-booths',
                    'icon'             => 'spray',
                    'title'            => 'Paint Booths',
                    'tagline'          => 'Dust-free, temperature-controlled spray booths',
                    'description'      => 'OMIA vehicle paint booths with advanced downdraft ventilation, precise temperature control (20-25°C) and humidity management for professional paint finishes. Full installation includes foundation, electrical, exhaust ducting and air-balance certification.',
                    'long_description' => 'Gigar Trading supplies and installs OMIA paint booths for professional vehicle paint shops. Each booth features advanced downdraft ventilation that removes overspray and dust, precise temperature control (20-25°C) for optimal paint flow, and humidity management to eliminate defects. We handle the full installation — foundation preparation, electrical connections, exhaust ducting and final air-balance certification — so your booth is ready for production on day one. Every installation includes operator training and a preventive maintenance contract.',
                    'cover_image'      => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
                    'features'         => ['Downdraft ventilation', 'Temperature control 20-25°C', 'Humidity management', 'Air-balance certification'],
                ],
                [
                    'id'               => 'facility-equipment',
                    'icon'             => 'ac',
                    'title'            => 'Facility Equipments',
                    'tagline'          => 'Air conditioning, washing machines & power systems',
                    'description'      => 'Fujitsu split, cassette and VRF air-conditioning systems, LGS duty washing machines for hotels/hospitals/laundromats, and complete facility equipment supply. Low water and energy consumption, with full preventive-maintenance contracts.',
                    'long_description' => 'Gigar Trading equips hotels, hospitals, laundromats and office towers with the full spectrum of facility equipment — Fujitsu VRF and split air-conditioning systems, LGS heavy-duty industrial washing machines, backup generators and material-handling equipment. We design each installation around the customer\'s daily volume and energy budget, and back it with one annual maintenance contract that covers all equipment — simplified operations, lower total cost of ownership, and a single call-out number for everything.',
                    'cover_image'      => 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80&auto=format&fit=crop',
                    'features'         => ['Fujitsu VRF systems', 'Industrial washing machines', 'Energy efficient', 'Full AMC available'],
                ],
                [
                    'id'               => 'vehicle-test-equipment',
                    'icon'             => 'gauge',
                    'title'            => 'Vehicle Test Equipments',
                    'tagline'          => 'Brake, suspension, side-slip & headlight testing',
                    'description'      => 'VTEQ vehicle test lanes for inspection centers — brake testers (per-wheel force + imbalance), suspension testers, side-slip plates and headlight aligners. Complete installation includes mechanical, electrical, software commissioning and operator training.',
                    'long_description' => 'Gigar Trading supplies and installs complete VTEQ vehicle test lanes for government and private inspection centers. Each lane includes four core measurement stations — brake testers (per-wheel force and imbalance), suspension testers, side-slip plates and headlight aligners — integrated through a unified software platform. Our engineers handle the full installation: mechanical foundations, electrical connections, software commissioning and operator training. The result is a test lane that delivers international-standard measurement accuracy under continuous daily use, with annual recertification support.',
                    'cover_image'      => 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=80&auto=format&fit=crop',
                    'features'         => ['Brake tester', 'Suspension tester', 'Side-slip plate', 'Headlight aligner'],
                ],
                [
                    'id'          => 'car-lifts',
                    'icon'        => 'lift',
                    'title'       => 'BendPak Car Lifts',
                    'tagline'     => 'Premium two-post & four-post vehicle lifts',
                    'description' => 'Authorized distributor of BendPak vehicle lifts — heavy-duty steel construction rated up to 7,000 kg, dual-direct drive technology, automatic arm restraints and slack-cable safety systems. ASE-certified lift columns engineered for decades of daily use.',
                    'features'    => ['Two-post lifts', 'Four-post lifts', '7,000 kg capacity', '5-year structural warranty'],
                ],
                [
                    'id'          => 'gps-speed-limit',
                    'icon'        => 'speed',
                    'title'       => 'GPS & Speed Limit Devices',
                    'tagline'     => 'Fleet speed-limiting & GPS tracking',
                    'description' => 'GPS-based speed-limiting devices certified by the Ethiopian Ministry of Transport. Real-time satellite positioning, context-aware speed control, live GPS tracking with route replay and driver-behavior scoring.',
                    'features'    => ['GPS speed-limiting', 'Live tracking', 'Driver scoring', 'Compliance certified'],
                ],
                [
                    'id'          => 'heavy-equipment',
                    'icon'        => 'truck',
                    'title'       => 'Heavy Equipment',
                    'tagline'     => 'Construction & industrial machinery',
                    'description' => 'Import and distribution of heavy machinery — excavators, loaders, generators and material-handling equipment with full after-sales support. Includes operator training and genuine spare parts inventory.',
                    'features'    => ['Excavators', 'Loaders', 'Generators', 'Material handling'],
                ],
            ];
        });
    }

    /**
     * Per-category customer stats (clients count + units installed).
     * Used by /home + the /public/customers/stats endpoint.
     */
    protected function customerStatsArray()
    {
        return Cache::remember('public.customer_stats', 300, function () {
            $rows = Customer::active()
                ->whereNotNull('equipment_category')
                ->selectRaw('equipment_category, COUNT(*) as clients, SUM(units_installed) as units')
                ->groupBy('equipment_category')
                ->get();

            return $rows->mapWithKeys(fn ($r) => [
                $r->equipment_category => [
                    'clients' => (int) $r->clients,
                    'units'   => (int) $r->units,
                ],
            ])->toArray();
        });
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

    /**
     * Newsletter signup — logs the email so the admin can manually add it
     * to their mailing list. (No DB table for now — keeps the schema simple.
     * The admin can grep storage/logs/laravel.log for 'Newsletter signup'
     * entries, or wire this up to Mailchimp / a subscribers table later.)
     */
    public function newsletter(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:200'],
        ]);

        logger()->info('Newsletter signup', ['email' => $data['email']]);

        try {
            Mail::raw(
                "New newsletter signup: {$data['email']}",
                function ($m) use ($data) {
                    $m->to('info@gigartrading.com')
                        ->subject('New newsletter subscriber')
                        ->replyTo($data['email']);
                }
            );
        } catch (\Throwable $e) {
            // ignore mail errors in dev
        }

        return response()->json(['message' => 'Thanks for subscribing! Watch your inbox for updates.']);
    }
}
