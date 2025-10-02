import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInput } from '../chat-input';

// Mock window.matchMedia para GSAP animations
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('ChatInput', () => {
  const mockSetInput = vi.fn();
  const mockOnSubmit = vi.fn();
  const mockSetSelectedCategory = vi.fn();

  const defaultProps = {
    input: '',
    setInput: mockSetInput,
    onSubmit: mockOnSubmit,
    isLoading: false,
    selectedCategory: '',
    setSelectedCategory: mockSetSelectedCategory,
    hasConversationId: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Selector de categoría', () => {
    it('debería mostrar selector de categoría cuando NO hay conversationId', () => {
      const { container } = render(<ChatInput {...defaultProps} hasConversationId={false} />);

      // Buscar el trigger del select por su rol
      const selectTrigger = container.querySelector('[role="combobox"]');
      expect(selectTrigger).toBeInTheDocument();
    });

    it('NO debería mostrar selector de categoría cuando HAY conversationId', () => {
      const { container } = render(<ChatInput {...defaultProps} hasConversationId={true} />);

      // No debería existir el selector
      const selectTrigger = container.querySelector('[role="combobox"]');
      expect(selectTrigger).not.toBeInTheDocument();
    });

    it('debería deshabilitar selector cuando isLoading es true', () => {
      const { container } = render(<ChatInput {...defaultProps} isLoading={true} hasConversationId={false} />);

      const selectTrigger = container.querySelector('[role="combobox"]');
      expect(selectTrigger).toHaveAttribute('data-disabled', '');
    });

    it.skip('debería tener las 4 categorías disponibles en el selector', () => {
      // Skipped: Radix UI Select requiere tests de integración más complejos
    });

    it.skip('debería llamar setSelectedCategory cuando se selecciona una categoría', () => {
      // Skipped: Radix UI Select requiere tests de integración más complejos
    });
  });

  describe('Input de texto', () => {
    it('debería mostrar placeholder correcto', () => {
      render(<ChatInput {...defaultProps} />);

      const input = screen.getByPlaceholderText('Escribe tu consulta legal...');
      expect(input).toBeInTheDocument();
    });

    it('debería llamar setInput cuando el usuario escribe', () => {
      render(<ChatInput {...defaultProps} />);

      const input = screen.getByPlaceholderText('Escribe tu consulta legal...');
      fireEvent.change(input, { target: { value: 'Nueva consulta' } });

      expect(mockSetInput).toHaveBeenCalledWith('Nueva consulta');
    });

    it('debería deshabilitar input cuando isLoading es true', () => {
      render(<ChatInput {...defaultProps} isLoading={true} />);

      const input = screen.getByPlaceholderText('Escribe tu consulta legal...');
      expect(input).toBeDisabled();
    });
  });

  describe('Botón de envío', () => {
    it('debería estar deshabilitado cuando NO hay texto', () => {
      render(<ChatInput {...defaultProps} input="" selectedCategory="civil" />);

      const button = screen.getByRole('button', { type: 'submit' });
      expect(button).toBeDisabled();
    });

    it('debería estar deshabilitado cuando NO hay categoría (nueva conversación)', () => {
      render(<ChatInput {...defaultProps} input="Test" selectedCategory="" hasConversationId={false} />);

      const button = screen.getByRole('button', { type: 'submit' });
      expect(button).toBeDisabled();
    });

    it('debería estar HABILITADO cuando hay texto Y categoría (nueva conversación)', () => {
      render(<ChatInput {...defaultProps} input="Test" selectedCategory="civil" hasConversationId={false} />);

      const button = screen.getByRole('button', { type: 'submit' });
      expect(button).not.toBeDisabled();
    });

    it('debería estar HABILITADO cuando hay texto (conversación existente, sin categoría necesaria)', () => {
      render(<ChatInput {...defaultProps} input="Test" selectedCategory="" hasConversationId={true} />);

      const button = screen.getByRole('button', { type: 'submit' });
      expect(button).not.toBeDisabled();
    });

    it('debería estar deshabilitado cuando isLoading es true', () => {
      render(<ChatInput {...defaultProps} input="Test" selectedCategory="civil" isLoading={true} />);

      const button = screen.getByRole('button', { type: 'submit' });
      expect(button).toBeDisabled();
    });

    it('debería llamar onSubmit cuando se hace click (con categoría)', () => {
      render(<ChatInput {...defaultProps} input="Test" selectedCategory="civil" hasConversationId={false} />);

      const button = screen.getByRole('button', { type: 'submit' });
      fireEvent.click(button);

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it('NO debería llamar onSubmit si falta categoría en nueva conversación', () => {
      render(<ChatInput {...defaultProps} input="Test" selectedCategory="" hasConversationId={false} />);

      const button = screen.getByRole('button', { type: 'submit' });
      const form = button.closest('form');

      if (form) {
        fireEvent.submit(form);
      }

      // No debería llamar onSubmit porque falta categoría
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Integración completa', () => {
    it('flujo completo: escribir con categoría preseleccionada, enviar', () => {
      const { rerender } = render(<ChatInput {...defaultProps} hasConversationId={false} />);

      // 1. Escribir texto
      const input = screen.getByPlaceholderText('Escribe tu consulta legal...');
      fireEvent.change(input, { target: { value: '¿Qué es un contrato?' } });

      expect(mockSetInput).toHaveBeenCalledWith('¿Qué es un contrato?');

      // 2. Renderizar de nuevo con categoría seleccionada
      rerender(
        <ChatInput
          {...defaultProps}
          input="¿Qué es un contrato?"
          selectedCategory="civil"
          hasConversationId={false}
        />
      );

      // 3. Verificar que botón está habilitado
      const button = screen.getByRole('button', { type: 'submit' });
      expect(button).not.toBeDisabled();

      // 4. Enviar
      fireEvent.click(button);
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it('selector debe ocultarse después de tener conversationId', () => {
      const { rerender, container } = render(<ChatInput {...defaultProps} hasConversationId={false} />);

      // Inicialmente visible
      const selectTrigger = container.querySelector('[role="combobox"]');
      expect(selectTrigger).toBeInTheDocument();

      // Simular que ahora hay conversationId
      rerender(<ChatInput {...defaultProps} hasConversationId={true} />);

      // Ahora debe estar oculto
      const hiddenSelectTrigger = container.querySelector('[role="combobox"]');
      expect(hiddenSelectTrigger).not.toBeInTheDocument();
    });
  });
});
