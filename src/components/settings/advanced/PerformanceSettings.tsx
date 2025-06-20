
import { Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PerformanceConfig } from "@/types/settings";

interface PerformanceSettingsProps {
  config: PerformanceConfig;
  onChange: (updates: Partial<PerformanceConfig>) => void;
}

const PerformanceSettings = ({ config, onChange }: PerformanceSettingsProps) => {
  return (
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
              checked={config.cacheEnabled}
              onCheckedChange={(checked) => onChange({ cacheEnabled: checked })}
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
              checked={config.preloadData}
              onCheckedChange={(checked) => onChange({ preloadData: checked })}
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
              checked={config.compressionEnabled}
              onCheckedChange={(checked) => onChange({ compressionEnabled: checked })}
            />
          </div>

          {config.cacheEnabled && (
            <div className="space-y-2">
              <Label htmlFor="cache-ttl">TTL do Cache (segundos)</Label>
              <Input
                id="cache-ttl"
                type="number"
                min="60"
                max="86400"
                value={config.cacheTTL}
                onChange={(e) => onChange({ cacheTTL: parseInt(e.target.value) })}
              />
              <p className="text-xs text-gray-600">Tempo de vida dos dados em cache</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceSettings;
