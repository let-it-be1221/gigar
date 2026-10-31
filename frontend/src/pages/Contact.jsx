import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  FiMapPin, FiPhone, FiMail, FiClock, FiSend,
  FiUser, FiTag,
} from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import { publicApi } from '../api/client'

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await publicApi.contact(form)
      toast.success('Message sent! We will get back to you within 24 hours.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const INFO = [
    { icon: FiMapPin, label: 'Visit us', value: 'Ledeta St, Addis Ababa, Ethiopia' },
    { icon: FiPhone, label: 'Call us', value: '+251 115 51 82 67' },
    { icon: FiMail,  label: 'Email us', value: 'info@gigartrading.com' },
    { icon: FiClock, label: 'Working hours', value: 'Mon – Fri: 8 AM – 6 PM · Saturday: 8 AM – 12 PM' },
  ]

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gigar-navy py-20 text-white lg:py-28">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="container-page relative">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              Contact us
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Let's talk about your project
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Whether you're planning a workshop fit-out, building elevator installation or need
              after-sales support — our team is ready to help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          {/* Info column */}
          <div className="space-y-4">
            {INFO.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className="card-soft p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gigar-red/10 text-gigar-red">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gigar-navy/50">{info.label}</div>
                    <div className="mt-1 font-semibold text-gigar-navy">{info.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="card-soft p-6 sm:p-8 lg:p-10">
              <h2 className="font-display text-2xl font-extrabold text-gigar-navy">Send us a message</h2>
              <p className="mt-2 text-sm text-gigar-navy/70">
                Fields marked with <span className="text-gigar-red">*</span> are required. We'll reply within 24 hours.
              </p>
              <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field icon={FiUser} label="Full name *" required>
                  <input className="input-field" required value={form.name} onChange={update('name')} placeholder="Your full name" />
                </Field>
                <Field icon={FiMail} label="Email *" required>
                  <input type="email" className="input-field" required value={form.email} onChange={update('email')} placeholder="you@example.com" />
                </Field>
                <Field icon={FiPhone} label="Phone">
                  <input className="input-field" value={form.phone} onChange={update('phone')} placeholder="+251 9…" />
                </Field>
                <Field icon={FiTag} label="Subject">
                  <input className="input-field" value={form.subject} onChange={update('subject')} placeholder="How can we help?" />
                </Field>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Message <span className="text-gigar-red">*</span></label>
                  <textarea
                    rows="6"
                    required
                    className="input-field !rounded-xl"
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us about your project, equipment needs or query…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto">
                    {sending ? 'Sending…' : <>Send message <FiSend /></>}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-gigar-mist py-12">
        <div className="container-page">
          <div className="overflow-hidden rounded-2xl border border-gigar-navy/10 shadow-gigar-soft">
            <iframe
              title="Gigar Trading location"
              src="https://www.google.com/maps?q=Addis%20Ababa%2C%20Ledeta%20St&output=embed"
              className="h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ icon: Icon, label, required, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">
        {label}
        {!required && <span className="text-gigar-navy/40"> (optional)</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gigar-navy/40" />
        <div className="[&_input]:pl-10 [&_input]:pr-4 [&_input]:py-3 [&>div]:contents">
          {children}
        </div>
      </div>
    </div>
  )
}
