import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import AppFooter from './components/AppFooter'

import ClientesList from './pages/ClientesList'
import ClienteFormularioPage from './pages/ClienteFormularioPage'

export default function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <main className="pt-5 bg-gradient-blue-green">
        <Routes>
          <Route path="/" element={<ClientesList />} />
          <Route path="/clientes/nuevo" element={<ClienteFormularioPage />} />
          <Route path="/clientes/editar/:id" element={<ClienteFormularioPage />} />
        </Routes>
      </main>

      <AppFooter />
    </BrowserRouter>
  )
}
