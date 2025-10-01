import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { PrivacyModal } from '../privacy-modal'

// Mock Radix UI Dialog components
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ open, onOpenChange, children }: any) => (
    open ? <div data-testid="dialog">{children}</div> : null
  ),
  DialogContent: ({ children, className }: any) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children, className }: any) => (
    <h2 data-testid="dialog-title" className={className}>
      {children}
    </h2>
  ),
  DialogFooter: ({ children }: any) => (
    <div data-testid="dialog-footer">{children}</div>
  ),
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, className }: any) => (
    <button
      onClick={onClick}
      data-variant={variant}
      className={className}
      data-testid="close-button"
    >
      {children}
    </button>
  ),
}))

vi.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children, className }: any) => (
    <div data-testid="scroll-area" className={className}>
      {children}
    </div>
  ),
}))

describe('PrivacyModal', () => {
  describe('Rendering', () => {
    it('should not render when open is false', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={false} onOpenChange={onOpenChange} />)

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()
    })

    it('should render when open is true', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByTestId('dialog')).toBeInTheDocument()
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })

    it('should render the title correctly', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const title = screen.getByTestId('dialog-title')
      expect(title).toHaveTextContent('Política de Privacidad y Protección de Datos')
    })

    it('should render close button in footer', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const footer = screen.getByTestId('dialog-footer')
      const closeButton = within(footer).getByTestId('close-button')

      expect(closeButton).toHaveTextContent('Cerrar')
    })

    it('should apply correct responsive classes to content', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('dialog-content')
      expect(content).toHaveClass('max-h-[85vh]', 'max-w-4xl')
    })
  })

  describe('Main Content Sections', () => {
    it('should render all 12 main sections', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText('1. Introducción')).toBeInTheDocument()
      expect(screen.getByText('2. Responsable del Tratamiento de Datos')).toBeInTheDocument()
      expect(screen.getByText('3. Datos Personales Recopilados')).toBeInTheDocument()
      expect(screen.getByText('4. Finalidad del Tratamiento de Datos')).toBeInTheDocument()
      expect(screen.getByText('5. Base Legal del Tratamiento')).toBeInTheDocument()
      expect(screen.getByText('6. Período de Conservación de Datos')).toBeInTheDocument()
      expect(screen.getByText('7. Compartición de Datos con Terceros')).toBeInTheDocument()
      expect(screen.getByText('8. Derechos del Usuario (RGPD)')).toBeInTheDocument()
      expect(screen.getByText('9. Medidas de Seguridad')).toBeInTheDocument()
      expect(screen.getByText('10. Política de Cookies')).toBeInTheDocument()
      expect(screen.getByText('11. Cambios en esta Política de Privacidad')).toBeInTheDocument()
      expect(screen.getByText('12. Información de Contacto')).toBeInTheDocument()
    })

    it('should render introduction content', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/nos comprometemos a proteger su privacidad/i)).toBeInTheDocument()
      expect(screen.getByText(/Reglamento \(UE\) 2016\/679/i)).toBeInTheDocument()
    })

    it('should render data controller information', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getAllByText('LexIA Technologies S.L.').length).toBeGreaterThan(0)
      expect(screen.getAllByText(/B-12345678/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/privacidad@lexia.es/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/dpo@lexia.es/i).length).toBeGreaterThan(0)
    })
  })

  describe('GDPR Compliance Content', () => {
    it('should render all GDPR rights', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/8.1. Derecho de Acceso/i)).toBeInTheDocument()
      expect(screen.getByText(/8.2. Derecho de Rectificación/i)).toBeInTheDocument()
      expect(screen.getByText(/8.3. Derecho de Supresión/i)).toBeInTheDocument()
      expect(screen.getByText(/8.4. Derecho a la Limitación del Tratamiento/i)).toBeInTheDocument()
      expect(screen.getByText(/8.5. Derecho a la Portabilidad/i)).toBeInTheDocument()
      expect(screen.getByText(/8.6. Derecho de Oposición/i)).toBeInTheDocument()
      expect(screen.getByText(/8.7. Derecho a No Ser Objeto de Decisiones Automatizadas/i)).toBeInTheDocument()
      expect(screen.getByText(/8.8. Derecho a Retirar el Consentimiento/i)).toBeInTheDocument()
    })

    it('should include AEPD contact information', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/Agencia Española de Protección de Datos/i)).toBeInTheDocument()
      expect(screen.getByText(/www.aepd.es/i)).toBeInTheDocument()
      expect(screen.getByText(/C\/ Jorge Juan, 6, 28001 Madrid/i)).toBeInTheDocument()
    })

    it('should mention legal bases for data processing', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/5.1. Ejecución de un Contrato/i)).toBeInTheDocument()
      expect(screen.getByText(/5.2. Consentimiento/i)).toBeInTheDocument()
      expect(screen.getByText(/5.3. Interés Legítimo/i)).toBeInTheDocument()
      expect(screen.getByText(/5.4. Cumplimiento de Obligaciones Legales/i)).toBeInTheDocument()
    })
  })

  describe('Data Categories', () => {
    it('should list registration and authentication data', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/3.1. Datos de Registro y Autenticación/i)).toBeInTheDocument()
      expect(screen.getAllByText(/Nombre y apellidos/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Dirección de correo electrónico/i).length).toBeGreaterThan(0)
      expect(screen.getByText(/Contraseña \(almacenada de forma cifrada\)/i)).toBeInTheDocument()
    })

    it('should list usage data', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/3.2. Datos de Uso del Servicio/i)).toBeInTheDocument()
      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Historial de conversaciones')
      expect(content).toContain('Número de tokens procesados')
    })

    it('should list technical and navigation data', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/3.3. Datos Técnicos y de Navegación/i)).toBeInTheDocument()
      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Dirección IP')
      expect(content).toContain('anonimizada tras 48 horas')
    })

    it('should list third-party authentication data', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/3.4. Datos de Terceros/i)).toBeInTheDocument()
      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Google')
      expect(content).toContain('Microsoft')
    })
  })

  describe('Third-Party Services', () => {
    it('should mention OpenAI as data processor', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('OpenAI')
      expect(content).toContain('GPT-4')
      expect(content).toContain('openai.com/privacy')
    })

    it('should mention Clerk for authentication', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Clerk')
      expect(content).toContain('clerk.com/privacy')
    })

    it('should include information about international transfers', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Transferencias Internacionales')
      expect(content).toContain('Espacio Económico Europeo')
      expect(content).toContain('Cláusulas Contractuales Tipo')
    })
  })

  describe('Data Retention', () => {
    it('should specify retention periods', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Historial de Conversaciones')
      expect(content).toContain('3 años desde la última actividad')
      expect(content).toContain('6 años conforme a las obligaciones fiscales')
    })

    it('should mention account deletion timeframe', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Tras Eliminación de Cuenta')
      expect(content).toContain('30 días desde la solicitud')
    })
  })

  describe('Security Measures', () => {
    it('should list technical security measures', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Medidas Técnicas')
      expect(content).toContain('Cifrado SSL/TLS')
      expect(content).toContain('Cifrado AES-256')
      expect(content).toContain('Hashing bcrypt')
      expect(content).toContain('Autenticación multifactor')
    })

    it('should list organizational security measures', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Medidas Organizativas')
      expect(content).toContain('Acuerdos de confidencialidad con todos los empleados')
      expect(content).toContain('ISO 27001')
    })

    it('should mention breach notification policy', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Notificación de Brechas de Seguridad')
      expect(content).toContain('72 horas')
    })
  })

  describe('Cookie Policy', () => {
    it('should categorize cookies', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Cookies Estrictamente Necesarias')
      expect(content).toContain('Cookies de Funcionalidad')
      expect(content).toContain('Cookies Analíticas')
    })

    it('should list specific cookies', () => {
      const onOpenChange = vi.fn()
      const { container } = render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = container.textContent || ''
      expect(content).toContain('__session')
      expect(content).toContain('clerk_session')
      expect(content).toContain('_ga')
    })

    it('should mention cookie management options', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/Gestión de Cookies/i)).toBeInTheDocument()
      expect(screen.getByText(/configuración de su navegador/i)).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should call onOpenChange with false when close button is clicked', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const closeButton = screen.getByTestId('close-button')
      fireEvent.click(closeButton)

      expect(onOpenChange).toHaveBeenCalledWith(false)
      expect(onOpenChange).toHaveBeenCalledTimes(1)
    })

    it('should not call onOpenChange when content is clicked', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const scrollArea = screen.getByTestId('scroll-area')
      fireEvent.click(scrollArea)

      expect(onOpenChange).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have semantic heading hierarchy', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const title = screen.getByTestId('dialog-title')
      expect(title.tagName).toBe('H2')
    })

    it('should have proper text styling for readability', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const title = screen.getByTestId('dialog-title')
      expect(title).toHaveClass('text-lg', 'font-semibold')
    })

    it('should render scrollable area for long content', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const scrollArea = screen.getByTestId('scroll-area')
      expect(scrollArea).toBeInTheDocument()
      expect(scrollArea).toHaveClass('h-[calc(85vh-8rem)]')
    })
  })

  describe('Structure and Styling', () => {
    it('should organize content in sections with proper spacing', () => {
      const onOpenChange = vi.fn()
      const { container } = render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
    })

    it('should render lists for structured content', () => {
      const onOpenChange = vi.fn()
      const { container } = render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const lists = container.querySelectorAll('ul')
      expect(lists.length).toBeGreaterThan(0)
    })

    it('should apply consistent text sizing', () => {
      const onOpenChange = vi.fn()
      const { container } = render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const scrollArea = screen.getByTestId('scroll-area')
      const content = scrollArea.querySelector('.space-y-6.text-sm')
      expect(content).toBeInTheDocument()
    })

    it('should have responsive button styling', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const closeButton = screen.getByTestId('close-button')
      expect(closeButton).toHaveClass('w-full', 'sm:w-auto')
    })
  })

  describe('Legal Compliance Footer', () => {
    it('should render last update date and version', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/Última actualización: 1 de octubre de 2025/i)).toBeInTheDocument()
      expect(screen.getByText(/Versión: 1.0/i)).toBeInTheDocument()
    })

    it('should list compliance with regulations', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/RGPD \(UE\) 2016\/679/i)).toBeInTheDocument()
      expect(screen.getByText(/LOPDGDD 3\/2018/i)).toBeInTheDocument()
      expect(screen.getByText(/LSSI-CE 34\/2002/i)).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('should update when open prop changes', () => {
      const onOpenChange = vi.fn()
      const { rerender } = render(<PrivacyModal open={false} onOpenChange={onOpenChange} />)

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()

      rerender(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByTestId('dialog')).toBeInTheDocument()
    })

    it('should work with different onOpenChange callbacks', () => {
      const onOpenChange1 = vi.fn()
      const { rerender } = render(<PrivacyModal open={true} onOpenChange={onOpenChange1} />)

      fireEvent.click(screen.getByTestId('close-button'))
      expect(onOpenChange1).toHaveBeenCalledWith(false)

      const onOpenChange2 = vi.fn()
      rerender(<PrivacyModal open={true} onOpenChange={onOpenChange2} />)

      fireEvent.click(screen.getByTestId('close-button'))
      expect(onOpenChange2).toHaveBeenCalledWith(false)
    })
  })

  describe('Content Completeness', () => {
    it('should include data processing purposes', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/4.1. Prestación del Servicio/i)).toBeInTheDocument()
      expect(screen.getByText(/4.2. Mejora y Desarrollo del Servicio/i)).toBeInTheDocument()
      expect(screen.getByText(/4.3. Comunicaciones/i)).toBeInTheDocument()
      expect(screen.getByText(/4.4. Seguridad y Cumplimiento Legal/i)).toBeInTheDocument()
    })

    it('should mention how to exercise data rights', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/Cómo Ejercer Sus Derechos/i)).toBeInTheDocument()
      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('30 días')
    })

    it('should include DPO contact information', () => {
      const onOpenChange = vi.fn()
      render(<PrivacyModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('Delegado de Protección de Datos')
      expect(content).toContain('Responsable de Protección de Datos')
    })
  })
})
