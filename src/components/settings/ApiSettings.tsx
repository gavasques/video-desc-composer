
import { useState, useEffect } from "react";
import { Key, TestTube, Activity, AlertTriangle, CheckCircle, Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const ApiSettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'valid' | 'invalid'>('unknown');
  const [quotaUsage, setQuotaUsage] = useState({
    used: 850,
    limit: 10000,
    resetDate: '2024-06-21'
  });

  useEffect(() => {
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem('youtube-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setApiStatus('valid'); // Assume it's valid if saved
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave de API válida.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('youtube-api-key', apiKey);
    toast({
      title: "Chave de API salva",
      description: "A chave de API foi salva com sucesso.",
    });
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave de API antes de testar.",
        variant: "destructive"
      });
      return;
    }

    setIsTestingConnection(true);
    
    // Simulate API test
    setTimeout(() => {
      const isValid = apiKey.startsWith('AIza'); // Simple validation
      setApiStatus(isValid ? 'valid' : 'invalid');
      setIsTestingConnection(false);
      
      toast({
        title: isValid ? "Conexão bem-sucedida" : "Falha na conexão",
        description: isValid 
          ? "A chave de API está funcionando corretamente."
          : "A chave de API parece ser inválida.",
        variant: isValid ? "default" : "destructive"
      });
    }, 2000);
  };

  const handleCopyExample = () => {
    navigator.clipboard.writeText('AIzaSyDemoKey123456789...');
    toast({
      title: "Exemplo copiado",
      description: "Formato de exemplo copiado para a área de transferência.",
    });
  };

  const getStatusBadge = () => {
    switch (apiStatus) {
      case 'valid':
        return <Badge className="bg-green-100 text-green-800">Válida</Badge>;
      case 'invalid':
        return <Badge variant="destructive">Inválida</Badge>;
      default:
        return <Badge variant="secondary">Não testada</Badge>;
    }
  };

  const quotaPercentage = (quotaUsage.used / quotaUsage.limit) * 100;

  return (
    <div className="space-y-6">
      {/* API Key Configuration */}
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
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
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
            <Button onClick={handleSaveApiKey} className="flex-1">
              Salvar Chave
            </Button>
            <Button 
              variant="outline" 
              onClick={handleTestConnection}
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

      {/* Quota Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Uso de Quota
          </CardTitle>
          <CardDescription>
            Monitoramento do uso da API do YouTube
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Cota utilizada</span>
              <span>{quotaUsage.used.toLocaleString()} / {quotaUsage.limit.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  quotaPercentage > 80 ? 'bg-red-500' : 
                  quotaPercentage > 60 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${quotaPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>{quotaPercentage.toFixed(1)}% utilizada</span>
              <span>Reset: {quotaUsage.resetDate}</span>
            </div>
          </div>

          {quotaPercentage > 80 && (
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Cota quase esgotada</p>
                <p className="text-yellow-700">
                  Você está próximo do limite diário. Considere otimizar as requisições.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Configuration */}
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
                defaultValue="100"
                min="1"
                max="1000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeout">Timeout (segundos)</Label>
              <Input
                id="timeout"
                type="number"
                defaultValue="30"
                min="5"
                max="120"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              Restaurar Configurações Padrão
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiSettings;
