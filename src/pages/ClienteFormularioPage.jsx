import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import { useClienteForm } from '../hooks/useClienteForm'
import { FORM_CONFIG } from '../constants/formConfig'

export default function ClienteFormularioPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const {
    formData,
    loading,
    saving,
    errores,
    handleChange,
    hayChangios,
    submitForm
  } = useClienteForm(isEditing, id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await submitForm()
    if (success) {
      navigate('/')
    }
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
        <p className="mt-3">Cargando datos del cliente...</p>
      </div>
    )
  }

  const config = isEditing ? FORM_CONFIG.EDIT : FORM_CONFIG.CREATE

  return (
    <Container>
      <h1 className="text-center mb-4">{config.title}</h1>
      <p className="lead text-center mb-5">{config.description}</p>

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
            variant={config.buttonVariant} 
            disabled={saving || (isEditing && !hayChangios())}
          >
            <i className={`${config.icon} me-2`}></i>
            {saving ? 'Guardando...' : config.buttonText}
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