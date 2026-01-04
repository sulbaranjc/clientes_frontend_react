import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../assets/img/logo_jc.svg'
import { Link } from 'react-router-dom'

export default function AppNavbar() {
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

            <NavDropdown title="Más" id="nav-mas">
              <NavDropdown.Item href="#">Opciones</NavDropdown.Item>
              <NavDropdown.Item href="#">Más Opciones</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#">Opciones</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
