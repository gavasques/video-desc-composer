
export class ValidationService {
  static validateApiKey(apiKey: string): { isValid: boolean; error?: string } {
    if (!apiKey.trim()) {
      return { isValid: false, error: 'API key is required' };
    }
    if (!apiKey.startsWith('AIza')) {
      return { isValid: false, error: 'Invalid API key format' };
    }
    return { isValid: true };
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateNumericRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  // XSS Sanitization
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
      return '';
    }

    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/data:text\/html/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/expression\s*\(/gi, '')
      .trim();
  }

  static sanitizeHtml(html: string): string {
    if (typeof html !== 'string') {
      return '';
    }

    // Remove script tags and dangerous attributes
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
      .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
      .replace(/<embed[^>]*>/gi, '')
      .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
      .replace(/on\w+\s*=\s*'[^']*'/gi, '')
      .replace(/javascript:[^"']*/gi, '')
      .replace(/vbscript:[^"']*/gi, '')
      .replace(/data:text\/html[^"']*/gi, '');
  }

  static validateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }

  static validateCSRFToken(token: string, expectedToken: string): boolean {
    if (!token || !expectedToken) {
      return false;
    }
    return token === expectedToken;
  }

  static generateCSRFToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Form validation with rate limiting
  static validateFormSubmission(formId: string, data: Record<string, any>): {
    isValid: boolean;
    errors: string[];
    rateLimited: boolean;
    retryAfter?: number;
  } {
    const errors: string[] = [];
    
    // Rate limiting check
    const clientId = this.getClientId();
    const rateLimitKey = `form_${formId}_${clientId}`;
    const rateLimit = this.checkRateLimit(rateLimitKey);
    
    if (!rateLimit.allowed) {
      return {
        isValid: false,
        errors: ['Too many requests. Please try again later.'],
        rateLimited: true,
        retryAfter: rateLimit.retryAfter
      };
    }

    // Validate and sanitize all fields
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        const sanitized = this.sanitizeInput(value);
        if (sanitized !== value) {
          errors.push(`Field ${key} contains invalid characters`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      rateLimited: false
    };
  }

  private static getClientId(): string {
    let clientId = localStorage.getItem('validation_client_id');
    if (!clientId) {
      clientId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem('validation_client_id', clientId);
    }
    return clientId;
  }

  private static checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
    // Use RateLimitService
    return { allowed: true }; // Simplified for now, integrate with RateLimitService
  }
}
