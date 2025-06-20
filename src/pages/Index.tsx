
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Youtube, Settings, Video, Blocks, Tags, Calendar, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import AuthSection from "@/components/AuthSection";
import Dashboard from "@/components/Dashboard";
import VideoManager from "@/components/VideoManager";
import BlockManager from "@/components/BlockManager";
import CategoryManager from "@/components/CategoryManager";
import ApprovalQueue from "@/components/ApprovalQueue";
import PendingVideos from "@/components/PendingVideos";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Mock authentication status check
  const { data: authStatus } = useQuery({
    queryKey: ['authStatus'],
    queryFn: () => Promise.resolve({ authenticated: isAuthenticated, user: userInfo }),
  });

  const handleAuthSuccess = (user: any) => {
    setIsAuthenticated(true);
    setUserInfo(user);
    toast({
      title: "Conectado com sucesso!",
      description: `Bem-vindo, ${user.name}. Sua conta do YouTube foi conectada.`,
    });
  };

  if (!isAuthenticated) {
    return <AuthSection onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  YT Description Manager
                </h1>
                <p className="text-sm text-gray-500">
                  Gerencie suas descrições de forma inteligente
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">
                  Conectado
                </span>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-fit">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="blocks" className="flex items-center gap-2">
              <Blocks className="w-4 h-4" />
              <span className="hidden sm:inline">Blocos</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tags className="w-4 h-4" />
              <span className="hidden sm:inline">Categorias</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Vídeos</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Pendentes</span>
            </TabsTrigger>
            <TabsTrigger value="approval" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Aprovação</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Agenda</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="blocks">
            <BlockManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="videos">
            <VideoManager />
          </TabsContent>

          <TabsContent value="pending">
            <PendingVideos />
          </TabsContent>

          <TabsContent value="approval">
            <ApprovalQueue />
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Agendamento de Blocos
                </CardTitle>
                <CardDescription>
                  Configure quando seus blocos devem ser ativados ou desativados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Funcionalidade em Desenvolvimento
                  </h3>
                  <p className="text-gray-500">
                    O sistema de agendamento será implementado na próxima versão
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
