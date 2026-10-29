<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    /** Public: paginated list of active customers, with optional sector filter. */
    public function publicIndex(Request $request)
    {
        $q = Customer::active();

        if ($sector = $request->get('sector')) {
            $q->where('sector', $sector);
        }

        if ($cat = $request->get('category')) {
            $q->where('equipment_category', $cat);
        }

        return response()->json($q->paginate($request->get('per_page', 12)));
    }

    /** Public: featured customers for homepage. Cached 5 min. */
    public function featured()
    {
        $customers = Cache::remember('public.customers_featured', 300, function () {
            return Customer::active()
                ->where('is_featured', true)
                ->limit(8)
                ->get();
        });
        return response()->json($customers);
    }

    /** Public: distinct sectors for filter dropdown. Cached 5 min. */
    public function sectors()
    {
        $sectors = Cache::remember('public.customer_sectors', 300, function () {
            return Customer::active()
                ->whereNotNull('sector')
                ->distinct()
                ->pluck('sector')
                ->values()
                ->all();
        });
        return response()->json(['sectors' => $sectors]);
    }

    /** Public: customer counts grouped by equipment_category + total units
     *  installed. Cached 5 min via the public.customer_stats key (same cache
     *  the home endpoint uses).
     */
    public function stats()
    {
        $stats = Cache::remember('public.customer_stats', 300, function () {
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

        return response()->json(['stats' => $stats]);
    }

    /** Public: single customer by slug. */
    public function show(string $slug)
    {
        $customer = Customer::active()->where('slug', $slug)->firstOrFail();
        return response()->json($customer);
    }

    /* ----- Admin ----- */

    public function index(Request $request)
    {
        return response()->json(Customer::latest()->paginate(20));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'               => ['required', 'string', 'max:150'],
            'slug'               => ['nullable', 'string', 'unique:customers,slug'],
            'logo_url'           => ['nullable', 'string', 'max:500'],
            'cover_image'        => ['nullable', 'string', 'max:500'],
            'sector'             => ['nullable', 'string', 'max:100'],
            'location'           => ['nullable', 'string', 'max:120'],
            'project_name'       => ['nullable', 'string', 'max:200'],
            'year'               => ['nullable', 'integer'],
            'equipment_category' => ['nullable', 'string', 'max:100'],
            'units_installed'    => ['nullable', 'integer', 'min:0'],
            'testimonial_author' => ['nullable', 'string', 'max:120'],
            'testimonial'        => ['nullable', 'string'],
            'description'        => ['nullable', 'string'],
            'is_featured'        => ['boolean'],
            'is_active'          => ['boolean'],
            'sort_order'         => ['integer'],
        ]);
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']) . '-' . Str::random(6);
        }
        $c = Customer::create($data);
        $this->flushPublicCache();
        return response()->json(['message' => 'Customer created.', 'customer' => $c], 201);
    }

    public function update(Request $request, Customer $customer)
    {
        $data = $request->validate([
            'name'               => ['sometimes', 'required', 'string', 'max:150'],
            'slug'               => ['sometimes', 'nullable', 'string', 'unique:customers,slug,' . $customer->id],
            'logo_url'           => ['nullable', 'string', 'max:500'],
            'cover_image'        => ['nullable', 'string', 'max:500'],
            'sector'             => ['nullable', 'string', 'max:100'],
            'location'           => ['nullable', 'string', 'max:120'],
            'project_name'       => ['nullable', 'string', 'max:200'],
            'year'               => ['nullable', 'integer'],
            'equipment_category' => ['nullable', 'string', 'max:100'],
            'units_installed'    => ['nullable', 'integer', 'min:0'],
            'testimonial_author' => ['nullable', 'string', 'max:120'],
            'testimonial'        => ['nullable', 'string'],
            'description'        => ['nullable', 'string'],
            'is_featured'        => ['boolean'],
            'is_active'          => ['boolean'],
            'sort_order'         => ['integer'],
        ]);
        $customer->update($data);
        $this->flushPublicCache();
        return response()->json(['message' => 'Customer updated.', 'customer' => $customer->fresh()]);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        $this->flushPublicCache();
        return response()->json(['message' => 'Customer deleted.']);
    }

    public function toggleFeatured(Customer $customer)
    {
        $customer->update(['is_featured' => ! $customer->is_featured]);
        $this->flushPublicCache();
        return response()->json(['message' => 'Toggled.', 'is_featured' => $customer->is_featured]);
    }

    /**
     * Flush the public caches that depend on customers (home page
     * featured_customers + customer_stats + the customer sectors list +
     * the featured-customers cache).
     */
    protected function flushPublicCache(): void
    {
        Cache::forget('public.home');
        Cache::forget('public.customer_stats');
        Cache::forget('public.customer_sectors');
        Cache::forget('public.customers_featured');
    }
}
