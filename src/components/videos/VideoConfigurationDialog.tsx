
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PendingVideo, Block } from "@/hooks/usePendingVideos";

interface VideoConfigurationDialogProps {
  video: PendingVideo | null;
  categories: string[];
  getFilteredBlocks: (category: string) => Block[];
  onSave: (videoId: string, category: string, selectedBlocks: string[]) => void;
  onClose: () => void;
}

const VideoConfigurationDialog = ({ video, categories, getFilteredBlocks, onSave, onClose }: VideoConfigurationDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  useEffect(() => {
    if (video) {
      setSelectedCategory(video.category || '');
      setSelectedBlocks(video.assignedBlocks);
    }
  }, [video]);

  const handleToggleBlock = (blockId: string) => {
    if (selectedBlocks.includes(blockId)) {
      setSelectedBlocks(selectedBlocks.filter(id => id !== blockId));
    } else {
      setSelectedBlocks([...selectedBlocks, blockId]);
    }
  };

  const handleSave = () => {
    if (!video) return;
    onSave(video.id, selectedCategory, selectedBlocks);
    onClose();
  };

  const filteredBlocks = getFilteredBlocks(selectedCategory);

  return (
    <Dialog open={!!video} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configurar Blocos</DialogTitle>
          <DialogDescription>
            Defina a categoria e blocos para este vídeo
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="video-category">Categoria do Vídeo</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Blocos Disponíveis</Label>
            <div className="space-y-2 mt-2">
              {filteredBlocks.map(block => (
                <div key={block.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedBlocks.includes(block.id)}
                    onCheckedChange={() => handleToggleBlock(block.id)}
                  />
                  <span className="text-sm">{block.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {block.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              Salvar Configuração
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoConfigurationDialog;
