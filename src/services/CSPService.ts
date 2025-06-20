
export class CSPService {
  static generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }

  static setCSPHeaders(): void {
    // Create meta tag for CSP if it doesn't exist
    let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement;
    
    if (!cspMeta) {
      cspMeta = document.createElement('meta');
      cspMeta.httpEquiv = 'Content-Security-Policy';
      document.head.appendChild(cspMeta);
    }

    const nonce = this.generateNonce();
    
    // Store nonce for use in components
    (window as any).__CSP_NONCE__ = nonce;

    const cspPolicy = [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' 'unsafe-eval'`, // unsafe-eval needed for Vite in dev
      "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for Tailwind
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.googleapis.com https://youtube.googleapis.com",
      "frame-src 'self' https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');

    cspMeta.content = cspPolicy;
  }

  static getNonce(): string {
    return (window as any).__CSP_NONCE__ || '';
  }
}

// Initialize CSP when service loads
CSPService.setCSPHeaders();
