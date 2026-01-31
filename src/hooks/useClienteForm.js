import { useState, useEffect } from 'react'
import { getClienteById, createCliente, updateCliente } from '../services/clientesService'

const INITIAL_FORM_DATA = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: ''
}

export function useClienteForm(isEditing, clienteId) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [datosOriginales, setDatosOriginales] = useState(INITIAL_FORM_DATA)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [errores, setErrores] = useState([])

  // Cargar datos del cliente si está editando
  useEffect(() => {
    if (!isEditing) return

    async function cargarCliente() {
      try {
        const data = await getClienteById(clienteId)
        const datosCliente = {
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          telefono: data.telefono || '',
          direccion: data.direccion || ''
        }
        setFormData(datosCliente)
        setDatosOriginales(datosCliente)
      } catch (err) {
        setErrores([err.message])
      } finally {
        setLoading(false)
      }
    }

    cargarCliente()
  }, [clienteId, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const hayChangios = () => {
    if (!isEditing) return true
    return JSON.stringify(formData) !== JSON.stringify(datosOriginales)
  }

  const submitForm = async () => {
    if (isEditing && !hayChangios()) {
      setErrores(['No hay cambios que guardar'])
      return false
    }
    
    setErrores([])
    setSaving(true)

    try {
      const clienteDataToSend = {
        ...formData,
        telefono: formData.telefono || null,
        direccion: formData.direccion || null
      }

      if (isEditing) {
        await updateCliente(clienteId, clienteDataToSend)
      } else {
        await createCliente(clienteDataToSend)
      }

      return true
    } catch (err) {
      if (Array.isArray(err.detail)) {
        const mensajes = err.detail.map(e => e.msg)
        setErrores(mensajes)
      } else {
        setErrores([err.message || 'Error desconocido'])
      }
      return false
    } finally {
      setSaving(false)
    }
  }

  return {
    formData,
    loading,
    saving,
    errores,
    handleChange,
    hayChangios,
    submitForm
  }
}