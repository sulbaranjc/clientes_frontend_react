import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
  const { user } = useAuth()

  return (
    <div className="container mt-5">
      {/* Header de bienvenida */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 mb-3">
            <i className="bi bi-house-door me-3"></i>
            Bienvenido{user?.username ? `, ${user.username}` : ''}
          </h1>
          <p className="lead text-muted">
            Seleccione un módulo para comenzar
          </p>
        </div>
      </div>

      {/* Cards de módulos */}
      <div className="row g-4 justify-content-center">
        {/* Módulo de Clientes */}
        <div className="col-md-6 col-lg-4">
          <Link to="/clientes" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center p-5">
                <div className="mb-4">
                  <i className="bi bi-people-fill text-primary" style={{ fontSize: '4rem' }}></i>
                </div>
                <h3 className="card-title mb-3">Clientes</h3>
                <p className="card-text text-muted">
                  Gestión completa de clientes: crear, editar, eliminar y filtrar
                </p>
                <div className="mt-4">
                  <span className="btn btn-primary">
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    Acceder
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Módulo futuro - Ejemplo */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <i className="bi bi-gear-fill text-secondary" style={{ fontSize: '4rem' }}></i>
              </div>
              <h3 className="card-title mb-3">Configuración</h3>
              <p className="card-text text-muted">
                Módulo en desarrollo
              </p>
              <div className="mt-4">
                <span className="btn btn-secondary disabled">
                  <i className="bi bi-lock-fill me-2"></i>
                  Próximamente
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Módulo futuro - Ejemplo */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <i className="bi bi-graph-up text-secondary" style={{ fontSize: '4rem' }}></i>
              </div>
              <h3 className="card-title mb-3">Reportes</h3>
              <p className="card-text text-muted">
                Módulo en desarrollo
              </p>
              <div className="mt-4">
                <span className="btn btn-secondary disabled">
                  <i className="bi bi-lock-fill me-2"></i>
                  Próximamente
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="alert alert-info text-center">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Tip:</strong> Utilice el menú de navegación superior para acceder rápidamente a los diferentes módulos
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
