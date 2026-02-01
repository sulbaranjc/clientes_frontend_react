import { API_URL } from '../config'

// Clave para almacenar el token en localStorage
const TOKEN_KEY = 'jwt_token'
const USER_KEY = 'user_data'

/**
 * Servicio de autenticación para manejo de JWT
 */
export const authService = {
  /**
   * Realiza login con usuario y contraseña
   * @param {string} username 
   * @param {string} password 
   * @returns {Object} Token y datos del usuario
   */
  async login(username, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          username: username,
          password: password
        })
      })

      if (response.status === 401) {
        throw new Error('Usuario o contraseña incorrectos')
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error en el servidor: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      
      // Guardar token y datos del usuario
      this.setToken(data.access_token)
      this.setUser({
        username: username,
        token_type: data.token_type,
        rol: data.rol
      })

      return data

    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar al servidor. Verifique que el backend esté corriendo.')
      }
      throw error
    }
  },

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  /**
   * Obtiene el token almacenado
   * @returns {string|null} Token JWT o null si no existe
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  /**
   * Guarda el token en localStorage
   * @param {string} token Token JWT
   */
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  /**
   * Obtiene los datos del usuario almacenados
   * @returns {Object|null} Datos del usuario o null si no existen
   */
  getUser() {
    const userData = localStorage.getItem(USER_KEY)
    return userData ? JSON.parse(userData) : null
  },

  /**
   * Guarda los datos del usuario
   * @param {Object} user Datos del usuario
   */
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} True si tiene token válido
   */
  isAuthenticated() {
    const token = this.getToken()
    if (!token) return false

    try {
      // Verificar si el token no está expirado
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      
      if (payload.exp && payload.exp < currentTime) {
        // Token expirado, limpiar datos
        this.logout()
        return false
      }
      
      return true
    } catch (error) {
      // Token malformado, limpiar datos
      this.logout()
      return false
    }
  },

  /**
   * Obtiene headers con autorización para requests autenticados
   * @returns {Object} Headers con Authorization
   */
  getAuthHeaders() {
    const token = this.getToken()
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  },

  /**
   * Cambia la contraseña del usuario autenticado
   * @param {string} passwordActual - Contraseña actual
   * @param {string} passwordNueva - Nueva contraseña
   * @param {string} passwordConfirmacion - Confirmación de nueva contraseña
   * @returns {Object} Respuesta del servidor
   */
  async changePassword(passwordActual, passwordNueva, passwordConfirmacion) {
    try {
      const response = await fetch(`${API_URL}/auth/cambiar-password`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          password_actual: passwordActual,
          password_nueva: passwordNueva,
          password_confirmacion: passwordConfirmacion
        })
      })

      if (response.status === 401) {
        throw new Error('Contraseña actual incorrecta')
      }

      if (response.status === 400) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Las nuevas contraseñas no coinciden')
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error en el servidor: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data

    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar al servidor. Verifique que el backend esté corriendo.')
      }
      throw error
    }
  }
}
