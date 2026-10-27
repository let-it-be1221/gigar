import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const PUBLIC_BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: false,
})

// Attach bearer token to all admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gigar_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-logout on 401
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('gigar_token')
      localStorage.removeItem('gigar_user')
      // Avoid redirect loops when already on a public page
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export { API_BASE_URL, PUBLIC_BASE_URL }
export default api

/* ----- Public endpoints (guest) ----- */
export const publicApi = {
  posts: (params = {}) => api.get('/public/posts', { params }),
  featuredPosts: () => api.get('/public/posts/featured'),
  postBySlug: (slug) => api.get(`/public/posts/slug/${slug}`),
  stats: () => api.get('/public/stats'),
  services: () => api.get('/public/services'),
  products: () => api.get('/public/products'),
  carousel: () => api.get('/public/carousel'),
  contact: (payload) => api.post('/public/contact', payload),

  // Customers
  customers: (params = {}) => api.get('/public/customers', { params }),
  featuredCustomers: () => api.get('/public/customers/featured'),
  customerSectors: () => api.get('/public/customers/sectors'),
  customerStats: () => api.get('/public/customers/stats'),
  customerBySlug: (slug) => api.get(`/public/customers/${slug}`),
}

/* ----- Auth ----- */
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
}

/* ----- Admin endpoints ----- */
export const adminApi = {
  listPosts: (params = {}) => api.get('/admin/posts', { params }),
  getPost: (id) => api.get(`/admin/posts/${id}`),
  createPost: (data) => api.post('/admin/posts', data),
  updatePost: (id, data) => api.put(`/admin/posts/${id}`, data),
  deletePost: (id) => api.delete(`/admin/posts/${id}`),
  toggleFeature: (id) => api.post(`/admin/posts/${id}/feature`),
  uploadMedia: (file) => {
    const fd = new FormData()
    fd.append('file', file)
    return api.post('/admin/media', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  deleteMedia: (path) => api.delete(`/admin/media/${encodeURIComponent(path)}`),
  dashboard: () => api.get('/admin/dashboard'),

  // Carousel slides
  listCarousel: (params = {}) => api.get('/admin/carousel', { params }),
  createCarouselSlide: (data) => api.post('/admin/carousel', data),
  updateCarouselSlide: (id, data) => api.put(`/admin/carousel/${id}`, data),
  deleteCarouselSlide: (id) => api.delete(`/admin/carousel/${id}`),
  toggleCarouselSlide: (id) => api.post(`/admin/carousel/${id}/toggle`),

  // Customers
  listCustomers: (params = {}) => api.get('/admin/customers', { params }),
  createCustomer: (data) => api.post('/admin/customers', data),
  updateCustomer: (id, data) => api.put(`/admin/customers/${id}`, data),
  deleteCustomer: (id) => api.delete(`/admin/customers/${id}`),
  toggleCustomerFeature: (id) => api.post(`/admin/customers/${id}/feature`),
}
