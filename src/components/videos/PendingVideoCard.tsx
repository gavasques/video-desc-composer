
import React from 'react';
import { Tag, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoThumbnail from "@/components/common/VideoThumbnail";
import StatusBadge from "@/components/common/StatusBadge";
import { PendingVideo } from "@/hooks/usePendingVideos";

interface PendingVideoCardProps {
  video: PendingVideo;
  onConfigure: (video: PendingVideo) => void;
  onIgnore: (videoId: string) => void;
}

const PendingVideoCard = React.memo(({ video, onConfigure, onIgnore }: PendingVideoCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <VideoThumbnail
            src={video.thumbnail}
            alt={video.title}
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <StatusBadge status={video.status} />
                  {video.category && (
                    <Badge variant="outline">
                      <Tag className="w-3 h-3 mr-1" />
                      {video.category}
                    </Badge>
                  )}
                  {video.assignedBlocks.length > 0 && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {video.assignedBlocks.length} blocos
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(video.publishedAt).toLocaleString('pt-BR')}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {video.status === 'pending' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onConfigure(video)}
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      Configurar Blocos
                    </Button>
                    
                    <Button
                      onClick={() => onIgnore(video.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Ignorar
                    </Button>
                  </>
                )}
                
                {video.status === 'configured' && (
                  <Button
                    onClick={() => onConfigure(video)}
                    variant="outline"
                    size="sm"
                  >
                    Reconfigurar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PendingVideoCard.displayName = 'PendingVideoCard';

export default PendingVideoCard;
