import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function ConfirmDeleteModal({
  show,
  onHide,
  onConfirm,
  cliente
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Confirmar eliminación
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          ¿Está seguro que desea eliminar al cliente:
        </p>
        <strong>
          {cliente?.nombre} {cliente?.apellido}
        </strong>
        <p className="mt-2 text-danger">
          Esta acción no se puede deshacer.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <i className="bi bi-trash me-2"></i>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
