import { motion } from 'framer-motion'
import { FiCheckCircle, FiAward, FiUsers, FiGlobe, FiTrendingUp } from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'

const VALUES = [
  { title: 'Quality First', text: 'We only import and supply equipment that meets international safety and quality standards.' },
  { title: 'Customer Success', text: 'We measure our success by the long-term satisfaction of our customers, not by single transactions.' },
  { title: 'Technical Excellence', text: 'Our certified engineers and technicians are continuously trained on the latest equipment technology.' },
  { title: 'After-Sales Commitment', text: 'Every installation is backed by warranty, training and responsive maintenance support.' },
]

const TIMELINE = [
  { year: '1985', title: 'Founded in Addis Ababa', text: 'Gigar Trading opens its doors, supplying spare parts and basic workshop equipment.' },
  { year: '1996', title: 'Brand Partnerships', text: 'Becomes authorized distributor for leading international brands.' },
  { year: '2008', title: 'Technical Center Opens', text: 'Launched our dedicated Technical Center on Ledeta Street for installations and service.' },
  { year: '2018', title: 'Elevator Division', text: 'Expanded into building elevators, escalators and stair lifts.' },
  { year: '2024', title: 'GPS & Heavy Equipment', text: 'Launched GPS speed-limit device certification and heavy-equipment distribution.' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gigar-navy py-20 text-white lg:py-28">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="container-page relative">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              About Us
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Ethiopia's trusted supplier of industrial equipment since 1985
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Gigar Trading & Technical Center has spent nearly four decades building the trust of
              Ethiopian workshops, hospitals, hotels, factories and government projects — one
              installation at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <span className="section-eyebrow">Our Story</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
              From a small spare-parts shop to a national technical center
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gigar-navy/80">
              <p>
                Gigar Trading was founded in 1985 E.C. in Addis Ababa with a simple mission: bring
                high-quality, reliable industrial equipment to Ethiopian businesses. What started
                as a small spare-parts shop on Ledeta Street has grown into one of the country's
                most respected suppliers of garage equipment, lifts, escalators, paint booths and
                heavy machinery.
              </p>
              <p>
                Our team has installed equipment for hundreds of workshops, vehicle inspection
                centers, commercial buildings and industrial facilities across the country. Every
                project — large or small — is backed by the same commitment to quality,
                professionalism and after-sales support that has defined us since day one.
              </p>
              <p>
                Today, we are the authorized distributor for world-renowned brands including BendPak,
                Fujitsu, OMIA, VTEQ and Electrolux. Our technical center in Addis Ababa houses our
                engineering team, training facilities and after-sales workshop — keeping our
                customers productive for decades to come.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <motion.img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80&auto=format&fit=crop"
                alt="Workshop" className="col-span-2 h-64 w-full rounded-2xl object-cover shadow-gigar-soft"
                whileHover={{ scale: 1.02 }}
              />
              <motion.img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80&auto=format&fit=crop"
                alt="Equipment" className="h-40 w-full rounded-xl object-cover shadow-gigar-soft"
                whileHover={{ scale: 1.02 }}
              />
              <motion.img
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&q=80&auto=format&fit=crop"
                alt="Vehicle test" className="h-40 w-full rounded-xl object-cover shadow-gigar-soft"
                whileHover={{ scale: 1.02 }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="bg-gigar-mist py-20 lg:py-28">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          {[
            { icon: FiGlobe, title: 'Our Vision', text: 'To be Ethiopia\'s most trusted industrial equipment partner — setting the national benchmark for quality, safety and after-sales service.' },
            { icon: FiTrendingUp, title: 'Our Mission', text: 'To import, supply and install world-class equipment with full local support — empowering workshops, facilities and businesses to operate at their best.' },
            { icon: FiUsers, title: 'Our People', text: 'A multidisciplinary team of certified engineers, technicians and customer-care specialists committed to your project\'s success.' },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="card-soft p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gigar-red/10 text-gigar-red">
                <card.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-gigar-navy">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gigar-navy/70">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <AnimatedSection className="mx-auto mb-14 max-w-3xl text-center">
            <span className="section-eyebrow">Our Values</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
              What we stand for
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="card-soft p-6 hover:border-gigar-red/30"
              >
                <FiCheckCircle className="h-8 w-8 text-gigar-red" />
                <h3 className="mt-4 font-display text-lg font-bold text-gigar-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gigar-navy/70">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gigar-navy py-20 text-white lg:py-28">
        <div className="container-page">
          <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              <FiAward className="h-3.5 w-3.5" /> Our Journey
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Four decades of growth</h2>
          </AnimatedSection>
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-4 top-0 h-full w-px bg-white/15 sm:left-1/2 sm:-translate-x-1/2" />
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative mb-10 flex gap-6 sm:w-1/2 ${
                  i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'
                }`}
              >
                <div className={`absolute top-2 h-3 w-3 rounded-full bg-gigar-red ring-4 ring-gigar-navy ${
                  i % 2 === 0 ? 'right-0 sm:-right-1.5' : 'left-0 sm:-left-1.5'
                }`} />
                <div className="card-soft bg-white/5 p-5 text-left text-white sm:text-inherit">
                  <div className="font-display text-xl font-extrabold text-gigar-gold">{t.year}</div>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">{t.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{t.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
