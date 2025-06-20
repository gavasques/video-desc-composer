
interface RateLimitEntry {
  count: number;
  windowStart: number;
  blocked: boolean;
}

export class RateLimitService {
  private static limits = new Map<string, RateLimitEntry>();
  private static readonly DEFAULT_WINDOW_MS = 60000; // 1 minuto
  private static readonly DEFAULT_MAX_REQUESTS = 10;

  static checkLimit(
    key: string, 
    maxRequests: number = this.DEFAULT_MAX_REQUESTS,
    windowMs: number = this.DEFAULT_WINDOW_MS
  ): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const entry = this.limits.get(key);

    if (!entry) {
      this.limits.set(key, {
        count: 1,
        windowStart: now,
        blocked: false
      });
      return { allowed: true };
    }

    // Reset window if expired
    if (now - entry.windowStart >= windowMs) {
      entry.count = 1;
      entry.windowStart = now;
      entry.blocked = false;
      return { allowed: true };
    }

    // Check if already blocked
    if (entry.blocked) {
      const retryAfter = Math.ceil((entry.windowStart + windowMs - now) / 1000);
      return { allowed: false, retryAfter };
    }

    // Increment counter
    entry.count++;

    // Block if limit exceeded
    if (entry.count > maxRequests) {
      entry.blocked = true;
      const retryAfter = Math.ceil((entry.windowStart + windowMs - now) / 1000);
      return { allowed: false, retryAfter };
    }

    return { allowed: true };
  }

  static reset(key: string): void {
    this.limits.delete(key);
  }

  static cleanup(): void {
    const now = Date.now();
    const windowMs = this.DEFAULT_WINDOW_MS;
    
    for (const [key, entry] of this.limits.entries()) {
      if (now - entry.windowStart >= windowMs) {
        this.limits.delete(key);
      }
    }
  }

  static getClientId(): string {
    let clientId = localStorage.getItem('rate_limit_client_id');
    if (!clientId) {
      clientId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem('rate_limit_client_id', clientId);
    }
    return clientId;
  }
}

// Cleanup periodically
setInterval(() => {
  RateLimitService.cleanup();
}, 300000); // 5 minutes
