import { API_URL } from '../config'

export async function getClientes() {
  const response = await fetch(`${API_URL}/clientes`)

  if (!response.ok) {
    throw new Error('Error al obtener los clientes')
  }

  return await response.json()
}

export async function createCliente(data) {
  const response = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

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
  const response = await fetch(`${API_URL}/clientes/${id}`)

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
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

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
    method: 'DELETE'
  })

  if (response.status === 404) {
    throw new Error('Cliente no encontrado')
  }

  if (!response.ok) {
    throw new Error('Error al eliminar el cliente')
  }

  return true
}
