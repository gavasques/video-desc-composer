
import { Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DevelopmentConfig } from "@/types/settings";

interface DevelopmentSettingsProps {
  config: DevelopmentConfig;
  onChange: (updates: Partial<DevelopmentConfig>) => void;
}

const DevelopmentSettings = ({ config, onChange }: DevelopmentSettingsProps) => {
  return (
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
              checked={config.debugMode}
              onCheckedChange={(checked) => onChange({ debugMode: checked })}
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
              checked={config.verboseLogs}
              onCheckedChange={(checked) => onChange({ verboseLogs: checked })}
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
              checked={config.mockData}
              onCheckedChange={(checked) => onChange({ mockData: checked })}
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
              checked={config.showApiCalls}
              onCheckedChange={(checked) => onChange({ showApiCalls: checked })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentSettings;
