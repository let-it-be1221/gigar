import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import AdminDashboard from './pages/admin/Dashboard'
import AdminPostList from './pages/admin/PostList'
import AdminPostEditor from './pages/admin/PostEditor'
import AdminCarouselManager from './pages/admin/CarouselManager'
import AdminCustomerManager from './pages/admin/CustomerManager'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Admin (protected) */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/posts" element={<ProtectedRoute><AdminPostList /></ProtectedRoute>} />
        <Route path="/admin/posts/new" element={<ProtectedRoute><AdminPostEditor /></ProtectedRoute>} />
        <Route path="/admin/posts/:id/edit" element={<ProtectedRoute><AdminPostEditor /></ProtectedRoute>} />
        <Route path="/admin/carousel" element={<ProtectedRoute><AdminCarouselManager /></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute><AdminCustomerManager /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
