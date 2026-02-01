import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

/**
 * Hook personalizado para manejar el cambio de contraseña
 */
export const useChangePassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    passwordActual: '',
    passwordNueva: '',
    passwordConfirmacion: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const countdownRef = useRef(null)

  /**
   * Efecto para manejar countdown automático
   */
  useEffect(() => {
    if (success) {
      setCountdown(10)
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownRef.current)
            navigate('/')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
      }
    }
  }, [success, navigate])

  /**
   * Maneja los cambios en los inputs del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error específico cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    // Limpiar mensaje de éxito
    if (success) {
      setSuccess(false)
    }
  }

  /**
   * Valida el formulario antes del envío
   */
  const validateForm = () => {
    const newErrors = {}

    if (!formData.passwordActual.trim()) {
      newErrors.passwordActual = 'La contraseña actual es requerida'
    }

    if (!formData.passwordNueva.trim()) {
      newErrors.passwordNueva = 'La nueva contraseña es requerida'
    } else if (formData.passwordNueva.length < 6) {
      newErrors.passwordNueva = 'La nueva contraseña debe tener al menos 6 caracteres'
    }

    if (!formData.passwordConfirmacion.trim()) {
      newErrors.passwordConfirmacion = 'La confirmación de contraseña es requerida'
    } else if (formData.passwordNueva !== formData.passwordConfirmacion) {
      newErrors.passwordConfirmacion = 'Las contraseñas no coinciden'
    }

    if (formData.passwordActual === formData.passwordNueva) {
      newErrors.passwordNueva = 'La nueva contraseña debe ser diferente a la actual'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Envía la solicitud de cambio de contraseña
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      await authService.changePassword(
        formData.passwordActual,
        formData.passwordNueva,
        formData.passwordConfirmacion
      )
      
      setSuccess(true)
      setFormData({
        passwordActual: '',
        passwordNueva: '',
        passwordConfirmacion: ''
      })

    } catch (error) {
      setErrors({
        general: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Resetea el formulario
   */
  const resetForm = () => {
    // Cancelar countdown si existe
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
    }
    
    setFormData({
      passwordActual: '',
      passwordNueva: '',
      passwordConfirmacion: ''
    })
    setErrors({})
    setSuccess(false)
    setCountdown(10)
  }

  /**
   * Navega a la página de inicio
   */
  const handleGoHome = () => {
    // Cancelar countdown
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
    }
    navigate('/')
  }

  return {
    formData,
    errors,
    isLoading,
    success,
    countdown,
    handleChange,
    handleSubmit,
    resetForm,
    handleGoHome
  }
}