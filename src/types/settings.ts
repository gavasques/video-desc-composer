
export interface UserAccount {
  name: string;
  email: string;
  channelId: string;
  avatar: string;
  isVerified: boolean;
  joinedDate: string;
  connectionStatus: 'connected' | 'disconnected';
}

export interface ChannelStats {
  subscriberCount: string;
  videoCount: number;
  totalViews: string;
}

export interface ConnectionStatus {
  isConnected: boolean;
  lastConnected?: string;
  error?: string;
}

export interface ApiConfiguration {
  key: string;
  status: 'unknown' | 'valid' | 'invalid';
  rateLimit: number;
  timeout: number;
}

export interface QuotaUsage {
  used: number;
  limit: number;
  resetDate: string;
}

export interface AuthenticationState {
  isConnected: boolean;
  scopes: string[];
  tokenExpiry: string;
  lastRefresh: string;
}

export interface TokenInfo {
  expiry: string;
  lastRefresh: string;
  isExpiringSoon: boolean;
}

export interface PermissionScope {
  scope: string;
  description: string;
  isActive: boolean;
}

export interface AutomationConfig {
  batchSize: number;
  intervalMinutes: number;
  maxRetries: number;
  timeoutSeconds: number;
}

export interface PerformanceConfig {
  cacheEnabled: boolean;
  cacheTTL: number;
  preloadData: boolean;
  compressionEnabled: boolean;
}

export interface SecurityConfig {
  requireConfirmation: boolean;
  enableAuditLog: boolean;
  sessionTimeout: number;
  encryptStorage: boolean;
}

export interface DevelopmentConfig {
  debugMode: boolean;
  verboseLogs: boolean;
  mockData: boolean;
  showApiCalls: boolean;
}

export interface BackupConfig {
  enabled: boolean;
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  location: 'local' | 'cloud';
}
