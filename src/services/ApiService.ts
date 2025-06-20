
export class ApiService {
  static async testApiKey(apiKey: string): Promise<boolean> {
    // Simulate API test
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = apiKey.startsWith('AIza');
        resolve(isValid);
      }, 2000);
    });
  }

  static async getQuotaUsage(): Promise<{ used: number; limit: number; resetDate: string }> {
    // Simulate quota fetch
    return {
      used: 850,
      limit: 10000,
      resetDate: '2024-06-21'
    };
  }
}
