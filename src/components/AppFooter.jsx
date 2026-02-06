import Container from 'react-bootstrap/Container'

export default function AppFooter() {
  return (
    <footer className="bg-dark p-3">
      <Container className="text-center">
        <nav className="d-flex justify-content-evenly">
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="bi bi-facebook fs-3"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="bi bi-twitter fs-3"></i></a>
          <a href="https://github.com" target="_blank" rel="noreferrer"><i className="bi bi-github fs-3"></i></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer"><i className="bi bi-youtube fs-3"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="bi bi-instagram fs-3"></i></a>
          <a href="https://m.me/user" target="_blank" rel="noreferrer"><i className="bi bi-messenger fs-3"></i></a>
          <a href="https://api.whatsapp.com/send?phone=+1234567890" target="_blank" rel="noreferrer"><i className="bi bi-whatsapp fs-3"></i></a>
        </nav>

        <small className="text-white">
          &copy; 2026 @sulbaranjc. Integración Continua (CI) y Entrega/Despliegue Continuo (CD). Hecho con fines educativos.
        </small>
      </Container>
    </footer>
  )
}
