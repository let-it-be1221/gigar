<?php

namespace Database\Seeders;

use App\Models\CarouselSlide;
use Illuminate\Database\Seeder;

class CarouselSlideSeeder extends Seeder
{
    public function run(): void
    {
        // All image URLs below have been verified to return HTTP 200.
        // Admin can swap any of these later via /admin/carousel.
        $slides = [
            [
                'title'      => 'Building Elevators & Escalators',
                'subtitle'   => 'Traction, hydraulic & MRL elevator systems installed and serviced across Ethiopia.',
                'image_url'  => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80&auto=format&fit=crop',
                'cta_text'   => 'Explore elevators',
                'cta_link'   => '/products',
                'badge'      => 'Vertical Transport',
                'category'   => 'Elevators',
                'sort_order' => 1,
            ],
            [
                'title'      => 'BendPak Car Lifts',
                'subtitle'   => 'Premium two-post & four-post vehicle lifts for professional workshops.',
                'image_url'  => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80&auto=format&fit=crop',
                'cta_text'   => 'Explore lifts',
                'cta_link'   => '/products',
                'badge'      => 'Authorized Distributor',
                'category'   => 'Lifts',
                'sort_order' => 2,
            ],
            [
                'title'      => 'OMIA Paint Booths',
                'subtitle'   => 'Dust-free, temperature-controlled spray booths for professional paintwork.',
                'image_url'  => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format&fit=crop',
                'cta_text'   => 'Explore paint booths',
                'cta_link'   => '/products',
                'badge'      => 'Workshop Solutions',
                'category'   => 'Paint Booths',
                'sort_order' => 3,
            ],
            [
                'title'      => 'VTEQ Vehicle Test Equipment',
                'subtitle'   => 'Brake, suspension, side-slip & headlight alignment test lanes for inspection centers.',
                'image_url'  => 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1920&q=80&auto=format&fit=crop',
                'cta_text'   => 'Explore test equipment',
                'cta_link'   => '/products',
                'badge'      => 'Inspection Technology',
                'category'   => 'Vehicle Test Equipment',
                'sort_order' => 4,
            ],
            [
                'title'      => 'Facility Equipment & Air Conditioning',
                'subtitle'   => 'Fujitsu VRF systems, washing machines and complete facility cooling solutions.',
                'image_url'  => 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1920&q=80&auto=format&fit=crop',
                'cta_text'   => 'Explore facility equipment',
                'cta_link'   => '/products',
                'badge'      => 'Facility Solutions',
                'category'   => 'Facility Equipment',
                'sort_order' => 5,
            ],
        ];

        foreach ($slides as $slide) {
            CarouselSlide::updateOrCreate(
                ['title' => $slide['title']],
                array_merge($slide, ['is_active' => true])
            );
        }
    }
}
