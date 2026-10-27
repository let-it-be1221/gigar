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
              background: '#3D3A33', // warm dark — was slate-800 #1e293b
              color: '#fff',
              padding: '12px 16px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#A8A492', secondary: '#fff' } }, // warm beige-grey — was slate-600 #475569
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
