
import { CryptoService } from './CryptoService';
import { ErrorService } from './ErrorService';

export class StorageService {
  private static readonly SENSITIVE_KEYS = ['youtube-api-key', 'auth-token', 'user-credentials'];

  static async saveSettings<T>(key: string, data: T, encrypt: boolean = false): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      
      // Auto-encrypt sensitive data
      const shouldEncrypt = encrypt || this.SENSITIVE_KEYS.includes(key);
      
      if (shouldEncrypt && await CryptoService.isSupported()) {
        try {
          const encryptedData = await CryptoService.encrypt(jsonData);
          localStorage.setItem(`${key}_encrypted`, encryptedData);
          localStorage.removeItem(key); // Remove unencrypted version
          return;
        } catch (error) {
          ErrorService.logWarning(`Failed to encrypt ${key}, falling back to unencrypted storage`);
        }
      }
      
      localStorage.setItem(key, jsonData);
    } catch (error) {
      ErrorService.logError(error, `StorageService.saveSettings - key: ${key}`);
      throw new Error('Failed to save settings');
    }
  }

  static async loadSettings<T>(key: string, defaultValue: T): Promise<T> {
    try {
      // Try to load encrypted version first
      const encryptedData = localStorage.getItem(`${key}_encrypted`);
      if (encryptedData && await CryptoService.isSupported()) {
        try {
          const decryptedData = await CryptoService.decrypt(encryptedData);
          return JSON.parse(decryptedData);
        } catch (error) {
          ErrorService.logWarning(`Failed to decrypt ${key}, trying unencrypted version`);
        }
      }
      
      // Fallback to unencrypted version
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          
          // If this is sensitive data and we have crypto support, re-encrypt it
          if (this.SENSITIVE_KEYS.includes(key) && await CryptoService.isSupported()) {
            await this.saveSettings(key, parsed, true);
          }
          
          return parsed;
        } catch (error) {
          ErrorService.logError(error, `StorageService.loadSettings - Failed to parse ${key}`);
        }
      }
      
      return defaultValue;
    } catch (error) {
      ErrorService.logError(error, `StorageService.loadSettings - key: ${key}`);
      return defaultValue;
    }
  }

  static removeSettings(key: string): void {
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_encrypted`);
    } catch (error) {
      ErrorService.logError(error, `StorageService.removeSettings - key: ${key}`);
    }
  }

  static async migrateToEncrypted(): Promise<void> {
    if (!await CryptoService.isSupported()) {
      ErrorService.logWarning('Crypto not supported, skipping encryption migration');
      return;
    }

    for (const key of this.SENSITIVE_KEYS) {
      const unencryptedData = localStorage.getItem(key);
      if (unencryptedData && !localStorage.getItem(`${key}_encrypted`)) {
        try {
          const encryptedData = await CryptoService.encrypt(unencryptedData);
          localStorage.setItem(`${key}_encrypted`, encryptedData);
          localStorage.removeItem(key);
          ErrorService.logInfo(`Migrated ${key} to encrypted storage`);
        } catch (error) {
          ErrorService.logError(error, `Failed to migrate ${key} to encrypted storage`);
        }
      }
    }
  }
}
