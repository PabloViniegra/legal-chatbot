import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DashboardFooter } from '../dashboard-footer'

// Mock the modal components
vi.mock('@/components/legal/terms-modal', () => ({
  TermsModal: ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
    open ? (
      <div data-testid="terms-modal">
        <button onClick={() => onOpenChange(false)}>Close Terms</button>
      </div>
    ) : null
  ),
}))

vi.mock('@/components/legal/privacy-modal', () => ({
  PrivacyModal: ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
    open ? (
      <div data-testid="privacy-modal">
        <button onClick={() => onOpenChange(false)}>Close Privacy</button>
      </div>
    ) : null
  ),
}))

describe('DashboardFooter', () => {
  describe('Rendering', () => {
    it('should render the footer with all elements', () => {
      render(<DashboardFooter />)

      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      expect(screen.getByText('LexIA © 2025')).toBeInTheDocument()
      expect(screen.getByText('Términos y Condiciones')).toBeInTheDocument()
      expect(screen.getByText('Privacidad')).toBeInTheDocument()
    })

    it('should render footer with fixed positioning', () => {
      const { container } = render(<DashboardFooter />)
      const footer = container.querySelector('footer')

      expect(footer).toHaveClass('fixed')
      expect(footer).toHaveClass('bottom-0')
    })

    it('should render buttons with correct accessibility attributes', () => {
      render(<DashboardFooter />)

      const termsButton = screen.getByLabelText('Ver Términos y Condiciones')
      const privacyButton = screen.getByLabelText('Ver Política de Privacidad')

      expect(termsButton).toBeInTheDocument()
      expect(privacyButton).toBeInTheDocument()
      expect(termsButton.tagName).toBe('BUTTON')
      expect(privacyButton.tagName).toBe('BUTTON')
    })

    it('should not render modals initially', () => {
      render(<DashboardFooter />)

      expect(screen.queryByTestId('terms-modal')).not.toBeInTheDocument()
      expect(screen.queryByTestId('privacy-modal')).not.toBeInTheDocument()
    })
  })

  describe('Terms Modal Interaction', () => {
    it('should open terms modal when terms button is clicked', () => {
      render(<DashboardFooter />)

      const termsButton = screen.getByText('Términos y Condiciones')
      fireEvent.click(termsButton)

      expect(screen.getByTestId('terms-modal')).toBeInTheDocument()
    })

    it('should close terms modal when onOpenChange is called with false', () => {
      render(<DashboardFooter />)

      // Open modal
      const termsButton = screen.getByText('Términos y Condiciones')
      fireEvent.click(termsButton)
      expect(screen.getByTestId('terms-modal')).toBeInTheDocument()

      // Close modal
      const closeButton = screen.getByText('Close Terms')
      fireEvent.click(closeButton)
      expect(screen.queryByTestId('terms-modal')).not.toBeInTheDocument()
    })

    it('should not show privacy modal when terms modal is open', () => {
      render(<DashboardFooter />)

      const termsButton = screen.getByText('Términos y Condiciones')
      fireEvent.click(termsButton)

      expect(screen.getByTestId('terms-modal')).toBeInTheDocument()
      expect(screen.queryByTestId('privacy-modal')).not.toBeInTheDocument()
    })
  })

  describe('Privacy Modal Interaction', () => {
    it('should open privacy modal when privacy button is clicked', () => {
      render(<DashboardFooter />)

      const privacyButton = screen.getByText('Privacidad')
      fireEvent.click(privacyButton)

      expect(screen.getByTestId('privacy-modal')).toBeInTheDocument()
    })

    it('should close privacy modal when onOpenChange is called with false', () => {
      render(<DashboardFooter />)

      // Open modal
      const privacyButton = screen.getByText('Privacidad')
      fireEvent.click(privacyButton)
      expect(screen.getByTestId('privacy-modal')).toBeInTheDocument()

      // Close modal
      const closeButton = screen.getByText('Close Privacy')
      fireEvent.click(closeButton)
      expect(screen.queryByTestId('privacy-modal')).not.toBeInTheDocument()
    })

    it('should not show terms modal when privacy modal is open', () => {
      render(<DashboardFooter />)

      const privacyButton = screen.getByText('Privacidad')
      fireEvent.click(privacyButton)

      expect(screen.getByTestId('privacy-modal')).toBeInTheDocument()
      expect(screen.queryByTestId('terms-modal')).not.toBeInTheDocument()
    })
  })

  describe('Modal State Independence', () => {
    it('should handle opening and closing both modals independently', () => {
      render(<DashboardFooter />)

      // Open terms modal
      fireEvent.click(screen.getByText('Términos y Condiciones'))
      expect(screen.getByTestId('terms-modal')).toBeInTheDocument()

      // Close terms modal
      fireEvent.click(screen.getByText('Close Terms'))
      expect(screen.queryByTestId('terms-modal')).not.toBeInTheDocument()

      // Open privacy modal
      fireEvent.click(screen.getByText('Privacidad'))
      expect(screen.getByTestId('privacy-modal')).toBeInTheDocument()

      // Close privacy modal
      fireEvent.click(screen.getByText('Close Privacy'))
      expect(screen.queryByTestId('privacy-modal')).not.toBeInTheDocument()
    })

    it('should allow reopening the same modal multiple times', () => {
      render(<DashboardFooter />)

      const termsButton = screen.getByText('Términos y Condiciones')

      // First open/close cycle
      fireEvent.click(termsButton)
      expect(screen.getByTestId('terms-modal')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Close Terms'))
      expect(screen.queryByTestId('terms-modal')).not.toBeInTheDocument()

      // Second open/close cycle
      fireEvent.click(termsButton)
      expect(screen.getByTestId('terms-modal')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Close Terms'))
      expect(screen.queryByTestId('terms-modal')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels for screen readers', () => {
      render(<DashboardFooter />)

      const termsButton = screen.getByLabelText('Ver Términos y Condiciones')
      const privacyButton = screen.getByLabelText('Ver Política de Privacidad')

      expect(termsButton).toHaveAccessibleName('Ver Términos y Condiciones')
      expect(privacyButton).toHaveAccessibleName('Ver Política de Privacidad')
    })

    it('should be keyboard accessible', () => {
      render(<DashboardFooter />)

      const termsButton = screen.getByText('Términos y Condiciones')
      const privacyButton = screen.getByText('Privacidad')

      // Buttons should be focusable
      termsButton.focus()
      expect(termsButton).toHaveFocus()

      privacyButton.focus()
      expect(privacyButton).toHaveFocus()
    })
  })

  describe('Responsive Design', () => {
    it('should render separators with responsive visibility classes', () => {
      const { container } = render(<DashboardFooter />)
      const separators = container.querySelectorAll('span.hidden.sm\\:inline')

      // Should have 2 separators ("|" characters)
      expect(separators.length).toBe(2)
    })

    it('should have responsive flex direction classes', () => {
      const { container } = render(<DashboardFooter />)
      const flexContainer = container.querySelector('.flex.flex-col')

      expect(flexContainer).toHaveClass('sm:flex-row')
    })
  })

  describe('Styling', () => {
    it('should apply hover styles to buttons', () => {
      render(<DashboardFooter />)

      const termsButton = screen.getByText('Términos y Condiciones')
      const privacyButton = screen.getByText('Privacidad')

      expect(termsButton).toHaveClass('hover:text-primary', 'hover:underline')
      expect(privacyButton).toHaveClass('hover:text-primary', 'hover:underline')
    })

    it('should have backdrop blur effect on footer', () => {
      const { container } = render(<DashboardFooter />)
      const footer = container.querySelector('footer')

      expect(footer).toHaveClass('backdrop-blur-sm')
    })
  })
})
