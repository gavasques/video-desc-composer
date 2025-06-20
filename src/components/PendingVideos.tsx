
import React, { useState } from "react";
import { Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePendingVideos, PendingVideo } from "@/hooks/usePendingVideos";
import PendingVideoCard from "@/components/videos/PendingVideoCard";
import VideoConfigurationDialog from "@/components/videos/VideoConfigurationDialog";

const PendingVideos = () => {
  const {
    pendingVideos,
    categories,
    updateVideoConfiguration,
    ignoreVideo,
    getFilteredBlocks
  } = usePendingVideos();

  const [configuringVideo, setConfiguringVideo] = useState<PendingVideo | null>(null);

  const handleConfigureVideo = (video: PendingVideo) => {
    setConfiguringVideo(video);
  };

  const handleSaveConfiguration = (videoId: string, category: string, selectedBlocks: string[]) => {
    updateVideoConfiguration(videoId, category, selectedBlocks);
    setConfiguringVideo(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vídeos Pendentes</h2>
          <p className="text-gray-600">
            Configure blocos para novos vídeos antes da automação
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {pendingVideos.filter(v => v.status === 'pending').length} pendentes
          </Badge>
        </div>
      </div>

      {/* Videos List */}
      <div className="space-y-4">
        {pendingVideos.map((video) => (
          <PendingVideoCard
            key={video.id}
            video={video}
            onConfigure={handleConfigureVideo}
            onIgnore={ignoreVideo}
          />
        ))}
      </div>

      {/* Configuration Dialog */}
      <VideoConfigurationDialog
        video={configuringVideo}
        categories={categories}
        getFilteredBlocks={getFilteredBlocks}
        onSave={handleSaveConfiguration}
        onClose={() => setConfiguringVideo(null)}
      />

      {/* Empty State */}
      {pendingVideos.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum vídeo pendente
          </h3>
          <p className="text-gray-500">
            Novos vídeos aparecerão aqui para configuração de blocos
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingVideos;
