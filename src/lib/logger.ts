type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMetadata {
  [key: string]: unknown;
}

class Logger {
  private get isDevelopment() {
    return process.env.NODE_ENV === 'development';
  }

  private formatMessage(level: LogLevel, message: string, metadata?: LogMetadata): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    if (metadata && Object.keys(metadata).length > 0) {
      return `${prefix} ${message} ${JSON.stringify(metadata)}`;
    }

    return `${prefix} ${message}`;
  }

  private log(level: LogLevel, message: string, metadata?: LogMetadata): void {
    // En producción, solo mostrar warn y error
    if (!this.isDevelopment && (level === 'debug' || level === 'info')) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message, metadata);

    switch (level) {
      case 'error':
        console.error(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'info':
        console.info(formattedMessage);
        break;
      case 'debug':
        console.log(formattedMessage);
        break;
    }
  }

  /**
   * Log de nivel debug - Solo visible en desarrollo
   */
  debug(message: string, metadata?: LogMetadata): void {
    this.log('debug', message, metadata);
  }

  /**
   * Log de nivel info - Solo visible en desarrollo
   */
  info(message: string, metadata?: LogMetadata): void {
    this.log('info', message, metadata);
  }

  /**
   * Log de nivel warning - Visible en todos los entornos
   */
  warn(message: string, metadata?: LogMetadata): void {
    this.log('warn', message, metadata);
  }

  /**
   * Log de nivel error - Visible en todos los entornos
   */
  error(message: string, metadata?: LogMetadata): void {
    this.log('error', message, metadata);
  }
}

export const logger = new Logger();