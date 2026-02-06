import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AppNavbar from './components/AppNavbar'
import AppFooter from './components/AppFooter'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ClientesList from './pages/ClientesList'
import ClienteFormularioPage from './pages/ClienteFormularioPage'
import ChangePasswordPage from './pages/ChangePasswordPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <AppNavbar />

          <main className="flex-fill pt-5 bg-gradient-blue-green">
            <Routes>
              {/* Ruta de login - accesible sin autenticación */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Rutas protegidas - requieren autenticación */}
              <Route path="/" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              
              <Route path="/clientes" element={
                <ProtectedRoute>
                  <ClientesList />
                </ProtectedRoute>
              } />
              
              <Route path="/clientes/nuevo" element={
                <ProtectedRoute>
                  <ClienteFormularioPage />
                </ProtectedRoute>
              } />
              
              <Route path="/clientes/editar/:id" element={
                <ProtectedRoute>
                  <ClienteFormularioPage />
                </ProtectedRoute>
              } />
              
              <Route path="/change-password" element={
                <ProtectedRoute>
                  <ChangePasswordPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>

          <AppFooter />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
