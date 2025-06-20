
import { useQuery } from "@tanstack/react-query";
import { Video, Eye, Clock, TrendingUp, Blocks, Tags } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Mock data for dashboard
  const { data: stats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => Promise.resolve({
      totalVideos: 127,
      videosWithCustomBlocks: 89,
      totalBlocks: 23,
      categories: 8,
      recentActivity: [
        { id: 1, action: "Bloco estático atualizado", time: "5 min atrás", type: "update" },
        { id: 2, action: "Nova categoria criada", time: "1 hora atrás", type: "create" },
        { id: 3, action: "15 vídeos atualizados", time: "2 horas atrás", type: "batch" },
        { id: 4, action: "Bloco de categoria editado", time: "1 dia atrás", type: "update" }
      ],
      topCategories: [
        { name: "Tutoriais", videos: 34, color: "bg-blue-500" },
        { name: "Reviews", videos: 28, color: "bg-green-500" },
        { name: "Vlogs", videos: 21, color: "bg-purple-500" },
        { name: "Gaming", videos: 18, color: "bg-orange-500" }
      ]
    }),
  });

  const completionPercentage = stats ? Math.round((stats.videosWithCustomBlocks / stats.totalVideos) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Vídeos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalVideos}</div>
            <p className="text-xs text-muted-foreground">
              +3 novos esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocos Ativos</CardTitle>
            <Blocks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalBlocks}</div>
            <p className="text-xs text-muted-foreground">
              7 estáticos, 16 específicos
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.categories}</div>
            <p className="text-xs text-muted-foreground">
              4 categorias ativas
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              vídeos com blocos personalizados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso de Personalização</CardTitle>
            <CardDescription>
              Vídeos com descrições personalizadas usando blocos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Vídeos Personalizados</span>
                <span>{stats?.videosWithCustomBlocks}/{stats?.totalVideos}</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats?.videosWithCustomBlocks}</div>
                <div className="text-sm text-green-700">Personalizados</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">
                  {stats ? stats.totalVideos - stats.videosWithCustomBlocks : 0}
                </div>
                <div className="text-sm text-gray-700">Padrão</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Principais Categorias</CardTitle>
            <CardDescription>
              Distribuição de vídeos por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.topCategories.map((category, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.videos} vídeos</span>
                    </div>
                    <Progress 
                      value={(category.videos / (stats?.totalVideos || 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Atividade Recente
          </CardTitle>
          <CardDescription>
            Últimas alterações no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'create' ? 'bg-green-500' :
                  activity.type === 'update' ? 'bg-blue-500' :
                  activity.type === 'batch' ? 'bg-purple-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{activity.action}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
