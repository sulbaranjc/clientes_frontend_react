import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Componente reutilizable para mostrar módulos en el dashboard
 * @param {string} title - Título del módulo
 * @param {string} icon - Clase del icono Bootstrap Icons (ej: 'bi-people-fill')
 * @param {string} description - Descripción del módulo
 * @param {string} link - Ruta a la que navegar (opcional)
 * @param {boolean} active - Si el módulo está activo o deshabilitado
 * @param {string} iconColor - Color del icono (default: 'primary' para activos, 'secondary' para inactivos)
 */
const ModuleCard = ({ 
  title, 
  icon, 
  description, 
  link, 
  active = true,
  iconColor 
}) => {
  // Determinar color del icono
  const finalIconColor = iconColor || (active ? 'primary' : 'secondary')
  
  // Contenido de la card
  const cardContent = (
    <div className="card-body text-center p-5">
      <div className="mb-4">
        <i className={`${icon} text-${finalIconColor}`} style={{ fontSize: '4rem' }}></i>
      </div>
      <h3 className="card-title mb-3">{title}</h3>
      <p className="card-text text-muted">{description}</p>
      <div className="mt-4">
        {active ? (
          <span className="btn btn-primary">
            <i className="bi bi-arrow-right-circle me-2"></i>
            Acceder
          </span>
        ) : (
          <span className="btn btn-secondary disabled">
            <i className="bi bi-lock-fill me-2"></i>
            Próximamente
          </span>
        )}
      </div>
    </div>
  )

  // Si está activo, envolver en Link
  if (active && link) {
    return (
      <div className="col-md-6 col-lg-4">
        <Link to={link} className="text-decoration-none">
          <div className="card h-100 shadow-sm hover-card">
            {cardContent}
          </div>
        </Link>
      </div>
    )
  }

  // Si está inactivo, mostrar sin link
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
        {cardContent}
      </div>
    </div>
  )
}

export default ModuleCard
