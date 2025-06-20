
import { useState } from "react";
import { Youtube, Shield, Zap, Users, Blocks } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AuthSectionProps {
  onAuthSuccess: (user: any) => void;
}

const AuthSection = ({ onAuthSuccess }: AuthSectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleYouTubeConnect = async () => {
    setIsConnecting(true);
    
    // Simulate OAuth flow
    setTimeout(() => {
      const mockUser = {
        name: "Canal Demo",
        email: "demo@youtube.com",
        channelId: "UC123456789",
        subscriberCount: "10.5K",
        videoCount: 127,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
      };
      
      onAuthSuccess(mockUser);
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-500 rounded-2xl shadow-lg">
              <Youtube className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            YT Description
            <span className="text-red-500"> Manager</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Gerencie descrições de vídeos do YouTube de forma massiva e inteligente. 
            Sistema modular de blocos para criadores de conteúdo.
          </p>
          <Button 
            onClick={handleYouTubeConnect}
            disabled={isConnecting}
            size="lg"
            className="youtube-gradient text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Conectando...
              </>
            ) : (
              <>
                <Youtube className="w-6 h-6 mr-3" />
                Conectar com YouTube
              </>
            )}
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                <Blocks className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Sistema Modular</CardTitle>
              <CardDescription>
                Organize suas descrições em blocos reutilizáveis: estáticos, específicos e por categoria
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Automação Inteligente</CardTitle>
              <CardDescription>
                Aplique mudanças em massa automaticamente. Atualize centenas de vídeos com um clique
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Interface No-Code</CardTitle>
              <CardDescription>
                Ferramenta visual intuitiva. Arraste, solte e reorganize blocos sem conhecimento técnico
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Security Notice */}
        <Card className="max-w-2xl mx-auto border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Conexão Segura OAuth
                </h3>
                <p className="text-blue-700 text-sm">
                  Utilizamos o protocolo OAuth oficial do Google/YouTube. Seus dados ficam seguros 
                  e você pode revogar o acesso a qualquer momento nas configurações da sua conta Google.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthSection;
