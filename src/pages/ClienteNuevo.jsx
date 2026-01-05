import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'

import { createCliente } from '../services/clientesService'

export default function ClienteNuevo() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: ''
  })

  const [errores, setErrores] = useState([])
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrores([])
    setLoading(true)

    try {
      await createCliente({
        ...formData,
        telefono: formData.telefono || null,
        direccion: formData.direccion || null
      })

      navigate('/')
    } catch (err) {
      if (Array.isArray(err.detail)) {
        // Errores 422 de Pydantic
        const mensajes = err.detail.map(e => e.msg)
        setErrores(mensajes)
      } else {
        setErrores([err.message || 'Error desconocido'])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <h1 className="text-center mb-4">Agregar Nuevo Cliente</h1>
      <p className="lead text-center mb-5">
        Complete el formulario para registrar un nuevo cliente en el sistema.
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
          <Button type="submit" variant="primary" disabled={loading}>
            <i className="bi bi-save me-2"></i>
            {loading ? 'Guardando...' : 'Guardar Cliente'}
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
