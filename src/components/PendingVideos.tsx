
import { useState } from "react";
import { Video, Tag, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface PendingVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  category?: string;
  assignedBlocks: string[];
  status: 'pending' | 'configured' | 'ignored';
}

interface Block {
  id: string;
  title: string;
  type: 'static' | 'category' | 'specific';
  category?: string;
}

const PendingVideos = () => {
  const [pendingVideos, setPendingVideos] = useState<PendingVideo[]>([
    {
      id: '1',
      title: 'Novo Tutorial: Automatização Avançada com IA',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      publishedAt: '2024-01-16T14:30:00Z',
      assignedBlocks: [],
      status: 'pending'
    },
    {
      id: '2',
      title: 'Live: Perguntas e Respostas da Comunidade',
      thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=300&h=200&fit=crop',
      publishedAt: '2024-01-16T12:00:00Z',
      assignedBlocks: [],
      status: 'pending'
    }
  ]);

  const [availableBlocks] = useState<Block[]>([
    { id: '1', title: 'Links das Redes Sociais', type: 'static' },
    { id: '2', title: 'Call to Action Padrão', type: 'static' },
    { id: '3', title: 'Bloco Tutorial - Introdução', type: 'category', category: 'Tutoriais' },
    { id: '4', title: 'Bloco Review - Disclaimer', type: 'category', category: 'Reviews' },
  ]);

  const [categories] = useState(['Tutoriais', 'Reviews', 'Vlogs', 'Gaming', 'Lives']);
  const [configuringVideo, setConfiguringVideo] = useState<PendingVideo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  const handleConfigureVideo = (video: PendingVideo) => {
    setConfiguringVideo(video);
    setSelectedCategory(video.category || '');
    setSelectedBlocks(video.assignedBlocks);
  };

  const handleSaveConfiguration = () => {
    if (!configuringVideo) return;

    const updatedVideos = pendingVideos.map(video => 
      video.id === configuringVideo.id 
        ? { 
            ...video, 
            category: selectedCategory,
            assignedBlocks: selectedBlocks,
            status: 'configured' as const
          }
        : video
    );

    setPendingVideos(updatedVideos);
    setConfiguringVideo(null);
    setSelectedCategory('');
    setSelectedBlocks([]);

    toast({
      title: "Vídeo configurado!",
      description: `O vídeo "${configuringVideo.title}" foi configurado com sucesso.`,
    });
  };

  const handleIgnoreVideo = (videoId: string) => {
    setPendingVideos(pendingVideos.map(video => 
      video.id === videoId 
        ? { ...video, status: 'ignored' as const }
        : video
    ));

    const video = pendingVideos.find(v => v.id === videoId);
    toast({
      title: "Vídeo ignorado",
      description: `O vídeo "${video?.title}" foi marcado para ignorar atualizações automáticas.`,
    });
  };

  const handleToggleBlock = (blockId: string) => {
    if (selectedBlocks.includes(blockId)) {
      setSelectedBlocks(selectedBlocks.filter(id => id !== blockId));
    } else {
      setSelectedBlocks([...selectedBlocks, blockId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'configured': return 'bg-green-100 text-green-800';
      case 'ignored': return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'configured': return <CheckCircle className="w-4 h-4" />;
      case 'ignored': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredBlocks = availableBlocks.filter(block => 
    block.type === 'static' || 
    block.type === 'specific' || 
    (block.type === 'category' && block.category === selectedCategory)
  );

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
          <Card key={video.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className={getStatusColor(video.status)}>
                          {getStatusIcon(video.status)}
                          <span className="ml-1 capitalize">{video.status}</span>
                        </Badge>
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleConfigureVideo(video)}
                              >
                                <Tag className="w-4 h-4 mr-2" />
                                Configurar Blocos
                              </Button>
                            </DialogTrigger>
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
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setConfiguringVideo(null)}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button 
                                    onClick={handleSaveConfiguration}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Salvar Configuração
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            onClick={() => handleIgnoreVideo(video.id)}
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
                          onClick={() => handleConfigureVideo(video)}
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
        ))}
      </div>

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
