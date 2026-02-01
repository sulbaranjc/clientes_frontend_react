import React from 'react'
import { useChangePassword } from '../hooks/useChangePassword'

const ChangePasswordPage = () => {
  const {
    formData,
    errors,
    isLoading,
    success,
    countdown,
    handleChange,
    handleSubmit,
    resetForm,
    handleGoHome
  } = useChangePassword()

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="fas fa-key me-2"></i>
                Cambiar Contraseña
              </h4>
            </div>
            
            <div className="card-body">
              {/* Mensaje de éxito */}
              {success && (
                <div className="alert alert-success text-center" role="alert">
                  <div className="mb-3">
                    <i className="fas fa-check-circle fa-3x text-success mb-2"></i>
                    <h4 className="alert-heading">¡Éxito!</h4>
                    <p className="mb-0">¡Contraseña actualizada exitosamente!</p>
                  </div>
                  
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-3">
                    <button 
                      type="button"
                      className="btn btn-primary me-md-2"
                      onClick={handleGoHome}
                    >
                      <i className="fas fa-home me-2"></i>
                      Volver al Inicio
                    </button>
                    <button 
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={resetForm}
                    >
                      <i className="fas fa-key me-2"></i>
                      Cambiar otra vez
                    </button>
                  </div>
                  
                  <div className="border-top pt-2">
                    <small className="text-muted">
                      <i className="fas fa-clock me-1"></i>
                      Redirección automática en <strong>{countdown}</strong> segundo{countdown !== 1 ? 's' : ''}
                    </small>
                  </div>
                </div>
              )}

              {/* Error general */}
              {errors.general && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Contraseña actual */}
                <div className="mb-3">
                  <label htmlFor="passwordActual" className="form-label">
                    <i className="fas fa-lock me-2"></i>
                    Contraseña Actual *
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.passwordActual ? 'is-invalid' : ''}`}
                    id="passwordActual"
                    name="passwordActual"
                    value={formData.passwordActual}
                    onChange={handleChange}
                    placeholder="Ingrese su contraseña actual"
                    disabled={isLoading}
                  />
                  {errors.passwordActual && (
                    <div className="invalid-feedback">
                      {errors.passwordActual}
                    </div>
                  )}
                </div>

                {/* Nueva contraseña */}
                <div className="mb-3">
                  <label htmlFor="passwordNueva" className="form-label">
                    <i className="fas fa-key me-2"></i>
                    Nueva Contraseña *
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.passwordNueva ? 'is-invalid' : ''}`}
                    id="passwordNueva"
                    name="passwordNueva"
                    value={formData.passwordNueva}
                    onChange={handleChange}
                    placeholder="Ingrese la nueva contraseña (mín. 6 caracteres)"
                    disabled={isLoading}
                    minLength="6"
                  />
                  {errors.passwordNueva && (
                    <div className="invalid-feedback">
                      {errors.passwordNueva}
                    </div>
                  )}
                  <div className="form-text">
                    La contraseña debe tener al menos 6 caracteres
                  </div>
                </div>

                {/* Confirmación de contraseña */}
                <div className="mb-4">
                  <label htmlFor="passwordConfirmacion" className="form-label">
                    <i className="fas fa-shield-alt me-2"></i>
                    Confirmar Nueva Contraseña *
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.passwordConfirmacion ? 'is-invalid' : ''}`}
                    id="passwordConfirmacion"
                    name="passwordConfirmacion"
                    value={formData.passwordConfirmacion}
                    onChange={handleChange}
                    placeholder="Confirme la nueva contraseña"
                    disabled={isLoading}
                  />
                  {errors.passwordConfirmacion && (
                    <div className="invalid-feedback">
                      {errors.passwordConfirmacion}
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleGoHome}
                    disabled={isLoading}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancelar
                  </button>

                  <div className="d-grid gap-2 d-md-flex">
                    <button
                      type="button"
                      className="btn btn-secondary me-md-2"
                      onClick={resetForm}
                      disabled={isLoading}
                    >
                      <i className="fas fa-undo me-2"></i>
                      Limpiar
                    </button>
                    
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Cambiando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Cambiar Contraseña
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Información de seguridad */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="text-muted mb-2">
                  <i className="fas fa-info-circle me-2"></i>
                  Recomendaciones de Seguridad:
                </h6>
                <ul className="list-unstyled small text-muted mb-0">
                  <li><i className="fas fa-check text-success me-2"></i>Use una contraseña única y segura</li>
                  <li><i className="fas fa-check text-success me-2"></i>Incluya números, letras y símbolos</li>
                  <li><i className="fas fa-check text-success me-2"></i>No comparta su contraseña con nadie</li>
                  <li><i className="fas fa-check text-success me-2"></i>Cambie su contraseña regularmente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage