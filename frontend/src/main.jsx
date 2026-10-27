import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: '12px',
              background: '#1e293b', // slate-800 — was #1f2d4a
              color: '#fff',
              padding: '12px 16px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#475569', secondary: '#fff' } }, // slate-600 — was #c8102e
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
