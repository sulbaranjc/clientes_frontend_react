import { API_URL } from '../config'

export async function getClientes() {
  const response = await fetch(`${API_URL}/clientes`)

  if (!response.ok) {
    throw new Error('Error al obtener los clientes')
  }

  return await response.json()
}
