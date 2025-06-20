
import { useState } from 'react';
import { AutomationConfig, PerformanceConfig, SecurityConfig, DevelopmentConfig } from '@/types/settings';
import { StorageService } from '@/services/StorageService';
import { toast } from '@/hooks/use-toast';

interface AdvancedSettingsState {
  automation: AutomationConfig;
  performance: PerformanceConfig;
  security: SecurityConfig;
  development: DevelopmentConfig;
}

export const useAdvancedSettings = () => {
  const [settings, setSettings] = useState<AdvancedSettingsState>({
    automation: {
      batchSize: 10,
      intervalMinutes: 30,
      maxRetries: 3,
      timeoutSeconds: 60
    },
    performance: {
      cacheEnabled: true,
      cacheTTL: 3600,
      preloadData: true,
      compressionEnabled: true
    },
    security: {
      requireConfirmation: true,
      enableAuditLog: true,
      sessionTimeout: 480,
      encryptStorage: true
    },
    development: {
      debugMode: false,
      verboseLogs: false,
      mockData: false,
      showApiCalls: false
    }
  });

  const updateSection = (section: keyof AdvancedSettingsState, updates: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  const exportSettings = () => {
    const allSettings = {
      ...settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(allSettings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ytdm-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Configurações exportadas",
      description: "Arquivo de configurações baixado com sucesso.",
    });
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setSettings(imported);
        toast({
          title: "Configurações importadas",
          description: "Configurações carregadas com sucesso do arquivo.",
        });
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Arquivo de configurações inválido.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const resetSettings = () => {
    const defaultSettings: AdvancedSettingsState = {
      automation: {
        batchSize: 10,
        intervalMinutes: 30,
        maxRetries: 3,
        timeoutSeconds: 60
      },
      performance: {
        cacheEnabled: true,
        cacheTTL: 3600,
        preloadData: true,
        compressionEnabled: true
      },
      security: {
        requireConfirmation: true,
        enableAuditLog: true,
        sessionTimeout: 480,
        encryptStorage: true
      },
      development: {
        debugMode: false,
        verboseLogs: false,
        mockData: false,
        showApiCalls: false
      }
    };
    
    setSettings(defaultSettings);
    toast({
      title: "Configurações resetadas",
      description: "Configurações avançadas restauradas para o padrão.",
    });
  };

  return {
    settings,
    updateSection,
    exportSettings,
    importSettings,
    resetSettings
  };
};
