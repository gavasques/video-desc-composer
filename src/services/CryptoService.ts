
export class CryptoService {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;

  private static async generateKey(): Promise<CryptoKey> {
    return await window.crypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  private static async getOrCreateKey(): Promise<CryptoKey> {
    const savedKey = localStorage.getItem('app_encryption_key');
    
    if (savedKey) {
      try {
        const keyData = JSON.parse(savedKey);
        return await window.crypto.subtle.importKey(
          'jwk',
          keyData,
          { name: this.ALGORITHM },
          true,
          ['encrypt', 'decrypt']
        );
      } catch (error) {
        console.warn('Failed to import saved key, generating new one');
      }
    }

    const key = await this.generateKey();
    const exportedKey = await window.crypto.subtle.exportKey('jwk', key);
    localStorage.setItem('app_encryption_key', JSON.stringify(exportedKey));
    return key;
  }

  static async encrypt(data: string): Promise<string> {
    try {
      const key = await this.getOrCreateKey();
      const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
      const encodedData = new TextEncoder().encode(data);

      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
        },
        key,
        encodedData
      );

      const encryptedArray = new Uint8Array(encryptedData);
      const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
      combinedArray.set(iv);
      combinedArray.set(encryptedArray, iv.length);

      return btoa(String.fromCharCode(...combinedArray));
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  static async decrypt(encryptedData: string): Promise<string> {
    try {
      const key = await this.getOrCreateKey();
      const combinedArray = new Uint8Array(
        atob(encryptedData)
          .split('')
          .map(char => char.charCodeAt(0))
      );

      const iv = combinedArray.slice(0, this.IV_LENGTH);
      const encrypted = combinedArray.slice(this.IV_LENGTH);

      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
        },
        key,
        encrypted
      );

      return new TextDecoder().decode(decryptedData);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  static async isSupported(): Promise<boolean> {
    return !!(window.crypto && window.crypto.subtle);
  }

  static clearStoredKey(): void {
    localStorage.removeItem('app_encryption_key');
  }
}
