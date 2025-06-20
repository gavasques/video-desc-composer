
import { useState } from "react";
import { Zap, Database, Shield, Code, AlertTriangle, Download, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const AdvancedSettings = () => {
  const [advancedSettings, setAdvancedSettings] = useState({
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

  const handleAdvancedChange = (section: string, key: string, value: any) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleExportSettings = () => {
    const allSettings = {
      ...advancedSettings,
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

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setAdvancedSettings(imported);
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

  const handleResetAdvanced = () => {
    const defaultSettings = {
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
    
    setAdvancedSettings(defaultSettings);
    toast({
      title: "Configurações resetadas",
      description: "Configurações avançadas restauradas para o padrão.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Warning */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Configurações Avançadas</h4>
              <p className="text-sm text-yellow-700">
                Essas configurações são para usuários experientes. Alterações incorretas podem afetar o desempenho da aplicação.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Configurações de Automação
          </CardTitle>
          <CardDescription>
            Controle como as operações automáticas são executadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batch-size">Tamanho do lote</Label>
              <Input
                id="batch-size"
                type="number"
                min="1"
                max="100"
                value={advancedSettings.automation.batchSize}
                onChange={(e) => handleAdvancedChange('automation', 'batchSize', parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-600">Quantos vídeos processar por vez</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interval">Intervalo (minutos)</Label>
              <Input
                id="interval"
                type="number"
                min="1"
                max="1440"
                value={advancedSettings.automation.intervalMinutes}
                onChange={(e) => handleAdvancedChange('automation', 'intervalMinutes', parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-600">Tempo entre execuções automáticas</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retries">Tentativas máximas</Label>
              <Input
                id="retries"
                type="number"
                min="1"
                max="10"
                value={advancedSettings.automation.maxRetries}
                onChange={(e) => handleAdvancedChange('automation', 'maxRetries', parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-600">Quantas vezes tentar novamente em caso de falha</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (segundos)</Label>
              <Input
                id="timeout"
                type="number"
                min="10"
                max="300"
                value={advancedSettings.automation.timeoutSeconds}
                onChange={(e) => handleAdvancedChange('automation', 'timeoutSeconds', parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-600">Tempo limite para operações da API</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Configurações de Performance
          </CardTitle>
          <CardDescription>
            Otimizações para melhorar a velocidade da aplicação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Cache habilitado</Label>
                <p className="text-sm text-gray-600">
                  Usar cache para acelerar carregamento de dados
                </p>
              </div>
              <Switch
                checked={advancedSettings.performance.cacheEnabled}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('performance', 'cacheEnabled', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Pré-carregar dados</Label>
                <p className="text-sm text-gray-600">
                  Carregar dados antecipadamente para melhor experiência
                </p>
              </div>
              <Switch
                checked={advancedSettings.performance.preloadData}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('performance', 'preloadData', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Compressão habilitada</Label>
                <p className="text-sm text-gray-600">
                  Comprimir dados para reduzir uso de banda
                </p>
              </div>
              <Switch
                checked={advancedSettings.performance.compressionEnabled}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('performance', 'compressionEnabled', checked)
                }
              />
            </div>

            {advancedSettings.performance.cacheEnabled && (
              <div className="space-y-2">
                <Label htmlFor="cache-ttl">TTL do Cache (segundos)</Label>
                <Input
                  id="cache-ttl"
                  type="number"
                  min="60"
                  max="86400"
                  value={advancedSettings.performance.cacheTTL}
                  onChange={(e) => handleAdvancedChange('performance', 'cacheTTL', parseInt(e.target.value))}
                />
                <p className="text-xs text-gray-600">Tempo de vida dos dados em cache</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Configurações de Segurança
          </CardTitle>
          <CardDescription>
            Configurações de segurança e auditoria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Exigir confirmação</Label>
                <p className="text-sm text-gray-600">
                  Solicitar confirmação para ações críticas
                </p>
              </div>
              <Switch
                checked={advancedSettings.security.requireConfirmation}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('security', 'requireConfirmation', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Log de auditoria</Label>
                <p className="text-sm text-gray-600">
                  Registrar todas as ações para auditoria
                </p>
              </div>
              <Switch
                checked={advancedSettings.security.enableAuditLog}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('security', 'enableAuditLog', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Criptografar armazenamento</Label>
                <p className="text-sm text-gray-600">
                  Criptografar dados sensíveis no navegador
                </p>
              </div>
              <Switch
                checked={advancedSettings.security.encryptStorage}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('security', 'encryptStorage', checked)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-timeout">Timeout da sessão (minutos)</Label>
              <Input
                id="session-timeout"
                type="number"
                min="15"
                max="1440"
                value={advancedSettings.security.sessionTimeout}
                onChange={(e) => handleAdvancedChange('security', 'sessionTimeout', parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-600">Tempo até desconexão automática</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Development Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Configurações de Desenvolvimento
          </CardTitle>
          <CardDescription>
            Ferramentas para debug e desenvolvimento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Modo debug</Label>
                <p className="text-sm text-gray-600">
                  Ativar informações de debug no console
                </p>
              </div>
              <Switch
                checked={advancedSettings.development.debugMode}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('development', 'debugMode', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Logs verbosos</Label>
                <p className="text-sm text-gray-600">
                  Mostrar logs detalhados de operações
                </p>
              </div>
              <Switch
                checked={advancedSettings.development.verboseLogs}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('development', 'verboseLogs', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Usar dados mock</Label>
                <p className="text-sm text-gray-600">
                  Usar dados simulados para desenvolvimento
                </p>
              </div>
              <Switch
                checked={advancedSettings.development.mockData}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('development', 'mockData', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Mostrar chamadas da API</Label>
                <p className="text-sm text-gray-600">
                  Exibir detalhes das requisições HTTP
                </p>
              </div>
              <Switch
                checked={advancedSettings.development.showApiCalls}
                onCheckedChange={(checked) => 
                  handleAdvancedChange('development', 'showApiCalls', checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Import/Export */}
      <Card>
        <CardHeader>
          <CardTitle>Backup de Configurações</CardTitle>
          <CardDescription>
            Exporte e importe suas configurações avançadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleExportSettings} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="hidden"
                id="import-settings"
              />
              <Button asChild variant="outline" className="w-full">
                <label htmlFor="import-settings" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Importar
                </label>
              </Button>
            </div>
            
            <Button onClick={handleResetAdvanced} variant="destructive">
              Resetar Tudo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedSettings;
