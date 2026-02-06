import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Link } from 'react-router-dom'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import { deleteCliente } from '../services/clientesService'


import { getClientes } from '../services/clientesService'

export default function ClientesList() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    async function cargarClientes() {
      try {
        const data = await getClientes()
        setClientes(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    cargarClientes()
  }, [])

  // Función para filtrar clientes basado en el término de búsqueda
  const clientesFiltrados = clientes.filter(cliente => {
    if (!busqueda) return true
    
    const terminoBusqueda = busqueda.toLowerCase()
    
    return (
      (cliente.nombre?.toLowerCase().includes(terminoBusqueda)) ||
      (cliente.apellido?.toLowerCase().includes(terminoBusqueda)) ||
      (cliente.email?.toLowerCase().includes(terminoBusqueda)) ||
      (cliente.telefono?.toLowerCase().includes(terminoBusqueda)) ||
      (cliente.direccion?.toLowerCase().includes(terminoBusqueda))
    )
  })

function abrirModal(cliente) {
  setClienteSeleccionado(cliente)
  setShowModal(true)
}

function cerrarModal() {
  setShowModal(false)
  setClienteSeleccionado(null)
}

async function confirmarEliminacion() {
  try {
    await deleteCliente(clienteSeleccionado.id)
    setClientes(prev =>
      prev.filter(c => c.id !== clienteSeleccionado.id)
    )
  } catch (err) {
    alert(err.message)
  } finally {
    cerrarModal()
  }
}


  return (
    <Container>
      <h1 className="text-center mb-4">Gestión de Clientes</h1>
      <p className="lead text-center mb-5">
        Lista de clientes registrados en el sistema. deploy by xxxxx..
      </p>

      <div className="mb-3">
        <Button as={Link} to="/clientes/nuevo" variant="primary">
          <i className="bi bi-plus-lg me-2"></i>
          Agregar Cliente
        </Button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre, apellido, email, teléfono o dirección..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <Button 
              variant="outline-secondary" 
              onClick={() => setBusqueda('')}
              title="Limpiar búsqueda"
            >
              <i className="bi bi-x-lg"></i>
            </Button>
          )}
        </InputGroup>
        {busqueda && (
          <small className="text-muted mt-2 d-block">
            Mostrando {clientesFiltrados.length} de {clientes.length} cliente(s)
          </small>
        )}
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <div className="card shadow">
          <div className="card-header bg-dark text-white text-center">
            <h2 className="mb-0 py-2">
              <i className="bi bi-people-fill me-2"></i>
              Listado de Clientes
            </h2>
          </div>

          <div className="table-responsive">
            <Table striped hover className="mb-0">
              <thead className="table-secondary">
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.length > 0 ? (
                  clientesFiltrados.map(cliente => (
                    <tr key={cliente.id}>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.apellido}</td>
                      <td>
                        <a
                          href={`mailto:${cliente.email}`}
                          className="text-decoration-none"
                        >
                          <i className="bi bi-envelope me-1"></i>
                          {cliente.email}
                        </a>
                      </td>
                      <td>
                        <i className="bi bi-telephone me-1"></i>
                        {cliente.telefono || '-'}
                      </td>
                      <td>
                        <i className="bi bi-geo-alt me-1"></i>
                        {cliente.direccion || '-'}
                      </td>
                      <td className="text-center">
                        <Button
                          as={Link}
                          to={`/clientes/editar/${cliente.id}`}
                          size="sm"
                          variant="warning"
                          className="me-2"
                          title="Editar cliente"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          title="Eliminar cliente"
                          onClick={() => abrirModal(cliente)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <i className="bi bi-search me-2"></i>
                      No se encontraron clientes que coincidan con "{busqueda}"
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="card-footer text-muted text-center">
            <small>
              Total de clientes: <strong>{clientesFiltrados.length}</strong>
              {busqueda && clientes.length !== clientesFiltrados.length && (
                <span> (de {clientes.length} totales)</span>
              )}
            </small>
          </div>
        </div>
      )}
      <ConfirmDeleteModal
        show={showModal}
        onHide={cerrarModal}
        onConfirm={confirmarEliminacion}
        cliente={clienteSeleccionado}
      />
    </Container>
  )
}
