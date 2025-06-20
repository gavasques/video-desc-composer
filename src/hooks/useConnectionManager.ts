
import { useState } from 'react';
import { ConnectionStatus } from '@/types/settings';
import { toast } from '@/hooks/use-toast';

export const useConnectionManager = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: true,
    lastConnected: new Date().toISOString()
  });

  const disconnect = () => {
    setStatus({ isConnected: false });
    toast({
      title: "Canal desconectado",
      description: "Sua conta do YouTube foi desconectada com sucesso.",
    });
  };

  const reconnect = () => {
    setStatus({ 
      isConnected: true, 
      lastConnected: new Date().toISOString() 
    });
    toast({
      title: "Reconectando...",
      description: "Redirecionando para autenticação do YouTube.",
    });
  };

  return { status, disconnect, reconnect };
};
