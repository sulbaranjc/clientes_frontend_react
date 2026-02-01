import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import ModuleCard from '../components/ModuleCard'

const HomePage = () => {
  const { user } = useAuth()

  // Configuración de módulos del dashboard
  const modules = [
    {
      title: 'Clientes',
      icon: 'bi bi-people-fill',
      description: 'Gestión completa de clientes: crear, editar, eliminar y filtrar',
      link: '/clientes',
      active: true
    },
    {
      title: 'Configuración',
      icon: 'bi bi-gear-fill',
      description: 'Módulo en desarrollo',
      active: false
    },
    {
      title: 'Reportes',
      icon: 'bi bi-graph-up',
      description: 'Módulo en desarrollo',
      active: false
    }
  ]

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
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            icon={module.icon}
            description={module.description}
            link={module.link}
            active={module.active}
          />
        ))}
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
