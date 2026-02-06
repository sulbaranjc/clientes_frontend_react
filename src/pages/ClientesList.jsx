import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import { deleteCliente } from '../services/clientesService'
import { usePermissions } from '../hooks/usePermissions'


import { getClientes } from '../services/clientesService'

export default function ClientesList() {
  const { canCreate, canEdit, canDelete } = usePermissions()
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const registrosPorPagina = 10

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

  // Lógica de paginación
  const totalPaginas = Math.ceil(clientesFiltrados.length / registrosPorPagina)
  const indiceInicio = (paginaActual - 1) * registrosPorPagina
  const indiceFin = indiceInicio + registrosPorPagina
  const clientesPaginados = clientesFiltrados.slice(indiceInicio, indiceFin)

  // Resetear a página 1 cuando cambia la búsqueda
  useEffect(() => {
    setPaginaActual(1)
  }, [busqueda])

  // Función para cambiar de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
        Lista de clientes registrados en el sistema. deploy by git-hub actions CCCJJJJJ..
      </p>

      <div className="mb-3" style={{ minHeight: '38px' }}>
        {canCreate && (
          <Button 
            as={Link} 
            to="/clientes/nuevo" 
            variant="primary"
            title="Crear nuevo cliente"
          >
            <i className="bi bi-plus-lg me-2"></i>
            Agregar Cliente
          </Button>
        )}
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
        {clientesFiltrados.length > 0 && (
          <small className="text-muted mt-2 d-block">
            Mostrando {indiceInicio + 1}-{Math.min(indiceFin, clientesFiltrados.length)} de {clientesFiltrados.length} cliente(s)
            {busqueda && clientes.length !== clientesFiltrados.length && (
              <span> (filtrado de {clientes.length} totales)</span>
            )}
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
                {clientesPaginados.length > 0 ? (
                  clientesPaginados.map(cliente => (
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
                      <td className="text-center" style={{ minWidth: '100px' }}>
                        {canEdit && (
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
                        )}

                        {canDelete && (
                          <Button
                            size="sm"
                            variant="danger"
                            title="Eliminar cliente"
                            onClick={() => abrirModal(cliente)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        )}
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

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="card-footer">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Página {paginaActual} de {totalPaginas}
                </small>
                
                <Pagination className="mb-0">
                  <Pagination.First 
                    onClick={() => cambiarPagina(1)} 
                    disabled={paginaActual === 1}
                  />
                  <Pagination.Prev 
                    onClick={() => cambiarPagina(paginaActual - 1)} 
                    disabled={paginaActual === 1}
                  />
                  
                  {[...Array(totalPaginas)].map((_, index) => {
                    const numeroPagina = index + 1
                    // Mostrar solo 5 páginas alrededor de la actual
                    if (
                      numeroPagina === 1 ||
                      numeroPagina === totalPaginas ||
                      (numeroPagina >= paginaActual - 2 && numeroPagina <= paginaActual + 2)
                    ) {
                      return (
                        <Pagination.Item
                          key={numeroPagina}
                          active={numeroPagina === paginaActual}
                          onClick={() => cambiarPagina(numeroPagina)}
                        >
                          {numeroPagina}
                        </Pagination.Item>
                      )
                    } else if (
                      numeroPagina === paginaActual - 3 ||
                      numeroPagina === paginaActual + 3
                    ) {
                      return <Pagination.Ellipsis key={numeroPagina} disabled />
                    }
                    return null
                  })}
                  
                  <Pagination.Next 
                    onClick={() => cambiarPagina(paginaActual + 1)} 
                    disabled={paginaActual === totalPaginas}
                  />
                  <Pagination.Last 
                    onClick={() => cambiarPagina(totalPaginas)} 
                    disabled={paginaActual === totalPaginas}
                  />
                </Pagination>

                <small className="text-muted">
                  Total: <strong>{clientesFiltrados.length}</strong> cliente(s)
                </small>
              </div>
            </div>
          )}
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
