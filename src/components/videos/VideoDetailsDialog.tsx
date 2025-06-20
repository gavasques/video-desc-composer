
import { Edit, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoData } from "@/hooks/useVideoManager";

interface VideoDetailsDialogProps {
  video: VideoData | null;
  appliedGeneralBlocks: any[];
  specificBlocks: any[];
  onClose: () => void;
  onEditBlocks: (video: VideoData) => void;
}

const VideoDetailsDialog = ({
  video,
  appliedGeneralBlocks,
  specificBlocks,
  onClose,
  onEditBlocks
}: VideoDetailsDialogProps) => {
  if (!video) return null;

  return (
    <Dialog open={!!video} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Descrição Atual</DialogTitle>
          <DialogDescription>
            {video.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-32 h-20 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-semibold">{video.title}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline">{video.category}</Badge>
                <Badge variant="outline">{video.views} views</Badge>
                <Badge variant="outline">{video.publishedAt}</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Descrição Completa:</h4>
            <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {video.currentDescription}
              </pre>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-500">
              Blocos aplicados: {appliedGeneralBlocks.length + specificBlocks.length}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={() => {
                  onEditBlocks(video);
                  onClose();
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar Blocos
              </Button>
              <Button>
                Atualizar Descrição
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDetailsDialog;
