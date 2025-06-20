
import { useState } from 'react';
import { TokenInfo } from '@/types/settings';
import { toast } from '@/hooks/use-toast';

export const useTokenManager = () => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    expiry: '2024-07-20T10:30:00Z',
    lastRefresh: '2024-06-20T08:15:00Z',
    isExpiringSoon: false
  });

  const refreshToken = async () => {
    toast({
      title: "Renovando token...",
      description: "Aguarde enquanto renovamos seu token de acesso.",
    });

    // Simulate token refresh
    setTimeout(() => {
      const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      const newRefresh = new Date().toISOString();
      
      setTokenInfo({
        expiry: newExpiry,
        lastRefresh: newRefresh,
        isExpiringSoon: false
      });

      toast({
        title: "Token renovado",
        description: "Seu token de acesso foi renovado com sucesso.",
      });
    }, 2000);
  };

  const checkIfExpiringSoon = () => {
    const expiryDate = new Date(tokenInfo.expiry);
    const now = new Date();
    const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilExpiry < 24;
  };

  return { tokenInfo, refreshToken, checkIfExpiringSoon };
};
