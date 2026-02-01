export const API_URL = 'http://127.0.0.1:8000'
export const API_TIMEOUT = 5000

// Configuración de autenticación
export const AUTH_CONFIG = {
  tokenKey: 'jwt_token',
  userKey: 'user_data',
  loginEndpoint: '/auth/login',
  changePasswordEndpoint: '/auth/cambiar-password',
  tokenType: 'Bearer'
}