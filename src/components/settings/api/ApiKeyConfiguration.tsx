
import { Key, TestTube, Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ApiConfiguration } from "@/types/settings";

interface ApiKeyConfigurationProps {
  config: ApiConfiguration;
  onSave: (key: string) => void;
  onTest: (key: string) => Promise<string>;
  isTestingConnection: boolean;
}

const ApiKeyConfiguration = ({ config, onSave, onTest, isTestingConnection }: ApiKeyConfigurationProps) => {
  const handleCopyExample = () => {
    navigator.clipboard.writeText('AIzaSyDemoKey123456789...');
    toast({
      title: "Exemplo copiado",
      description: "Formato de exemplo copiado para a área de transferência.",
    });
  };

  const getStatusBadge = () => {
    switch (config.status) {
      case 'valid':
        return <Badge className="bg-green-100 text-green-800">Válida</Badge>;
      case 'invalid':
        return <Badge variant="destructive">Inválida</Badge>;
      default:
        return <Badge variant="secondary">Não testada</Badge>;
    }
  };

  const handleTest = async () => {
    await onTest(config.key);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          YouTube Data API
        </CardTitle>
        <CardDescription>
          Configure sua chave de API do YouTube Data API v3
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="api-key">Chave de API</Label>
            {getStatusBadge()}
          </div>
          <div className="flex gap-2">
            <Input
              id="api-key"
              type="password"
              placeholder="AIzaSy..."
              value={config.key}
              onChange={(e) => {/* handled by parent */}}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleCopyExample}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Obtenha sua chave em{" "}
            <a 
              href="https://console.cloud.google.com/apis/credentials" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => onSave(config.key)} className="flex-1">
            Salvar Chave
          </Button>
          <Button 
            variant="outline" 
            onClick={handleTest}
            disabled={isTestingConnection}
            className="flex-1"
          >
            {isTestingConnection ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Testando...
              </>
            ) : (
              <>
                <TestTube className="w-4 h-4 mr-2" />
                Testar Conexão
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyConfiguration;
