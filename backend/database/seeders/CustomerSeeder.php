<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            [
                'name'               => 'Hilton Addis Ababa',
                'sector'             => 'Hotel',
                'location'           => 'Addis Ababa',
                'project_name'       => 'Full VRF cooling + 14 elevators for the new tower wing',
                'year'               => 2023,
                'equipment_category' => 'building-elevators',
                'units_installed'    => 14,
                'logo_url'           => 'https://picsum.photos/seed/hilton-addis/240/120',
                'cover_image'        => 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80&auto=format&fit=crop',
                'testimonial_author' => 'Dawit Bekele, Facilities Manager',
                'testimonial'        => "Gigar Trading delivered all 14 elevators and our full VRF cooling system on schedule. Their after-sales team responds within hours, not days.",
                'description'        => "<p>The Hilton Addis Ababa tower wing, completed in 2023, features 14 BendPak-traction elevators and a Fujitsu VRF air-conditioning system serving 220 guest rooms. Gigar Trading's team handled everything from load calculations to commissioning and operator training.</p><h3>What we delivered</h3><ul><li>14 traction elevators (6-passenger and 8-passenger configurations)</li><li>Fujitsu VRF system covering 18,000 m² across 12 floors</li><li>2-year Annual Maintenance Contract with quarterly preventive service</li><li>Operator training for 8 Hilton engineering staff</li></ul>",
                'is_featured'        => true,
                'sort_order'         => 1,
            ],
            [
                'name'               => 'St. Paul Hospital',
                'sector'             => 'Hospital',
                'location'           => 'Addis Ababa',
                'project_name'       => 'Sterile laundry facility + 6 elevators for the new medical wing',
                'year'               => 2022,
                'equipment_category' => 'building-elevators',
                'units_installed'    => 6,
                'logo_url'           => 'https://picsum.photos/seed/st-paul-hospital/240/120',
                'cover_image'        => 'https://images.unsplash.com/photo-1538108149393-fbb5c7d7d28e?w=1200&q=80&auto=format&fit=crop',
                'testimonial_author' => 'Dr. Selamawit Tesfaye, Hospital Director',
                'testimonial'        => "Sterile laundry is mission-critical for any hospital. The LGS washing machines Gigar installed have run 16 hours a day for two years without a single unplanned stop.",
                'description'        => "<p>St. Paul Hospital's new 9-floor medical wing opened in 2022 with 6 Gigar-supplied elevators and a full sterile-laundry facility powered by LGS duty washing machines. The system processes up to 1.2 tons of laundry per day — bedding, surgical gowns, and sterile drapes — meeting international hospital hygiene standards.</p><h3>Scope</h3><ul><li>6 MRL passenger + service elevators</li><li>4 LGS heavy-duty washing machines (50 kg each)</li><li>2 industrial dryers + 1 ironing line</li><li>5-year AMC with monthly preventive maintenance</li></ul>",
                'is_featured'        => true,
                'sort_order'         => 2,
            ],
            [
                'name'               => 'Bole Workshop Cooperative',
                'sector'             => 'Workshop',
                'location'           => 'Addis Ababa',
                'project_name'       => 'Workshop fit-out with BendPak lifts + OMIA paint booth',
                'year'               => 2023,
                'equipment_category' => 'car-lifts',
                'units_installed'    => 8,
                'logo_url'           => 'https://picsum.photos/seed/bole-workshop/240/120',
                'cover_image'        => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop',
                'testimonial_author' => 'Yohannes G., Cooperative Chairman',
                'testimonial'        => "We went from a small garage to a 12-bay workshop in 4 months. The BendPak lifts are rock-solid and the OMIA paint booth transformed our paint quality.",
                'description'        => "<p>Bole Workshop Cooperative represents 28 small garage owners who pooled resources to build a shared 12-bay service center. Gigar Trading designed the full fit-out: 8 BendPak two-post lifts, an OMIA paint booth, a VTEQ brake tester, and complete compressed-air and tool distribution.</p><h3>Project highlights</h3><ul><li>8 BendPak two-post lifts (4,500 kg each)</li><li>1 OMIA downdraft paint booth (8m × 5m)</li><li>1 VTEQ brake + suspension test lane</li><li>Full workshop tool & air system installation</li></ul>",
                'is_featured'        => true,
                'sort_order'         => 3,
            ],
            [
                'name'               => 'Federal Transport Authority',
                'sector'             => 'Government',
                'location'           => 'Addis Ababa',
                'project_name'       => 'Nationwide GPS speed-limit device certification program',
                'year'               => 2023,
                'equipment_category' => 'gps-speed-limit',
                'units_installed'    => 4800,
                'logo_url'           => 'https://picsum.photos/seed/fta-ethiopia/240/120',
                'cover_image'        => 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80&auto=format&fit=crop',
                'testimonial_author' => 'Ato Bekele G., Compliance Department',
                'testimonial'        => "Gigar's technicians installed GPS speed-limiters on 4,800 commercial vehicles across 6 regional depots — on time and on budget. Their certification reports passed every audit.",
                'description'        => "<p>As part of the national road-safety initiative, the Federal Transport Authority contracted Gigar Trading to design and execute a nationwide GPS speed-limit device certification program. The 18-month project covered 6 regional depots and 4,800+ commercial vehicles, with full compliance reporting to the Ministry of Transport.</p><h3>Program scope</h3><ul><li>4,800 GPS speed-limiters installed across 6 depots</li><li>Driver behavior scoring + fleet GPS tracking</li><li>Quarterly compliance reports to the Ministry</li><li>Annual recertification contracts</li></ul>",
                'is_featured'        => true,
                'sort_order'         => 4,
            ],
            [
                'name'               => 'Aya Real Estate',
                'sector'             => 'Real Estate',
                'location'           => 'Addis Ababa',
                'project_name'       => '3 residential towers with curved-rail stair lifts + 9 elevators',
                'year'               => 2024,
                'equipment_category' => 'building-lifts',
                'units_installed'    => 18,
                'logo_url'           => 'https://picsum.photos/seed/aya-real-estate/240/120',
                'cover_image'        => 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop',
                'testimonial_author' => 'Ms. Hanna T., Project Manager',
                'testimonial'        => "Our accessibility mandate meant every tower needed both elevators AND stair lifts. Gigar delivered both — on time, on budget, with great attention to detail.",
                'description'        => "<p>Aya Real Estate's three 14-floor residential towers in central Addis Ababa set a new accessibility standard for the city. Each tower has 3 MRL elevators and 3 curved-rail stair lifts for residents with mobility impairments — 18 installations in total — all supplied, installed and commissioned by Gigar Trading within 11 months.</p><h3>Scope</h3><ul><li>9 MRL elevators (3 per tower)</li><li>9 curved-rail stair lifts with 3D-measured rails</li><li>Battery backup + obstruction sensors</li><li>3-year AMC with 24/7 emergency call-out</li></ul>",
                'is_featured'        => false,
                'sort_order'         => 5,
            ],
            [
                'name'               => 'Mekelle Vehicle Inspection Center',
                'sector'             => 'Government',
                'location'           => 'Mekelle',
                'project_name'       => 'Complete VTEQ vehicle test lane installation',
                'year'               => 2022,
                'equipment_category' => 'vehicle-test-equipment',
                'units_installed'    => 4,
                'logo_url'           => 'https://picsum.photos/seed/mekelle-vic/240/120',
                'cover_image'        => 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=80&auto=format&fit=crop',
                'testimonial_author' => 'Ato Tesfaye M., Center Director',
                'testimonial'        => "Our VTEQ test lane has handled 200+ inspections per day for 2 years. The accuracy is excellent and Gigar's maintenance team keeps it running smoothly.",
                'description'        => "<p>The Mekelle Vehicle Inspection Center opened in 2022 with a complete VTEQ test lane supplied and installed by Gigar Trading. The center now processes 200+ vehicle inspections per day — brakes, suspension, side-slip, headlight alignment — with measurement accuracy meeting international standards.</p><h3>What was installed</h3><ul><li>Brake tester (per-wheel force + imbalance)</li><li>Suspension tester</li><li>Side-slip plate</li><li>Headlight aligner + control software</li></ul>",
                'is_featured'        => false,
                'sort_order'         => 6,
            ],
            [
                'name'               => 'Addis Car Service',
                'sector'             => 'Workshop',
                'location'           => 'Addis Ababa',
                'project_name'       => 'Premium paint shop with OMIA booth + prep area',
                'year'               => 2023,
                'equipment_category' => 'paint-booths',
                'units_installed'    => 1,
                'logo_url'           => 'https://picsum.photos/seed/addis-car-service/240/120',
                'cover_image'        => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
                'testimonial_author' => 'Mr. Robel A., Owner',
                'testimonial'        => "Our paint quality jumped from average to premium after installing the OMIA booth. Dust inclusions dropped to zero and customer satisfaction soared.",
                'description'        => "<p>Addis Car Service built a premium paint shop in 2023 to target insurance fleet contracts. The centerpiece is an OMIA downdraft paint booth with temperature and humidity control, supplied and installed by Gigar Trading. The shop now handles 30+ premium paint jobs per month with zero dust inclusions.</p><h3>Scope</h3><ul><li>OMIA downdraft paint booth (7m × 4m)</li><li>Prep area with compressed-air system</li><li>Foundation + exhaust ducting + air-balance certification</li><li>Operator training + 1-year AMC</li></ul>",
                'is_featured'        => false,
                'sort_order'         => 7,
            ],
            [
                'name'               => 'Awash Hospital Laundry',
                'sector'             => 'Hospital',
                'location'           => 'Awash',
                'project_name'       => 'Sterile laundry facility with LGS industrial machines',
                'year'               => 2024,
                'equipment_category' => 'facility-equipment',
                'units_installed'    => 6,
                'logo_url'           => 'https://picsum.photos/seed/awash-hospital/240/120',
                'cover_image'        => 'https://images.unsplash.com/photo-1626806787461-102c1b82f9ed?w=1200&q=80&auto=format&fit=crop',
                'testimonial_author' => 'Sister Marta, Operations Lead',
                'testimonial'        => "Reliable sterile laundry is non-negotiable for a hospital. Gigar's LGS machines have run 18 hours a day with zero unplanned downtime — exceptional equipment.",
                'description'        => "<p>Awash Hospital's new central laundry facility opened in 2024 with a full suite of LGS industrial washing machines supplied and installed by Gigar Trading. The facility processes 2.5 tons of hospital laundry daily — bedding, surgical gowns, sterile drapes — meeting international hospital hygiene standards.</p><h3>Scope</h3><ul><li>4 LGS washing machines (80 kg each)</li><li>2 industrial dryers (120 kg capacity)</li><li>1 ironing + folding line</li><li>2-year AMC with monthly preventive maintenance</li></ul>",
                'is_featured'        => false,
                'sort_order'         => 8,
            ],
        ];

        foreach ($customers as $c) {
            Customer::updateOrCreate(
                ['name' => $c['name']],
                array_merge($c, ['is_active' => true])
            );
        }
    }
}
