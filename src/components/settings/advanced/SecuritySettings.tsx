
import { Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SecurityConfig } from "@/types/settings";

interface SecuritySettingsProps {
  config: SecurityConfig;
  onChange: (updates: Partial<SecurityConfig>) => void;
}

const SecuritySettings = ({ config, onChange }: SecuritySettingsProps) => {
  return (
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
              checked={config.requireConfirmation}
              onCheckedChange={(checked) => onChange({ requireConfirmation: checked })}
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
              checked={config.enableAuditLog}
              onCheckedChange={(checked) => onChange({ enableAuditLog: checked })}
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
              checked={config.encryptStorage}
              onCheckedChange={(checked) => onChange({ encryptStorage: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-timeout">Timeout da sessão (minutos)</Label>
            <Input
              id="session-timeout"
              type="number"
              min="15"
              max="1440"
              value={config.sessionTimeout}
              onChange={(e) => onChange({ sessionTimeout: parseInt(e.target.value) })}
            />
            <p className="text-xs text-gray-600">Tempo até desconexão automática</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
