<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        if (! $admin) {
            $admin = User::create([
                'name'     => 'Gigar Admin',
                'email'    => 'admin@gigartrading.com',
                'password' => bcrypt('Gigar@2024!'),
                'role'     => 'admin',
            ]);
        }

        $posts = $this->samplePosts();

        foreach ($posts as $post) {
            Post::updateOrCreate(
                ['slug' => $post['slug']],
                array_merge($post, ['user_id' => $admin->id])
            );
        }
    }

    private function samplePosts(): array
    {
        return [
            [
                'title'        => 'Gigar Trading Launches Next-Generation BendPak Car Lifts in Addis Ababa',
                'slug'         => 'bendpak-car-lifts-launch-addis',
                'excerpt'      => 'Authorized BendPak distributor Gigar Trading brings premium two-post and four-post vehicle lifts to Ethiopian workshops, with full installation and after-sales support.',
                'description'  => "<p>Gigar Trading &amp; Technical Center is proud to announce the official launch of our next-generation <strong>BendPak car lift</strong> lineup in Addis Ababa. As the authorized distributor of BendPak equipment in Ethiopia, we are bringing world-class workshop lifting technology to local garages, service centers and industrial workshops.</p><h3>What makes BendPak different</h3><p>BendPak lifts are engineered for durability and safety. Each unit features:</p><ul><li><strong>Heavy-duty steel construction</strong> rated for vehicles up to 7,000 kg</li><li>Dual-direct drive technology for smoother, quieter operation</li><li>Automatic arm restraints and slack-cable safety systems</li><li>ASE-certified lift columns engineered for decades of daily use</li></ul><p>Our certified installation team handles everything from site assessment to commissioning, and every BendPak lift sold by Gigar Trading is backed by a 5-year structural warranty.</p><h3>Why now?</h3><p>With the rapid growth of Ethiopia's automotive service industry, workshops are upgrading from outdated equipment to safer, more efficient lifts. BendPak's advanced engineering dramatically reduces vehicle turnaround time while improving technician safety — a critical priority for modern service centers.</p><p>Visit our technical center on Ledeta Street to see a working demonstration, or contact our team at <a href='mailto:info@gigartrading.com'>info@gigartrading.com</a> for a custom workshop fit-out quotation.</p>",
                'media_type'   => 'image',
                'media_url'    => 'https://images.unsplash.com/photo-1486006920555-c77dcf2a718e?w=1200&q=80&auto=format&fit=crop',
                'media_poster' => 'https://images.unsplash.com/photo-1486006920555-c77dcf2a718e?w=600&q=70&auto=format&fit=crop',
                'category'     => 'Products',
                'tags'         => ['BendPak', 'Car Lifts', 'Garage Equipment', 'Addis Ababa'],
                'is_featured'  => true,
                'status'       => 'published',
                'published_at' => now()->subDays(3),
            ],
            [
                'title'        => 'How GPS Speed-Limit Devices Are Transforming Ethiopian Fleet Safety',
                'slug'         => 'gps-speed-limit-fleet-safety',
                'excerpt'      => 'A deep dive into how GPS speed-limiting devices from Gigar Trading are helping transport operators cut accidents, save fuel and meet national compliance.',
                'description'  => "<p>Road safety is one of the most pressing challenges for Ethiopian transport operators. According to the Federal Transport Authority, speeding remains the single largest contributor to commercial fleet accidents. That's why Gigar Trading has invested in bringing certified <strong>GPS speed-limiting technology</strong> to the local market.</p><h3>How the technology works</h3><p>A GPS speed-limiter connects to the vehicle's engine management system and uses real-time satellite positioning to enforce a maximum speed set by the operator or regulator. Unlike mechanical limiters, GPS-based devices adapt to road class, location and time of day — enabling smarter, context-aware speed control.</p><h3>Why operators are upgrading</h3><ul><li><strong>Insurance premium reductions</strong> of up to 20% for fleets with certified limiters installed</li><li>Fuel savings of 8-12% by eliminating high-speed operation</li><li>Live GPS tracking with route replay and driver-behavior scoring</li><li>Full compliance with Ministry of Transport speed-limit regulations</li></ul><p>Our technicians install and calibrate each device on-site, and our after-sales team handles annual recertification. Get in touch to schedule a free fleet assessment.</p>",
                'media_type'   => 'image',
                'media_url'    => 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80&auto=format&fit=crop',
                'media_poster' => null,
                'category'     => 'Safety',
                'tags'         => ['GPS', 'Speed Limit', 'Fleet Management', 'Safety'],
                'is_featured'  => true,
                'status'       => 'published',
                'published_at' => now()->subDays(7),
            ],
            [
                'title'        => 'Behind the Scenes: Installing a Fujitsu VRF Air-Conditioning System',
                'slug'         => 'fujitsu-vrf-installation-behind-the-scenes',
                'excerpt'      => 'Watch our certified technicians install a multi-zone Fujitsu VRF air-conditioning system for a commercial office in central Addis Ababa.',
                'description'  => "<p>This week our team completed a full Fujitsu VRF (Variable Refrigerant Flow) installation for a 4-storey commercial building in central Addis Ababa. The video walks you through every stage of the project — from load calculation and pipe routing to commissioning and refrigerant balancing.</p><h3>Why VRF?</h3><p>VRF systems offer precise temperature control for multi-zone buildings, simultaneous heating and cooling, and energy savings of up to 30% compared to conventional chillers. For commercial projects where comfort and energy efficiency are both critical, VRF is the modern standard.</p><h3>What's in the video</h3><ul><li>Initial site survey and load calculation</li><li>Refrigerant pipe installation and leak testing</li><li>Indoor unit mounting and ductwork</li><li>Outdoor condenser commissioning</li><li>Final airflow balancing and remote control setup</li></ul><p>Need a custom cooling solution for your office, hotel or hospital? Gigar Trading designs, supplies and installs complete Fujitsu air-conditioning systems across Ethiopia.</p>",
                'media_type'   => 'youtube',
                'media_url'    => 'https://www.youtube.com/embed/6stPkCqDG2w',
                'media_poster' => 'https://images.unsplash.com/photo-1631545806609-39d6e6d8d8d4?w=1200&q=80&auto=format&fit=crop',
                'category'     => 'Projects',
                'tags'         => ['Fujitsu', 'Air Conditioning', 'VRF', 'Installation'],
                'is_featured'  => true,
                'status'       => 'published',
                'published_at' => now()->subDays(12),
            ],
            [
                'title'        => 'Building Elevators 101: Choosing the Right System for Your Building',
                'slug'         => 'building-elevators-101-guide',
                'excerpt'      => 'A practical buyer's guide to traction, hydraulic and MRL elevators — and how to choose the right system for your building in Ethiopia.',
                'description'  => "<p>Selecting the right elevator for a building is one of the most consequential decisions in any construction project. The wrong choice leads to higher energy bills, slower passenger flow and costly retrofits. Here's a practical overview of the three main elevator technologies we supply.</p><h3>1. Traction elevators</h3><p>Best for mid- to high-rise buildings (6+ floors). Traction systems use steel ropes and a counterweight, offering smooth rides and high energy efficiency when paired with regenerative drives.</p><h3>2. Hydraulic elevators</h3><p>Ideal for low-rise buildings (2-5 floors) where speed is less critical. Hydraulic systems are simpler, more affordable to install, and easier to maintain — perfect for residential villas and small clinics.</p><h3>3. Machine-Room-Less (MRL) elevators</h3><p>The modern compromise: MRL elevators combine the efficiency of traction systems with the space savings of not needing a separate machine room. Most new mid-rise commercial buildings today choose MRL.</p><p>Our elevator division supplies all three technologies with full installation, annual maintenance contracts and 24/7 emergency call-out support. Schedule a consultation with our engineers to find the right system for your building.</p>",
                'media_type'   => 'image',
                'media_url'    => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop',
                'media_poster' => null,
                'category'     => 'Guides',
                'tags'         => ['Elevators', 'Building', 'Guide', 'Vertical Transport'],
                'is_featured'  => false,
                'status'       => 'published',
                'published_at' => now()->subDays(18),
            ],
            [
                'title'        => 'OMIA Paint Booths: Why Dust-Free Finishes Matter for Modern Workshops',
                'slug'         => 'omia-paint-booths-dust-free-finishes',
                'excerpt'      => 'A look at how OMIA paint booths deliver dust-free, temperature-controlled spray environments for professional vehicle paint shops.',
                'description'  => "<p>For any vehicle paint shop, the single biggest determinant of finish quality is the booth. OMIA paint booths — supplied and installed by Gigar Trading — create the controlled environment needed for professional-grade paintwork.</p><h3>What a paint booth actually does</h3><p>A spray booth is more than just an enclosed space. It actively manages three critical variables:</p><ul><li><strong>Airflow</strong> — downdraft ventilation removes overspray and dust, keeping the surface clean while the paint cures</li><li><strong>Temperature</strong> — paint needs to be applied at 20-25°C for optimal flow and adhesion</li><li><strong>Humidity</strong> — high humidity causes paint defects; booths control moisture to a precise setpoint</li></ul><p>Without these controls, even the best paint and the most skilled painter will struggle to produce a flawless finish. OMIA booths bring industrial-grade control to any workshop.</p><h3>Our installation process</h3><p>Each booth is sized, supplied and commissioned by Gigar Trading's technical team. We handle foundation preparation, electrical connections, exhaust ducting and final air-balance certification — so your booth is ready for production on day one.</p>",
                'media_type'   => 'image',
                'media_url'    => 'https://images.unsplash.com/photo-1565043666747-526e43e1b75e?w=1200&q=80&auto=format&fit=crop',
                'media_poster' => null,
                'category'     => 'Products',
                'tags'         => ['OMIA', 'Paint Booth', 'Workshop', 'Quality'],
                'is_featured'  => false,
                'status'       => 'published',
                'published_at' => now()->subDays(22),
            ],
            [
                'title'        => 'VTEQ Vehicle Test Lanes: Inside Our Inspection Center Installation',
                'slug'         => 'vteq-vehicle-test-lanes-installation',
                'excerpt'      => 'A complete walkthrough of a VTEQ vehicle test lane installation — brakes, suspension, side-slip and headlight alignment.',
                'description'  => "<p>Gigar Trading recently completed the installation of a full VTEQ vehicle test lane for a regional inspection center. This project took three weeks from foundation pour to commissioning and demonstrates the breadth of our technical capabilities.</p><h3>What's in a VTEQ test lane?</h3><p>A complete test lane typically includes four core measurement stations:</p><ul><li><strong>Brake tester</strong> — measures braking force per wheel and calculates imbalance</li><li><strong>Suspension tester</strong> — evaluates shock absorber performance and ride stability</li><li><strong>Side-slip plate</strong> — detects wheel alignment issues through lateral movement</li><li><strong>Headlight aligner</strong> — checks beam intensity and aim</li></ul><h3>Why VTEQ</h3><p>VTEQ is one of the world's most established manufacturers of vehicle inspection equipment. Their test lanes are used by government inspection bodies and private fleets across more than 50 countries, and are renowned for measurement accuracy and reliability under continuous daily use.</p><p>Our engineers handle the full installation — mechanical, electrical, software commissioning and operator training. Contact us if you're planning a new inspection facility or upgrading an existing test lane.</p>",
                'media_type'   => 'image',
                'media_url'    => 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=80&auto=format&fit=crop',
                'media_poster' => null,
                'category'     => 'Projects',
                'tags'         => ['VTEQ', 'Vehicle Inspection', 'Test Lane', 'Installation'],
                'is_featured'  => false,
                'status'       => 'published',
                'published_at' => now()->subDays(28),
            ],
            [
                'title'        => 'Stair Lifts for Accessibility: Bringing Mobility Home',
                'slug'         => 'stair-lifts-accessibility-mobility-home',
                'excerpt'      => 'How Gigar Trading's stair lift solutions are restoring independence for elderly and mobility-impaired residents across Ethiopia.',
                'description'  => "<p>For elderly and mobility-impaired individuals, a single flight of stairs can become a daily barrier — preventing access to bedrooms, bathrooms and even front doors. Gigar Trading's stair lift division designs and installs custom stair lift solutions that restore independence and keep people in the homes they love.</p><h3>Curved vs straight rail systems</h3><p>Stair lifts come in two main configurations:</p><ul><li><strong>Straight-rail</strong> — for simple, straight staircases. Faster to install, more affordable.</li><li><strong>Curved-rail</strong> — custom-built to follow any staircase geometry, including intermediate landings and spiral sections.</li></ul><p>Every installation begins with a 3D laser measurement of the staircase, which is sent to the factory to fabricate a precision-matched rail. The result is a smooth, silent ride that fits the home perfectly.</p><h3>Safety as standard</h3><p>All our stair lifts include seatbelts, obstruction sensors, swivel seats, battery backup for power cuts, and remote controls for call-and-send operation. Installation is typically completed in a single day.</p>",
                'media_type'   => 'image',
                'media_url'    => 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop',
                'media_poster' => null,
                'category'     => 'Accessibility',
                'tags'         => ['Stair Lifts', 'Accessibility', 'Mobility', 'Home'],
                'is_featured'  => false,
                'status'       => 'published',
                'published_at' => now()->subDays(35),
            ],
            [
                'title'        => 'Heavy-Duty Washing Machines for Hotels, Hospitals & Laundromats',
                'slug'         => 'heavy-duty-washing-machines-hotels-hospitals',
                'excerpt'      => 'LGS duty washing machines deliver industrial laundry capacity with low water and energy consumption.',
                'description'  => "<p>Commercial laundries operate on tight margins — every liter of water and kilowatt-hour of electricity directly affects profitability. LGS duty washing machines, supplied by Gigar Trading, are engineered specifically for the high-volume, high-reliability demands of hotels, hospitals and laundromats.</p><h3>What sets industrial washing machines apart</h3><ul><li><strong>Stainless-steel drums</strong> rated for 10,000+ operating hours</li><li>Programmable wash cycles with up to 30 pre-set recipes</li><li>High-speed extraction (up to 1000 G-factor) reduces downstream drying time</li><li>Low water consumption per cycle (as low as 18 liters per kg of laundry)</li></ul><h3>Industries we serve</h3><p>From 25 kg capacity machines for boutique hotels to 120 kg units for industrial laundries, we offer the full LGS range. Our team sizes each installation to match daily laundry volume, and provides operator training plus preventive-maintenance contracts.</p>",
                'media_type'   => 'image',
                'media_url'    => 'https://images.unsplash.com/photo-1626806787461-102c1b82f9ed?w=1200&q=80&auto=format&fit=crop',
                'media_poster' => null,
                'category'     => 'Products',
                'tags'         => ['Washing Machines', 'Industrial', 'Hotels', 'Hospitals'],
                'is_featured'  => false,
                'status'       => 'published',
                'published_at' => now()->subDays(42),
            ],
        ];
    }
}
