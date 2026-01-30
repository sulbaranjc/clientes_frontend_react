import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import { getClienteById, updateCliente } from '../services/clientesService'

export default function ClienteEditar() {
  const { id } = useParams()
  const navigate = useNavigate()

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

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errores, setErrores] = useState([])

  useEffect(() => {
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
  }, [id])

  // Función para detectar si hay cambios
  function hayChangios() {
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
    
    // Validar que haya cambios
    if (!hayChangios()) {
      setErrores(['No hay cambios que guardar'])
      return
    }
    
    setErrores([])
    setSaving(true)

    try {
      await updateCliente(id, {
        ...formData,
        telefono: formData.telefono || null,
        direccion: formData.direccion || null
      })

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

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <Container>
      <h1 className="text-center mb-4">Editar Cliente</h1>
      <p className="lead text-center mb-5">
        Modifique los datos del cliente y guarde los cambios.
      </p>

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
            variant="success" 
            disabled={saving || !hayChangios()}
          >
            <i className="bi bi-check-circle me-2"></i>
            {saving ? 'Guardando...' : 'Guardar Cambios'}
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
