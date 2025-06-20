
interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info';
  message: string;
  context?: string;
  userId?: string;
  sanitized: boolean;
}

export class ErrorService {
  private static logs: ErrorLog[] = [];
  private static readonly MAX_LOGS = 100;

  private static sanitizeError(error: any): string {
    if (typeof error === 'string') {
      return this.sanitizeString(error);
    }
    
    if (error instanceof Error) {
      return this.sanitizeString(error.message);
    }
    
    // Remove sensitive data patterns
    let errorStr = JSON.stringify(error);
    return this.sanitizeString(errorStr);
  }

  private static sanitizeString(str: string): string {
    // Remove common sensitive patterns
    return str
      .replace(/AIza[0-9A-Za-z_-]{35}/g, '[API_KEY_REDACTED]')
      .replace(/sk-[a-zA-Z0-9]{48}/g, '[SECRET_KEY_REDACTED]')
      .replace(/Bearer\s+[a-zA-Z0-9._-]+/g, '[BEARER_TOKEN_REDACTED]')
      .replace(/password["\s]*[:=]["\s]*[^"'\s,}]+/gi, 'password:[REDACTED]')
      .replace(/token["\s]*[:=]["\s]*[^"'\s,}]+/gi, 'token:[REDACTED]')
      .replace(/email["\s]*[:=]["\s]*[^"'\s,}]+@[^"'\s,}]+/gi, 'email:[REDACTED]');
  }

  static logError(error: any, context?: string, userId?: string): void {
    const log: ErrorLog = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level: 'error',
      message: this.sanitizeError(error),
      context,
      userId: userId ? this.sanitizeString(userId) : undefined,
      sanitized: true
    };

    this.addLog(log);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorService]', log);
    }
  }

  static logWarning(message: string, context?: string): void {
    const log: ErrorLog = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level: 'warn',
      message: this.sanitizeString(message),
      context,
      sanitized: true
    };

    this.addLog(log);
    
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ErrorService]', log);
    }
  }

  static logInfo(message: string, context?: string): void {
    const log: ErrorLog = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level: 'info',
      message: this.sanitizeString(message),
      context,
      sanitized: true
    };

    this.addLog(log);
  }

  private static addLog(log: ErrorLog): void {
    this.logs.unshift(log);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(0, this.MAX_LOGS);
    }
  }

  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static getLogs(level?: 'error' | 'warn' | 'info'): ErrorLog[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  static clearLogs(): void {
    this.logs = [];
  }

  static handleUnhandledErrors(): void {
    window.addEventListener('error', (event) => {
      this.logError(event.error, 'Unhandled Error');
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError(event.reason, 'Unhandled Promise Rejection');
    });
  }
}
