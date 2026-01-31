import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import { createCliente, updateCliente, getClienteById } from '../services/clientesService'

export default function ClienteFormularioPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: ''
  })

  const [datosOriginales, setDatosOriginales] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: ''
  })

  const [loading, setLoading] = useState(isEditing) // Solo carga si está editando
  const [saving, setSaving] = useState(false)
  const [errores, setErrores] = useState([])

  // Cargar datos del cliente si está editando
  useEffect(() => {
    if (!isEditing) return // Si no está editando, no necesita cargar datos

    async function cargarCliente() {
      try {
        const data = await getClienteById(id)
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
  }, [id, isEditing])

  // Función para detectar si hay cambios (solo para modo edición)
  function hayChangios() {
    if (!isEditing) return true // Siempre hay "cambios" al crear
    return JSON.stringify(formData) !== JSON.stringify(datosOriginales)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    // Validar que haya cambios solo en modo edición
    if (isEditing && !hayChangios()) {
      setErrores(['No hay cambios que guardar'])
      return
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
        await updateCliente(id, clienteDataToSend)
      } else {
        await createCliente(clienteDataToSend)
      }

      navigate('/')
    } catch (err) {
      if (Array.isArray(err.detail)) {
        const mensajes = err.detail.map(e => e.msg)
        setErrores(mensajes)
      } else {
        setErrores([err.message || 'Error desconocido'])
      }
    } finally {
      setSaving(false)
    }
  }

  // Mostrar loading solo al cargar datos para editar
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
        <p className="mt-3">Cargando datos del cliente...</p>
      </div>
    )
  }

  const titulo = isEditing ? 'Editar Cliente' : 'Agregar Nuevo Cliente'
  const descripcion = isEditing 
    ? 'Modifique los datos del cliente y guarde los cambios.'
    : 'Complete el formulario para registrar un nuevo cliente en el sistema.'
  const textoBoton = isEditing ? 'Guardar Cambios' : 'Guardar Cliente'
  const textoBotonCargando = 'Guardando...'
  const varianteBoton = isEditing ? 'success' : 'primary'
  const iconoBoton = isEditing ? 'bi-check-circle' : 'bi-save'

  return (
    <Container>
      <h1 className="text-center mb-4">{titulo}</h1>
      <p className="lead text-center mb-5">{descripcion}</p>

      {errores.length > 0 && (
        <Alert variant="danger">
          <ul className="mb-0">
            {errores.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre *</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido *</Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button 
            type="submit" 
            variant={varianteBoton} 
            disabled={saving || (isEditing && !hayChangios())}
          >
            <i className={`${iconoBoton} me-2`}></i>
            {saving ? textoBotonCargando : textoBoton}
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/')}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  )
}