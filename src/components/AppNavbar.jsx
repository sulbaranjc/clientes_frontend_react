import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import logo from '../assets/img/logo_jc.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AppNavbar() {
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    // Opcional: redirigir al login después del logout
    // navigate('/login')
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className="logo" src={logo} alt="logo_jc_dark" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNavDropdown" className="border-0" />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="ms-lg-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>

            {isAuthenticated ? (
              <>
                <NavDropdown title="Clientes" id="nav-clientes">
                  <NavDropdown.Item as={Link} to="/clientes">
                    <i className="bi bi-list me-2"></i>
                    Ver Todos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/clientes/nuevo">
                    <i className="bi bi-plus-circle me-2"></i>
                    Nuevo Cliente
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown 
                  title={
                    <span>
                      <i className="bi bi-person-circle me-2"></i>
                      {user?.username || 'Usuario'}
                    </span>
                  } 
                  id="nav-usuario"
                >
                  <NavDropdown.Item disabled>
                    <Badge bg="success" className="me-2">Conectado</Badge>
                    {user?.username}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/change-password">
                    <i className="bi bi-key me-2"></i>
                    Cambiar Contraseña
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Iniciar Sesión
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
