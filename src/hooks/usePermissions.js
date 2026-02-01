import { useAuth } from '../contexts/AuthContext'

/**
 * Hook personalizado para gestionar permisos basados en el rol del usuario
 * 
 * Roles disponibles:
 * - admin: Permisos completos (crear, editar, eliminar, ver)
 * - lectura: Solo permisos de lectura
 * 
 * @returns {Object} Objeto con permisos booleanos
 */
export const usePermissions = () => {
  const { user } = useAuth()
  
  const isAdmin = user?.rol === 'admin'
  const canCreate = isAdmin
  const canEdit = isAdmin
  const canDelete = isAdmin
  const canView = true // Todos los usuarios autenticados pueden ver
  
  return { 
    isAdmin, 
    canCreate, 
    canEdit, 
    canDelete, 
    canView,
    rol: user?.rol || 'lectura'
  }
}
