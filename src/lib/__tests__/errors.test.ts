import { describe, it, expect } from 'vitest';
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
} from '../errors';

describe('errors', () => {
  describe('NotFoundError', () => {
    it('debería crear error con mensaje formateado', () => {
      const error = new NotFoundError('Conversación', 'conv_123456');

      expect(error.message).toBe('Conversación con id conv_123456 no encontrado');
      expect(error.name).toBe('NotFoundError');
      expect(error).toBeInstanceOf(Error);
    });

    it('debería ser instancia de Error', () => {
      const error = new NotFoundError('Usuario', 'user_123');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(NotFoundError);
    });

    it('debería incluir stack trace', () => {
      const error = new NotFoundError('Mensaje', 'msg_123');

      expect(error.stack).toBeDefined();
    });

    it('debería funcionar con diferentes recursos', () => {
      const conversationError = new NotFoundError('Conversación', 'conv_123');
      const userError = new NotFoundError('Usuario', 'user_123');
      const messageError = new NotFoundError('Mensaje', 'msg_123');

      expect(conversationError.message).toContain('Conversación');
      expect(userError.message).toContain('Usuario');
      expect(messageError.message).toContain('Mensaje');
    });
  });

  describe('ValidationError', () => {
    it('debería crear error con mensaje personalizado', () => {
      const error = new ValidationError('Usuario y título requeridos');

      expect(error.message).toBe('Usuario y título requeridos');
      expect(error.name).toBe('ValidationError');
      expect(error).toBeInstanceOf(Error);
    });

    it('debería ser instancia de Error', () => {
      const error = new ValidationError('Campo inválido');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ValidationError);
    });

    it('debería incluir stack trace', () => {
      const error = new ValidationError('Validación fallida');

      expect(error.stack).toBeDefined();
    });

    it('debería aceptar cualquier mensaje de validación', () => {
      const messages = [
        'Email inválido',
        'Contraseña muy corta',
        'Campos requeridos faltantes',
        'Formato de fecha incorrecto',
      ];

      messages.forEach((message) => {
        const error = new ValidationError(message);
        expect(error.message).toBe(message);
      });
    });
  });

  describe('UnauthorizedError', () => {
    it('debería crear error con mensaje por defecto', () => {
      const error = new UnauthorizedError();

      expect(error.message).toBe('No autorizado');
      expect(error.name).toBe('UnauthorizedError');
      expect(error).toBeInstanceOf(Error);
    });

    it('debería aceptar mensaje personalizado', () => {
      const error = new UnauthorizedError('Token expirado');

      expect(error.message).toBe('Token expirado');
      expect(error.name).toBe('UnauthorizedError');
    });

    it('debería ser instancia de Error', () => {
      const error = new UnauthorizedError();

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnauthorizedError);
    });

    it('debería incluir stack trace', () => {
      const error = new UnauthorizedError();

      expect(error.stack).toBeDefined();
    });
  });

  describe('ForbiddenError', () => {
    it('debería crear error con mensaje por defecto', () => {
      const error = new ForbiddenError();

      expect(error.message).toBe('Acceso prohibido');
      expect(error.name).toBe('ForbiddenError');
      expect(error).toBeInstanceOf(Error);
    });

    it('debería aceptar mensaje personalizado', () => {
      const error = new ForbiddenError('No tienes permisos para esta acción');

      expect(error.message).toBe('No tienes permisos para esta acción');
      expect(error.name).toBe('ForbiddenError');
    });

    it('debería ser instancia de Error', () => {
      const error = new ForbiddenError();

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ForbiddenError);
    });

    it('debería incluir stack trace', () => {
      const error = new ForbiddenError();

      expect(error.stack).toBeDefined();
    });
  });

  describe('Error handling patterns', () => {
    it('debería poder diferenciar entre tipos de error', () => {
      const notFound = new NotFoundError('Usuario', '123');
      const validation = new ValidationError('Campo requerido');
      const unauthorized = new UnauthorizedError();
      const forbidden = new ForbiddenError();

      expect(notFound instanceof NotFoundError).toBe(true);
      expect(notFound instanceof ValidationError).toBe(false);

      expect(validation instanceof ValidationError).toBe(true);
      expect(validation instanceof NotFoundError).toBe(false);

      expect(unauthorized instanceof UnauthorizedError).toBe(true);
      expect(forbidden instanceof ForbiddenError).toBe(true);
    });

    it('debería poder capturarse en try-catch', () => {
      const throwNotFound = () => {
        throw new NotFoundError('Recurso', '123');
      };

      expect(throwNotFound).toThrow(NotFoundError);
      expect(throwNotFound).toThrow('Recurso con id 123 no encontrado');
    });

    it('debería poder usarse en condicionales de tipo', () => {
      const error: Error = new ValidationError('Test');

      if (error instanceof ValidationError) {
        expect(error.name).toBe('ValidationError');
      } else {
        throw new Error('Tipo incorrecto');
      }
    });
  });
});
