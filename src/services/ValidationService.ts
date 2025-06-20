
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
}
