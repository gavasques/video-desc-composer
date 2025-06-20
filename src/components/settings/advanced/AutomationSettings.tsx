
import { Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AutomationConfig } from "@/types/settings";

interface AutomationSettingsProps {
  config: AutomationConfig;
  onChange: (updates: Partial<AutomationConfig>) => void;
}

const AutomationSettings = ({ config, onChange }: AutomationSettingsProps) => {
  return (
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
              value={config.batchSize}
              onChange={(e) => onChange({ batchSize: parseInt(e.target.value) })}
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
              value={config.intervalMinutes}
              onChange={(e) => onChange({ intervalMinutes: parseInt(e.target.value) })}
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
              value={config.maxRetries}
              onChange={(e) => onChange({ maxRetries: parseInt(e.target.value) })}
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
              value={config.timeoutSeconds}
              onChange={(e) => onChange({ timeoutSeconds: parseInt(e.target.value) })}
            />
            <p className="text-xs text-gray-600">Tempo limite para operações da API</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationSettings;
