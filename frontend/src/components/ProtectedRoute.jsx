import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from './Loader'

export default function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loader fullscreen label="Checking credentials…" />

  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return children
}
