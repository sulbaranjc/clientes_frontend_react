import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom'

export default function ClienteEditar() {
  const { id } = useParams()

  return (
    <Container>
      <h1 className="text-center mb-4">Editar Cliente</h1>
      <div className="text-center text-white-50">
        Editando ID: {id} (Paso 4: GET /clientes/{id} + PUT)
      </div>
    </Container>
  )
}
