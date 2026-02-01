import { API_URL } from '../config'
import { authService } from './authService'

/**
 * Maneja errores de autenticación en las respuestas de la API
 */
function handleAuthError(response) {
  if (response.status === 401) {
    // Token expirado o inválido
    authService.logout()
    window.location.href = '/login'
    throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.')
  }
}

export async function getClientes() {
  const response = await fetch(`${API_URL}/clientes`, {
    headers: authService.getAuthHeaders()
  })

  handleAuthError(response)

  if (!response.ok) {
    throw new Error('Error al obtener los clientes')
  }

  return await response.json()
}

export async function createCliente(data) {
  const response = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: authService.getAuthHeaders(),
    body: JSON.stringify(data)
  })

  handleAuthError(response)

  if (response.status === 409) {
    throw new Error('Ya existe un cliente con ese email')
  }

  if (response.status === 422) {
    const errorData = await response.json()
    throw errorData
  }

  if (!response.ok) {
    throw new Error('Error al crear el cliente')
  }

  return await response.json()
}

/* comentario */

export async function getClienteById(id) {
  const response = await fetch(`${API_URL}/clientes/${id}`, {
    headers: authService.getAuthHeaders()
  })

  handleAuthError(response)

  if (response.status === 404) {
    throw new Error('Cliente no encontrado')
  }

  if (!response.ok) {
    throw new Error('Error al obtener el cliente')
  }

  return await response.json()
}

export async function updateCliente(id, data) {
  const response = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: authService.getAuthHeaders(),
    body: JSON.stringify(data)
  })

  handleAuthError(response)

  if (response.status === 404) {
    throw new Error('Cliente no encontrado')
  }

  if (response.status === 409) {
    throw new Error('Ya existe otro cliente con ese email')
  }

  if (response.status === 422) {
    const errorData = await response.json()
    throw errorData
  }

  if (!response.ok) {
    throw new Error('Error al actualizar el cliente')
  }

  return await response.json()
}


export async function deleteCliente(id) {
  const response = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'DELETE',
    headers: authService.getAuthHeaders()
  })

  handleAuthError(response)

  if (response.status === 404) {
    throw new Error('Cliente no encontrado')
  }

  if (!response.ok) {
    throw new Error('Error al eliminar el cliente')
  }

  return true
}
