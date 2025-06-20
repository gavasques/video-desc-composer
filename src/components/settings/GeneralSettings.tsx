
import { useState } from "react";
import { Monitor, Bell, Download, FileText, Moon, Sun, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'pt-BR',
    notifications: {
      success: true,
      errors: true,
      updates: false,
      marketing: false
    },
    backup: {
      enabled: true,
      frequency: 'daily',
      location: 'local'
    },
    logs: {
      level: 'info',
      retention: '30'
    }
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNestedSettingChange = (parent: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram salvas com sucesso.",
    });
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'system',
      language: 'pt-BR',
      notifications: {
        success: true,
        errors: true,
        updates: false,
        marketing: false
      },
      backup: {
        enabled: true,
        frequency: 'daily',
        location: 'local'
      },
      logs: {
        level: 'info',
        retention: '30'
      }
    };
    
    setSettings(defaultSettings);
    localStorage.setItem('app-settings', JSON.stringify(defaultSettings));
    
    toast({
      title: "Configurações resetadas",
      description: "Todas as configurações foram restauradas para o padrão.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Aparência
          </CardTitle>
          <CardDescription>
            Personalize a interface da aplicação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tema</Label>
            <Select 
              value={settings.theme} 
              onValueChange={(value) => handleSettingChange('theme', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    Claro
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Escuro
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Sistema
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Idioma</Label>
            <Select 
              value={settings.language} 
              onValueChange={(value) => handleSettingChange('language', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Português (Brasil)
                  </div>
                </SelectItem>
                <SelectItem value="en-US">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    English (US)
                  </div>
                </SelectItem>
                <SelectItem value="es-ES">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Español
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificações
          </CardTitle>
          <CardDescription>
            Configure quando e como receber notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações de sucesso</Label>
                <p className="text-sm text-gray-600">
                  Mostrar quando operações são concluídas com sucesso
                </p>
              </div>
              <Switch
                checked={settings.notifications.success}
                onCheckedChange={(checked) => 
                  handleNestedSettingChange('notifications', 'success', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações de erro</Label>
                <p className="text-sm text-gray-600">
                  Mostrar quando ocorrem erros ou falhas
                </p>
              </div>
              <Switch
                checked={settings.notifications.errors}
                onCheckedChange={(checked) => 
                  handleNestedSettingChange('notifications', 'errors', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Atualizações do sistema</Label>
                <p className="text-sm text-gray-600">
                  Notificar sobre novas versões e atualizações
                </p>
              </div>
              <Switch
                checked={settings.notifications.updates}
                onCheckedChange={(checked) => 
                  handleNestedSettingChange('notifications', 'updates', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Comunicações de marketing</Label>
                <p className="text-sm text-gray-600">
                  Receber dicas, novidades e promoções
                </p>
              </div>
              <Switch
                checked={settings.notifications.marketing}
                onCheckedChange={(checked) => 
                  handleNestedSettingChange('notifications', 'marketing', checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Backup e Sincronização
          </CardTitle>
          <CardDescription>
            Configure backups automáticos dos seus dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Backup automático</Label>
              <p className="text-sm text-gray-600">
                Fazer backup automático das configurações e blocos
              </p>
            </div>
            <Switch
              checked={settings.backup.enabled}
              onCheckedChange={(checked) => 
                handleNestedSettingChange('backup', 'enabled', checked)
              }
            />
          </div>

          {settings.backup.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Frequência</Label>
                <Select 
                  value={settings.backup.frequency} 
                  onValueChange={(value) => handleNestedSettingChange('backup', 'frequency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">A cada hora</SelectItem>
                    <SelectItem value="daily">Diariamente</SelectItem>
                    <SelectItem value="weekly">Semanalmente</SelectItem>
                    <SelectItem value="monthly">Mensalmente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Local</Label>
                <Select 
                  value={settings.backup.location} 
                  onValueChange={(value) => handleNestedSettingChange('backup', 'location', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Armazenamento local</SelectItem>
                    <SelectItem value="cloud">Nuvem (em breve)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Logs Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Logs e Diagnósticos
          </CardTitle>
          <CardDescription>
            Configure o nível de detalhamento dos logs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nível de log</Label>
              <Select 
                value={settings.logs.level} 
                onValueChange={(value) => handleNestedSettingChange('logs', 'level', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="error">Apenas erros</SelectItem>
                  <SelectItem value="warn">Avisos e erros</SelectItem>
                  <SelectItem value="info">Informações gerais</SelectItem>
                  <SelectItem value="debug">Debug completo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Retenção (dias)</Label>
              <Select 
                value={settings.logs.retention} 
                onValueChange={(value) => handleNestedSettingChange('logs', 'retention', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="30">30 dias</SelectItem>
                  <SelectItem value="90">90 dias</SelectItem>
                  <SelectItem value="365">1 ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={handleSaveSettings} className="flex-1">
              Salvar Configurações
            </Button>
            <Button onClick={handleResetSettings} variant="outline" className="flex-1">
              Restaurar Padrões
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;
