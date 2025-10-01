import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { TermsModal } from '../terms-modal'

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

describe('TermsModal', () => {
  describe('Rendering', () => {
    it('should not render when open is false', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={false} onOpenChange={onOpenChange} />)

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()
    })

    it('should render when open is true', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByTestId('dialog')).toBeInTheDocument()
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })

    it('should render the title correctly', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const title = screen.getByTestId('dialog-title')
      expect(title).toHaveTextContent('Términos y Condiciones de Uso')
    })

    it('should render close button in footer', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const footer = screen.getByTestId('dialog-footer')
      const closeButton = within(footer).getByTestId('close-button')

      expect(closeButton).toHaveTextContent('Cerrar')
    })

    it('should apply correct responsive classes to content', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('dialog-content')
      expect(content).toHaveClass('max-h-[85vh]', 'max-w-4xl')
    })
  })

  describe('Content Sections', () => {
    it('should render all 9 main sections', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText('1. Introducción y Aceptación')).toBeInTheDocument()
      expect(screen.getByText('2. Descripción del Servicio')).toBeInTheDocument()
      expect(screen.getByText('3. Uso Aceptable')).toBeInTheDocument()
      expect(screen.getByText('4. Propiedad Intelectual')).toBeInTheDocument()
      expect(screen.getByText('5. Limitación de Responsabilidad')).toBeInTheDocument()
      expect(screen.getByText('6. Privacidad y Datos Personales')).toBeInTheDocument()
      expect(screen.getByText('7. Modificaciones del Servicio y los Términos')).toBeInTheDocument()
      expect(screen.getByText('8. Legislación Aplicable y Jurisdicción')).toBeInTheDocument()
      expect(screen.getByText('9. Contacto')).toBeInTheDocument()
    })

    it('should render introduction section content', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/Bienvenido a LexIA/i)).toBeInTheDocument()
      expect(screen.getByText(/asistente inteligente especializado en legislación española/i)).toBeInTheDocument()
    })

    it('should render service limitations', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/LexIA NO proporciona asesoramiento legal personalizado/i)).toBeInTheDocument()
      expect(screen.getByText(/no debe considerarse como consejo legal específico/i)).toBeInTheDocument()
    })

    it('should render company contact information', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getAllByText('LexIA Technologies S.L.').length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Calle Gran Vía, 45, 28013 Madrid, España/i).length).toBeGreaterThan(0)
      expect(screen.getByText(/Email: legal@lexia.es/i)).toBeInTheDocument()
    })

    it('should render last update date and version', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/Última actualización: 1 de octubre de 2025/i)).toBeInTheDocument()
      expect(screen.getByText(/Versión: 1.0/i)).toBeInTheDocument()
    })
  })

  describe('Legal Content', () => {
    it('should render GDPR compliance information', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/RGPD - UE 2016\/679/i)).toBeInTheDocument()
      expect(screen.getByText(/LOPDGDD/i)).toBeInTheDocument()
    })

    it('should render prohibited uses', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/fines ilegales, fraudulentos o no autorizados/i)).toBeInTheDocument()
      expect(screen.getByText(/contenido ofensivo, difamatorio, discriminatorio/i)).toBeInTheDocument()
    })

    it('should render liability limitations', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/TAL CUAL/i)).toBeInTheDocument()
      expect(screen.getByText(/SEGÚN DISPONIBILIDAD/i)).toBeInTheDocument()
    })

    it('should render intellectual property information', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByText(/derechos de propiedad intelectual/i)).toBeInTheDocument()
      expect(screen.getByText(/propiedad exclusiva de LexIA Technologies S.L./i)).toBeInTheDocument()
    })

    it('should render Spanish jurisdiction information', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('legislación española')
      expect(content).toContain('juzgados y tribunales de Madrid')
    })
  })

  describe('User Interactions', () => {
    it('should call onOpenChange with false when close button is clicked', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const closeButton = screen.getByTestId('close-button')
      fireEvent.click(closeButton)

      expect(onOpenChange).toHaveBeenCalledWith(false)
      expect(onOpenChange).toHaveBeenCalledTimes(1)
    })

    it('should not call onOpenChange when content is clicked', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const scrollArea = screen.getByTestId('scroll-area')
      fireEvent.click(scrollArea)

      expect(onOpenChange).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have semantic heading hierarchy', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const title = screen.getByTestId('dialog-title')
      expect(title.tagName).toBe('H2')
    })

    it('should have proper text styling for readability', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const title = screen.getByTestId('dialog-title')
      expect(title).toHaveClass('text-lg', 'font-semibold')
    })

    it('should render scrollable area for long content', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const scrollArea = screen.getByTestId('scroll-area')
      expect(scrollArea).toBeInTheDocument()
      expect(scrollArea).toHaveClass('h-[calc(85vh-8rem)]')
    })
  })

  describe('Structure and Styling', () => {
    it('should organize content in sections with proper spacing', () => {
      const onOpenChange = vi.fn()
      const { container } = render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
    })

    it('should render lists for structured content', () => {
      const onOpenChange = vi.fn()
      const { container } = render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const lists = container.querySelectorAll('ul')
      expect(lists.length).toBeGreaterThan(0)
    })

    it('should apply consistent text sizing', () => {
      const onOpenChange = vi.fn()
      const { container } = render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const scrollArea = screen.getByTestId('scroll-area')
      const content = scrollArea.querySelector('.space-y-6.text-sm')
      expect(content).toBeInTheDocument()
    })

    it('should have responsive button styling', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const closeButton = screen.getByTestId('close-button')
      expect(closeButton).toHaveClass('w-full', 'sm:w-auto')
    })
  })

  describe('Props Handling', () => {
    it('should update when open prop changes', () => {
      const onOpenChange = vi.fn()
      const { rerender } = render(<TermsModal open={false} onOpenChange={onOpenChange} />)

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()

      rerender(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByTestId('dialog')).toBeInTheDocument()
    })

    it('should work with different onOpenChange callbacks', () => {
      const onOpenChange1 = vi.fn()
      const { rerender } = render(<TermsModal open={true} onOpenChange={onOpenChange1} />)

      fireEvent.click(screen.getByTestId('close-button'))
      expect(onOpenChange1).toHaveBeenCalledWith(false)

      const onOpenChange2 = vi.fn()
      rerender(<TermsModal open={true} onOpenChange={onOpenChange2} />)

      fireEvent.click(screen.getByTestId('close-button'))
      expect(onOpenChange2).toHaveBeenCalledWith(false)
    })
  })

  describe('Content Completeness', () => {
    it('should include all required legal disclaimers', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      // Key disclaimers that should be present
      expect(screen.getByText(/NO proporciona asesoramiento legal personalizado/i)).toBeInTheDocument()
      expect(screen.getByText(/NO establece ninguna relación abogado-cliente/i)).toBeInTheDocument()
      expect(screen.getByText(/NO SE HACE RESPONSABLE/i)).toBeInTheDocument()
    })

    it('should include modification notice', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      const content = screen.getByTestId('scroll-area').textContent || ''
      expect(content).toContain('modificar, suspender o discontinuar')
      expect(content).toContain('uso continuado del Servicio')
    })

    it('should include contact methods', () => {
      const onOpenChange = vi.fn()
      render(<TermsModal open={true} onOpenChange={onOpenChange} />)

      expect(screen.getAllByText(/\+34 910 123 456/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/B-12345678/i).length).toBeGreaterThan(0)
    })
  })
})
