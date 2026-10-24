import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowRight, FiCheckCircle, FiPhone, FiChevronRight,
} from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

const ICONS = {
  elevator: '🏗️', lift: '🛗', spray: '🎨', gauge: '📊',
  ac: '❄️', speed: '⚡', truck: '🚚', washer: '🧺',
  garage: '🔧',
}

const FALLBACK_PRODUCTS = [
  {
    id: 'building-elevators', icon: 'elevator',
    title: 'Building Elevators', tagline: 'Traction, hydraulic & MRL elevator systems',
    description: 'Traction elevators for mid/high-rise buildings, hydraulic elevators for low-rise installations, and machine-room-less (MRL) elevators for modern commercial buildings. All systems include steel ropes, counterweights, regenerative drives and emergency backup.',
    features: ['Traction (6+ floors)', 'Hydraulic (2-5 floors)', 'MRL systems', '24/7 emergency support'],
  },
  {
    id: 'building-lifts', icon: 'lift',
    title: 'Building Lifts & Stair Lifts', tagline: 'Vertical mobility for any staircase',
    description: 'Stair lifts for elderly and mobility-impaired residents, curved and straight rail systems with custom 3D-measured rails. Includes seatbelts, obstruction sensors, swivel seats, battery backup and remote control call-and-send operation.',
    features: ['Straight-rail stair lifts', 'Curved-rail stair lifts', 'Battery backup', 'Same-day installation'],
  },
  {
    id: 'paint-booths', icon: 'spray',
    title: 'OMIA Paint Booths', tagline: 'Dust-free, temperature-controlled spray booths',
    description: 'OMIA vehicle paint booths with advanced downdraft ventilation, precise temperature control (20-25°C) and humidity management for professional paint finishes. Full installation includes foundation, electrical, exhaust ducting and air-balance certification.',
    features: ['Downdraft ventilation', 'Temperature control 20-25°C', 'Humidity management', 'Air-balance certification'],
  },
  {
    id: 'vehicle-test-equipment', icon: 'gauge',
    title: 'Vehicle Test Equipment (VTEQ)', tagline: 'Brake, suspension, side-slip & headlight testing',
    description: 'VTEQ vehicle test lanes for inspection centers — brake testers (per-wheel force + imbalance), suspension testers, side-slip plates and headlight aligners. Complete installation includes mechanical, electrical, software commissioning and operator training.',
    features: ['Brake tester', 'Suspension tester', 'Side-slip plate', 'Headlight aligner'],
  },
  {
    id: 'facility-equipment', icon: 'ac',
    title: 'Facility Equipment', tagline: 'Air conditioning, washing machines & power systems',
    description: 'Fujitsu split, cassette and VRF air-conditioning systems, LGS duty washing machines for hotels/hospitals/laundromats, and complete facility equipment supply. Low water and energy consumption, with full preventive-maintenance contracts.',
    features: ['Fujitsu VRF systems', 'Industrial washing machines', 'Energy efficient', 'Full AMC available'],
  },
  {
    id: 'car-lifts', icon: 'lift',
    title: 'BendPak Car Lifts', tagline: 'Premium two-post & four-post vehicle lifts',
    description: 'Authorized distributor of BendPak vehicle lifts — heavy-duty steel construction rated up to 7,000 kg, dual-direct drive technology, automatic arm restraints and slack-cable safety systems. ASE-certified lift columns engineered for decades of daily use.',
    features: ['Two-post lifts', 'Four-post lifts', '7,000 kg capacity', '5-year structural warranty'],
  },
  {
    id: 'gps-speed-limit', icon: 'speed',
    title: 'GPS & Speed Limit Devices', tagline: 'Fleet speed-limiting & GPS tracking',
    description: 'GPS-based speed-limiting devices certified by the Ethiopian Ministry of Transport. Real-time satellite positioning, context-aware speed control, live GPS tracking with route replay and driver-behavior scoring.',
    features: ['GPS speed-limiting', 'Live tracking', 'Driver scoring', 'Compliance certified'],
  },
  {
    id: 'heavy-equipment', icon: 'truck',
    title: 'Heavy Equipment', tagline: 'Construction & industrial machinery',
    description: 'Import and distribution of heavy machinery — excavators, loaders, generators and material-handling equipment with full after-sales support. Includes operator training and genuine spare parts inventory.',
    features: ['Excavators', 'Loaders', 'Generators', 'Material handling'],
  },
]

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    publicApi.products()
      .then(({ data }) => setProducts(data.products?.length ? data.products : FALLBACK_PRODUCTS))
      .catch(() => setProducts(FALLBACK_PRODUCTS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gigar-navy py-20 text-white lg:py-28">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1486006920555-c77dcf2a718e?w=1600&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-gigar-navy via-gigar-navy/85 to-gigar-red/70" />
        </div>
        <div className="container-page relative">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              Our Products
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              The complete equipment catalog
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Building elevators, lifts, paint booths, vehicle test equipment, facility equipment and more — supplied, installed and serviced by certified Gigar technicians across Ethiopia.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page">
          {loading ? (
            <div className="flex justify-center py-16"><Loader label="Loading products…" /></div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <motion.div
                  key={p.id || p.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft transition-all hover:border-gigar-red/30 hover:shadow-gigar-glow"
                >
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gigar-navy to-gigar-red p-6">
                    <div className="text-5xl transition-transform group-hover:scale-110">
                      {ICONS[p.icon] || '⚙️'}
                    </div>
                    <div className="absolute bottom-3 right-4 text-xs font-semibold uppercase tracking-wider text-white/70">
                      {p.id}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-gigar-navy">{p.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-gigar-red/80">{p.tagline}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gigar-navy/70">{p.description}</p>

                    {p.features && p.features.length > 0 && (
                      <ul className="mt-4 space-y-1.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-gigar-navy/80">
                            <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gigar-red" /> {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gigar-red transition-all hover:gap-2.5">
                      Request a quote <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gigar-mist py-16">
        <div className="container-page">
          <AnimatedSection className="rounded-3xl bg-gradient-to-r from-gigar-navy to-gigar-red p-8 text-center text-white sm:p-12">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Don't see what you need?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              We source custom equipment on request — contact our team with your specifications and we'll find the right product for your project.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary !bg-white !text-gigar-red hover:!bg-gigar-gold hover:!text-gigar-navy">
                Contact us <FiArrowRight />
              </Link>
              <a href="tel:+251115518267" className="btn-ghost">
                <FiPhone /> +251 115 51 82 67
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
