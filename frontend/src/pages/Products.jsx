import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowRight, FiCheckCircle, FiPhone, FiChevronRight,
} from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import Loader from '../components/Loader'
import SmartImage from '../components/SmartImage'
import TechnicalSpecs from '../components/TechnicalSpecs'
import { publicApi } from '../api/client'

// Sample product images (replaceable by the admin via PublicController::products()
// backend, or by editing this map). Each entry maps a product id → photo URL.
const PRODUCT_IMAGES = {
  'building-elevators': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop',
  'building-lifts': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop',
  'paint-booths': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
  'vehicle-test-equipment': 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=80&auto=format&fit=crop',
  'facility-equipment': 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80&auto=format&fit=crop',
  'car-lifts': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop',
  'gps-speed-limit': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80&auto=format&fit=crop',
  'heavy-equipment': 'https://picsum.photos/seed/heavy-equipment/1200/900',
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
  const [loading, setLoading] = useState(true)

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
              {products.map((p, i) => {
                const img = PRODUCT_IMAGES[p.id] || `https://picsum.photos/seed/${p.id}/1200/900`
                return (
                  <motion.div
                    key={p.id || p.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    whileHover={{ y: -8 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft transition-all hover:border-gigar-red/30 hover:shadow-gigar-glow"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <SmartImage
                        src={img}
                        alt={p.title}
                        fallbackSeed={p.id}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Dark gradient overlay for the title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/85 via-gigar-navy/30 to-transparent" />
                      {/* Category chip */}
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-gigar-red/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                          {p.id.split('-')[0]}
                        </span>
                      </div>
                      {/* Title overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="font-display text-xl font-bold text-white drop-shadow-md">{p.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-gigar-gold drop-shadow">{p.tagline}</p>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex-1 text-sm leading-relaxed text-gigar-navy/75">{p.description}</p>

                      {p.features && p.features.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {p.features.map((f) => (
                            <div key={f} className="flex items-start gap-1.5 rounded-lg bg-gigar-mist px-2.5 py-1.5 text-xs font-medium text-gigar-navy/80">
                              <FiCheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gigar-red" /> {f}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-6 flex items-center justify-between border-t border-gigar-navy/10 pt-4">
                        <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gigar-red transition-all hover:gap-2.5">
                          Request a quote <FiArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/products" className="text-xs font-semibold text-gigar-navy/50 hover:text-gigar-red">
                          #{p.id}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Key Specifications & Technical Briefing — two-column spec card */}
      <section className="bg-gigar-mist py-20 lg:py-24">
        <div className="container-page">
          <TechnicalSpecs />
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
