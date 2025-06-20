
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardChartsProps {
  stats?: {
    totalVideos: number;
    videosWithCustomBlocks: number;
    topCategories: Array<{
      name: string;
      videos: number;
      color: string;
    }>;
  };
}

const DashboardCharts = ({ stats }: DashboardChartsProps) => {
  const completionPercentage = stats ? Math.round((stats.videosWithCustomBlocks / stats.totalVideos) * 100) : 0;

  return (
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
  );
};

export default DashboardCharts;
