
import { useState } from 'react';
import { AuthenticationState } from '@/types/settings';
import { toast } from '@/hooks/use-toast';

export const useAuthManager = () => {
  const [authState, setAuthState] = useState<AuthenticationState>({
    isConnected: true,
    scopes: ['youtube.readonly', 'youtube', 'youtube.upload'],
    tokenExpiry: '2024-07-20T10:30:00Z',
    lastRefresh: '2024-06-20T08:15:00Z'
  });

  const revokeAccess = () => {
    setAuthState(prev => ({ ...prev, isConnected: false }));
    toast({
      title: "Acesso revogado",
      description: "Todas as permissões foram revogadas. Você precisará reconectar sua conta.",
      variant: "destructive"
    });
  };

  const reauthorize = () => {
    toast({
      title: "Redirecionando...",
      description: "Você será redirecionado para autorizar novamente.",
    });
  };

  return { authState, setAuthState, revokeAccess, reauthorize };
};
