<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
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

    /** Public: featured customers for homepage. */
    public function featured()
    {
        return response()->json(
            Customer::active()->where('is_featured', true)->limit(8)->get()
        );
    }

    /** Public: distinct sectors for filter dropdown. */
    public function sectors()
    {
        return response()->json([
            'sectors' => Customer::active()
                ->whereNotNull('sector')
                ->distinct()
                ->pluck('sector')
                ->values(),
        ]);
    }

    /** Public: customer counts grouped by equipment_category + total units installed. */
    public function stats()
    {
        $rows = Customer::active()
            ->whereNotNull('equipment_category')
            ->selectRaw('equipment_category, COUNT(*) as clients, SUM(units_installed) as units')
            ->groupBy('equipment_category')
            ->get();

        return response()->json([
            'stats' => $rows->mapWithKeys(fn ($r) => [
                $r->equipment_category => [
                    'clients' => (int) $r->clients,
                    'units'   => (int) $r->units,
                ],
            ]),
        ]);
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
        return response()->json(['message' => 'Customer updated.', 'customer' => $customer->fresh()]);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json(['message' => 'Customer deleted.']);
    }

    public function toggleFeatured(Customer $customer)
    {
        $customer->update(['is_featured' => ! $customer->is_featured]);
        return response()->json(['message' => 'Toggled.', 'is_featured' => $customer->is_featured]);
    }
}
