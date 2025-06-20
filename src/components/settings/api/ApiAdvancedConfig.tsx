
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiConfiguration } from "@/types/settings";

interface ApiAdvancedConfigProps {
  config: ApiConfiguration;
  onUpdateConfig: (updates: Partial<ApiConfiguration>) => void;
}

const ApiAdvancedConfig = ({ config, onUpdateConfig }: ApiAdvancedConfigProps) => {
  const handleResetDefaults = () => {
    onUpdateConfig({
      rateLimit: 100,
      timeout: 30
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Avançadas da API</CardTitle>
        <CardDescription>
          Configurações de performance e limites
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rate-limit">Rate Limit (req/min)</Label>
            <Input
              id="rate-limit"
              type="number"
              value={config.rateLimit}
              min="1"
              max="1000"
              onChange={(e) => onUpdateConfig({ rateLimit: parseInt(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeout">Timeout (segundos)</Label>
            <Input
              id="timeout"
              type="number"
              value={config.timeout}
              min="5"
              max="120"
              onChange={(e) => onUpdateConfig({ timeout: parseInt(e.target.value) })}
            />
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full" onClick={handleResetDefaults}>
            Restaurar Configurações Padrão
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiAdvancedConfig;
