
import { useState } from "react";
import { Shield, Youtube, Key, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const AuthSettings = () => {
  const [authStatus, setAuthStatus] = useState({
    isConnected: true,
    scopes: ['youtube.readonly', 'youtube', 'youtube.upload'],
    tokenExpiry: '2024-07-20T10:30:00Z',
    lastRefresh: '2024-06-20T08:15:00Z'
  });

  const handleRefreshToken = async () => {
    toast({
      title: "Renovando token...",
      description: "Aguarde enquanto renovamos seu token de acesso.",
    });

    // Simulate token refresh
    setTimeout(() => {
      setAuthStatus(prev => ({
        ...prev,
        tokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastRefresh: new Date().toISOString()
      }));

      toast({
        title: "Token renovado",
        description: "Seu token de acesso foi renovado com sucesso.",
      });
    }, 2000);
  };

  const handleRevokeAccess = () => {
    toast({
      title: "Acesso revogado",
      description: "Todas as permissões foram revogadas. Você precisará reconectar sua conta.",
      variant: "destructive"
    });

    setAuthStatus(prev => ({
      ...prev,
      isConnected: false
    }));
  };

  const handleReauthorize = () => {
    toast({
      title: "Redirecionando...",
      description: "Você será redirecionado para autorizar novamente.",
    });
  };

  const isTokenExpiringSoon = () => {
    const expiryDate = new Date(authStatus.tokenExpiry);
    const now = new Date();
    const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilExpiry < 24;
  };

  const getScopeDescription = (scope: string) => {
    const descriptions: Record<string, string> = {
      'youtube.readonly': 'Visualizar informações do canal',
      'youtube': 'Gerenciar vídeos e metadados',
      'youtube.upload': 'Fazer upload de vídeos'
    };
    return descriptions[scope] || scope;
  };

  return (
    <div className="space-y-6">
      {/* Auth Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Status de Autenticação
          </CardTitle>
          <CardDescription>
            Status atual da conexão OAuth com o YouTube
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Youtube className="w-6 h-6 text-red-500" />
              <div>
                <h4 className="font-medium">YouTube API</h4>
                <p className="text-sm text-gray-600">
                  {authStatus.isConnected ? 'Conectado e autorizado' : 'Não conectado'}
                </p>
              </div>
            </div>
            <Badge 
              variant={authStatus.isConnected ? 'default' : 'destructive'}
              className={authStatus.isConnected ? 'bg-green-100 text-green-800' : ''}
            >
              {authStatus.isConnected ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Conectado
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Desconectado
                </>
              )}
            </Badge>
          </div>

          {authStatus.isConnected && isTokenExpiringSoon() && (
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Token expirando em breve</p>
                <p className="text-yellow-700">
                  Seu token de acesso expirará em menos de 24 horas. Considere renová-lo.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Token Information */}
      {authStatus.isConnected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Informações do Token
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Expira em</label>
                <p className="text-sm text-gray-900">
                  {new Date(authStatus.tokenExpiry).toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Última renovação</label>
                <p className="text-sm text-gray-900">
                  {new Date(authStatus.lastRefresh).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleRefreshToken} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Renovar Token
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Permissões Concedidas</CardTitle>
          <CardDescription>
            Escopos de acesso autorizados para sua aplicação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {authStatus.isConnected ? (
            <div className="space-y-3">
              {authStatus.scopes.map((scope) => (
                <div key={scope} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{scope}</p>
                    <p className="text-xs text-gray-600">{getScopeDescription(scope)}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Ativo
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhuma permissão concedida</p>
              <p className="text-sm text-gray-500">Conecte sua conta para ver as permissões</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações de Autenticação</CardTitle>
          <CardDescription>
            Gerencie sua conexão e permissões
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authStatus.isConnected ? (
              <>
                <Button onClick={handleReauthorize} variant="outline">
                  Reautorizar
                </Button>
                <Button onClick={handleRevokeAccess} variant="destructive">
                  Revogar Acesso
                </Button>
              </>
            ) : (
              <Button onClick={handleReauthorize} className="col-span-2">
                <Youtube className="w-4 h-4 mr-2" />
                Conectar ao YouTube
              </Button>
            )}
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Nota:</strong> As permissões são gerenciadas através do OAuth 2.0 do Google.
              </p>
              <p>
                Você pode revogar o acesso a qualquer momento através das{" "}
                <a 
                  href="https://myaccount.google.com/permissions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  configurações da sua conta Google
                </a>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthSettings;
