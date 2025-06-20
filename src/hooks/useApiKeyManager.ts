
import { useState, useEffect } from 'react';
import { ApiConfiguration } from '@/types/settings';
import { StorageService } from '@/services/StorageService';
import { ValidationService } from '@/services/ValidationService';
import { toast } from '@/hooks/use-toast';

export const useApiKeyManager = () => {
  const [config, setConfig] = useState<ApiConfiguration>({
    key: '',
    status: 'unknown',
    rateLimit: 100,
    timeout: 30
  });

  useEffect(() => {
    const savedKey = StorageService.loadSettings('youtube-api-key', '');
    if (savedKey) {
      setConfig(prev => ({ ...prev, key: savedKey, status: 'valid' }));
    }
  }, []);

  const saveApiKey = (key: string) => {
    const validation = ValidationService.validateApiKey(key);
    if (!validation.isValid) {
      toast({
        title: "Erro",
        description: validation.error,
        variant: "destructive"
      });
      return;
    }

    StorageService.saveSettings('youtube-api-key', key);
    setConfig(prev => ({ ...prev, key }));
    toast({
      title: "Chave de API salva",
      description: "A chave de API foi salva com sucesso.",
    });
  };

  const updateConfig = (updates: Partial<ApiConfiguration>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return { config, saveApiKey, updateConfig };
};
