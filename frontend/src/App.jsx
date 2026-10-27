import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Products from './pages/Products'
import Customers from './pages/Customers'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import PageFallback from './components/PageFallback'

// Admin pages are lazy-loaded — visitors who never log in never download
// the ~150KB of admin JS. Each admin route becomes its own chunk.
const AdminDashboard      = lazy(() => import('./pages/admin/Dashboard'))
const AdminPostList       = lazy(() => import('./pages/admin/PostList'))
const AdminPostEditor     = lazy(() => import('./pages/admin/PostEditor'))
const AdminCarouselManager = lazy(() => import('./pages/admin/CarouselManager'))
const AdminCustomerManager = lazy(() => import('./pages/admin/CustomerManager'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public — loaded eagerly (the landing experience) */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Admin (protected + lazy) */}
        <Route path="/admin" element={<ProtectedRoute><Suspense fallback={<PageFallback />}><AdminDashboard /></Suspense></ProtectedRoute>} />
        <Route path="/admin/posts" element={<ProtectedRoute><Suspense fallback={<PageFallback />}><AdminPostList /></Suspense></ProtectedRoute>} />
        <Route path="/admin/posts/new" element={<ProtectedRoute><Suspense fallback={<PageFallback />}><AdminPostEditor /></Suspense></ProtectedRoute>} />
        <Route path="/admin/posts/:id/edit" element={<ProtectedRoute><Suspense fallback={<PageFallback />}><AdminPostEditor /></Suspense></ProtectedRoute>} />
        <Route path="/admin/carousel" element={<ProtectedRoute><Suspense fallback={<PageFallback />}><AdminCarouselManager /></Suspense></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute><Suspense fallback={<PageFallback />}><AdminCustomerManager /></Suspense></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
