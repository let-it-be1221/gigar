import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'

export default function Login() {
  const { login, isAdmin, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/admin'

  const [form, setForm]         = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [busy, setBusy]          = useState(false)

  if (loading) return <Loader fullscreen label="Loading…" />
  if (isAdmin) return <Navigate to="/admin" replace />

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      const data = await login(form.email, form.password)
      toast.success(`Welcome back, ${data.user.name}!`)
      navigate(from, { replace: true })
    } catch (err) {
      const msg = err?.response?.data?.message
        || err?.response?.data?.errors?.email?.[0]
        || 'Invalid credentials. Please try again.'
      toast.error(msg)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-gigar-navy px-4 py-16 text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1486006920555-c77dcf2a718e?w=1600&q=80&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gigar-navy via-gigar-navy/95 to-gigar-red/80" />
        <div className="absolute inset-0 bg-section-grid bg-grid-md opacity-20" />
      </div>
      <div className="pointer-events-none absolute -top-10 right-10 h-64 w-64 rounded-full bg-gigar-red/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gigar-gold/20 blur-3xl" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        {/* Left: brand message */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col leading-none"
          >
            <span className="font-display text-3xl font-extrabold tracking-tight text-white">GIGAR</span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-gigar-gold">Trading & Technical Center</span>
          </motion.div>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight">
            Welcome back, <span className="text-gigar-red">Administrator</span>.
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/80">
            Sign in to manage blog posts, upload media and curate what visitors see on the
            Gigar Trading & Technical Center website.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-white/70">
            {['Publish new blog articles with images or video',
              'Edit or archive existing posts',
              'Upload and manage media assets',
              'Mark featured articles for the homepage'].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gigar-gold" /> {f}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gigar-red/30 text-gigar-gold ring-1 ring-white/20">
                <FiShield className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-extrabold">Admin Login</h2>
                <p className="text-xs text-white/60">Restricted area — admins only</p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Email</label>
                <div className="relative">
                  <FiMail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                  <input
                    type="email" required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="admin@gigartrading.com"
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-10 py-3 text-sm text-white placeholder:text-white/40 focus:border-gigar-red focus:outline-none focus:ring-2 focus:ring-gigar-red/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">Password</label>
                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                  <input
                    type={showPass ? 'text' : 'password'} required
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-10 py-3 text-sm text-white placeholder:text-white/40 focus:border-gigar-red focus:outline-none focus:ring-2 focus:ring-gigar-red/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    <AnimatePresence mode="wait">
                      {showPass ? <FiEyeOff key="off" className="h-5 w-5" /> : <FiEye key="on" className="h-5 w-5" />}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-white/70">
                  <input type="checkbox" className="h-3 w-3 rounded border-white/30 bg-white/10" />
                  Remember me
                </label>
                <a href="#" className="font-semibold text-gigar-gold hover:underline">Forgot password?</a>
              </div>

              <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-70">
                {busy ? 'Signing in…' : <>Sign in <FiArrowRight /></>}
              </button>
            </form>

            <div className="mt-5 rounded-xl border border-white/10 bg-gigar-gold/10 p-3 text-xs text-gigar-gold">
              <strong>Demo credentials:</strong><br/>
              Email: <code className="rounded bg-white/10 px-1.5 py-0.5">admin@gigartrading.com</code><br/>
              Password: <code className="rounded bg-white/10 px-1.5 py-0.5">Gigar@2024!</code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
