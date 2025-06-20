
import { Youtube, Users, Video, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChannelStats } from "@/types/settings";

interface ChannelStatisticsProps {
  stats: ChannelStats;
}

const ChannelStatistics = ({ stats }: ChannelStatisticsProps) => {
  return (
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
            <div className="text-2xl font-bold text-gray-900">{stats.subscriberCount}</div>
            <div className="text-sm text-gray-600">Inscritos</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <Video className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.videoCount}</div>
            <div className="text-sm text-gray-600">Vídeos</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalViews}</div>
            <div className="text-sm text-gray-600">Visualizações</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelStatistics;
