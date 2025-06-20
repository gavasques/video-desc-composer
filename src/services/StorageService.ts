
export class StorageService {
  static saveSettings<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static loadSettings<T>(key: string, defaultValue: T): T {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error(`Failed to parse ${key}:`, error);
      }
    }
    return defaultValue;
  }

  static removeSettings(key: string): void {
    localStorage.removeItem(key);
  }
}
