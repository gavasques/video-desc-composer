
import { useState } from 'react';
import { ApiService } from '@/services/ApiService';
import { toast } from '@/hooks/use-toast';

export const useApiTesting = () => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const testConnection = async (apiKey: string) => {
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave de API antes de testar.",
        variant: "destructive"
      });
      return 'invalid';
    }

    setIsTestingConnection(true);
    
    try {
      const isValid = await ApiService.testApiKey(apiKey);
      const status = isValid ? 'valid' : 'invalid';
      
      toast({
        title: isValid ? "Conexão bem-sucedida" : "Falha na conexão",
        description: isValid 
          ? "A chave de API está funcionando corretamente."
          : "A chave de API parece ser inválida.",
        variant: isValid ? "default" : "destructive"
      });
      
      return status;
    } finally {
      setIsTestingConnection(false);
    }
  };

  return { isTestingConnection, testConnection };
};
