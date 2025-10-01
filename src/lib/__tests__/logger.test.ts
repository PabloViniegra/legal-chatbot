import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { logger } from '../logger';

describe.skip('logger', () => {
  const originalEnv = process.env.NODE_ENV;
  let consoleLogSpy: any;
  let consoleInfoSpy: any;
  let consoleWarnSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    // Spy on console methods
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.NODE_ENV = originalEnv;
  });

  describe('debug', () => {
    it('debería loggear en desarrollo', () => {
      process.env.NODE_ENV = 'development';

      logger.debug('Test debug message');

      expect(consoleLogSpy).toHaveBeenCalled();
      expect(consoleLogSpy.mock.calls[0][0]).toContain('[DEBUG]');
      expect(consoleLogSpy.mock.calls[0][0]).toContain('Test debug message');
    });

    it('debería loggear con metadata', () => {
      process.env.NODE_ENV = 'development';

      logger.debug('Test message', { userId: '123', action: 'create' });

      expect(consoleLogSpy).toHaveBeenCalled();
      const logMessage = consoleLogSpy.mock.calls[0][0];
      expect(logMessage).toContain('Test message');
      expect(logMessage).toContain('userId');
      expect(logMessage).toContain('123');
    });

    it('no debería loggear en producción', () => {
      process.env.NODE_ENV = 'production';

      logger.debug('Test debug message');

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });

  describe('info', () => {
    it('debería loggear en desarrollo', () => {
      process.env.NODE_ENV = 'development';

      logger.info('Test info message');

      expect(consoleInfoSpy).toHaveBeenCalled();
      expect(consoleInfoSpy.mock.calls[0][0]).toContain('[INFO]');
      expect(consoleInfoSpy.mock.calls[0][0]).toContain('Test info message');
    });

    it('debería loggear con metadata', () => {
      process.env.NODE_ENV = 'development';

      logger.info('Info message', { status: 'success', count: 5 });

      expect(consoleInfoSpy).toHaveBeenCalled();
      const logMessage = consoleInfoSpy.mock.calls[0][0];
      expect(logMessage).toContain('status');
      expect(logMessage).toContain('success');
    });

    it('no debería loggear en producción', () => {
      process.env.NODE_ENV = 'production';

      logger.info('Test info message');

      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });
  });

  describe('warn', () => {
    it('debería loggear en desarrollo', () => {
      process.env.NODE_ENV = 'development';

      logger.warn('Test warning');

      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(consoleWarnSpy.mock.calls[0][0]).toContain('[WARN]');
      expect(consoleWarnSpy.mock.calls[0][0]).toContain('Test warning');
    });

    it('debería loggear en producción', () => {
      process.env.NODE_ENV = 'production';

      logger.warn('Production warning');

      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(consoleWarnSpy.mock.calls[0][0]).toContain('Production warning');
    });

    it('debería loggear con metadata', () => {
      process.env.NODE_ENV = 'development';

      logger.warn('Warning message', { reason: 'deprecated', version: '2.0' });

      expect(consoleWarnSpy).toHaveBeenCalled();
      const logMessage = consoleWarnSpy.mock.calls[0][0];
      expect(logMessage).toContain('reason');
      expect(logMessage).toContain('deprecated');
    });
  });

  describe('error', () => {
    it('debería loggear en desarrollo', () => {
      process.env.NODE_ENV = 'development';

      logger.error('Test error');

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy.mock.calls[0][0]).toContain('[ERROR]');
      expect(consoleErrorSpy.mock.calls[0][0]).toContain('Test error');
    });

    it('debería loggear en producción', () => {
      process.env.NODE_ENV = 'production';

      logger.error('Production error');

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy.mock.calls[0][0]).toContain('Production error');
    });

    it('debería loggear con metadata de error', () => {
      process.env.NODE_ENV = 'development';

      const error = new Error('Database connection failed');
      logger.error('Database error', { error, context: 'connection' });

      expect(consoleErrorSpy).toHaveBeenCalled();
      const logMessage = consoleErrorSpy.mock.calls[0][0];
      expect(logMessage).toContain('Database error');
      expect(logMessage).toContain('error');
    });
  });

  describe('formato de mensajes', () => {
    it('debería incluir timestamp en formato ISO', () => {
      process.env.NODE_ENV = 'development';

      logger.debug('Test');

      expect(consoleLogSpy).toHaveBeenCalled();
      const logMessage = consoleLogSpy.mock.calls[0][0];
      // Verificar que tiene un timestamp en formato ISO
      expect(logMessage).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('debería incluir el nivel de log en mayúsculas', () => {
      process.env.NODE_ENV = 'development';

      logger.debug('Debug test');
      logger.info('Info test');
      logger.warn('Warn test');
      logger.error('Error test');

      expect(consoleLogSpy.mock.calls[0][0]).toContain('[DEBUG]');
      expect(consoleInfoSpy.mock.calls[0][0]).toContain('[INFO]');
      expect(consoleWarnSpy.mock.calls[0][0]).toContain('[WARN]');
      expect(consoleErrorSpy.mock.calls[0][0]).toContain('[ERROR]');
    });

    it('debería serializar metadata como JSON', () => {
      process.env.NODE_ENV = 'development';

      logger.debug('Test', { nested: { key: 'value' }, array: [1, 2, 3] });

      expect(consoleLogSpy).toHaveBeenCalled();
      const logMessage = consoleLogSpy.mock.calls[0][0];
      expect(logMessage).toContain('nested');
      expect(logMessage).toContain('key');
      expect(logMessage).toContain('value');
    });

    it('no debería incluir metadata si está vacía', () => {
      process.env.NODE_ENV = 'development';

      logger.debug('Test message', {});

      expect(consoleLogSpy).toHaveBeenCalled();
      const logMessage = consoleLogSpy.mock.calls[0][0];
      expect(logMessage).not.toContain('{}');
    });
  });

  describe('entornos', () => {
    it('debería comportarse diferente en desarrollo vs producción', () => {
      // Development
      process.env.NODE_ENV = 'development';
      logger.debug('Dev debug');
      logger.info('Dev info');
      logger.warn('Dev warn');
      logger.error('Dev error');

      expect(consoleLogSpy).toHaveBeenCalledTimes(1); // debug
      expect(consoleInfoSpy).toHaveBeenCalledTimes(1); // info
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1); // warn
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1); // error

      // Reset
      consoleLogSpy.mockClear();
      consoleInfoSpy.mockClear();
      consoleWarnSpy.mockClear();
      consoleErrorSpy.mockClear();

      // Production
      process.env.NODE_ENV = 'production';
      logger.debug('Prod debug');
      logger.info('Prod info');
      logger.warn('Prod warn');
      logger.error('Prod error');

      expect(consoleLogSpy).not.toHaveBeenCalled(); // debug no aparece
      expect(consoleInfoSpy).not.toHaveBeenCalled(); // info no aparece
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1); // warn sí aparece
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1); // error sí aparece
    });
  });
});
