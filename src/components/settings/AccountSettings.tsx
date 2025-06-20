
import { useState, useEffect } from "react";
import { User, Youtube, Users, Video, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Load user info from localStorage or mock data
    const mockUserInfo = {
      name: "Canal Demo",
      email: "demo@youtube.com",
      channelId: "UC123456789",
      subscriberCount: "10.5K",
      videoCount: 127,
      totalViews: "1.2M",
      joinedDate: "2020-03-15",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      connectionStatus: "connected"
    };
    setUserInfo(mockUserInfo);
  }, []);

  const handleDisconnect = () => {
    toast({
      title: "Canal desconectado",
      description: "Sua conta do YouTube foi desconectada com sucesso.",
    });
  };

  const handleReconnect = () => {
    toast({
      title: "Reconectando...",
      description: "Redirecionando para autenticação do YouTube.",
    });
  };

  if (!userInfo) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informações da Conta
          </CardTitle>
          <CardDescription>
            Dados do seu canal do YouTube conectado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <img
              src={userInfo.avatar}
              alt={userInfo.name}
              className="w-16 h-16 rounded-full border-2 border-gray-200"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">{userInfo.name}</h3>
                {userInfo.isVerified && (
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                )}
                <Badge 
                  variant={userInfo.connectionStatus === 'connected' ? 'default' : 'destructive'}
                  className="ml-2"
                >
                  {userInfo.connectionStatus === 'connected' ? 'Conectado' : 'Desconectado'}
                </Badge>
              </div>
              <p className="text-gray-600 mb-1">{userInfo.email}</p>
              <p className="text-sm text-gray-500">ID do Canal: {userInfo.channelId}</p>
              <p className="text-sm text-gray-500">Membro desde: {new Date(userInfo.joinedDate).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channel Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            Estatísticas do Canal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
              <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{userInfo.subscriberCount}</div>
              <div className="text-sm text-gray-600">Inscritos</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <Video className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{userInfo.videoCount}</div>
              <div className="text-sm text-gray-600">Vídeos</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{userInfo.totalViews}</div>
              <div className="text-sm text-gray-600">Visualizações</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Conexão</CardTitle>
          <CardDescription>
            Controle a conexão com sua conta do YouTube
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Status da Conexão</h4>
              <p className="text-sm text-gray-600">
                {userInfo.connectionStatus === 'connected' 
                  ? 'Sua conta está conectada e funcionando normalmente'
                  : 'Sua conta não está conectada'
                }
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleReconnect}
                disabled={userInfo.connectionStatus === 'connected'}
              >
                Reconectar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDisconnect}
                disabled={userInfo.connectionStatus !== 'connected'}
              >
                Desconectar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
