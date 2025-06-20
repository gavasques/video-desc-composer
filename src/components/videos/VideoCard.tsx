
import { Calendar, Eye, Edit, Tag, ToggleLeft, ToggleRight, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { VideoData } from "@/hooks/useVideoManager";

interface VideoCardProps {
  video: VideoData;
  appliedGeneralBlocks: any[];
  specificBlocks: any[];
  onViewDescription: (video: VideoData) => void;
  onPreviewBlocks: (video: VideoData) => void;
  onEditBlocks: (video: VideoData) => void;
  onToggleAutoUpdate: (videoId: string) => void;
}

const VideoCard = ({
  video,
  appliedGeneralBlocks,
  specificBlocks,
  onViewDescription,
  onPreviewBlocks,
  onEditBlocks,
  onToggleAutoUpdate
}: VideoCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Rascunho';
      case 'scheduled': return 'Agendado';
      default: return 'Desconhecido';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tutoriais': return 'bg-blue-100 text-blue-800';
      case 'Reviews': return 'bg-green-100 text-green-800';
      case 'Vlogs': return 'bg-purple-100 text-purple-800';
      case 'Gaming': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-32 h-20 object-cover rounded-lg"
            />
          </div>
          
          {/* Video Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{video.publishedAt}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views} visualizações</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={getCategoryColor(video.category)}>
                    <Tag className="w-3 h-3 mr-1" />
                    {video.category}
                  </Badge>
                  <Badge className={getStatusColor(video.status)}>
                    {getStatusLabel(video.status)}
                  </Badge>
                  {specificBlocks.length > 0 && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {specificBlocks.length} blocos específicos
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    {appliedGeneralBlocks.length} blocos automáticos
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={video.autoUpdate ? "text-green-600 border-green-200" : "text-orange-600 border-orange-200"}
                  >
                    {video.autoUpdate ? (
                      <>
                        <ToggleRight className="w-3 h-3 mr-1" />
                        Auto-update
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-3 h-3 mr-1" />
                        Manual
                      </>
                    )}
                  </Badge>
                </div>

                {/* Auto Update Control */}
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    checked={video.autoUpdate}
                    onCheckedChange={() => onToggleAutoUpdate(video.id)}
                  />
                  <span className="text-sm text-gray-600">
                    {video.autoUpdate ? 'Recebe atualizações automáticas' : 'Atualizações manuais apenas'}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDescription(video)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Descrição Atual
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onPreviewBlocks(video)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEditBlocks(video)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Blocos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
