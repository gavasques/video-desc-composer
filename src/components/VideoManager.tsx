import { useState } from "react";
import { Search, Filter, Video, Eye, Edit, Calendar, Tag, ToggleLeft, ToggleRight, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Block, BlockFormData } from "@/types/block";
import BlockForm from "./blocks/BlockForm";
import BlockPreviewDialog from "./blocks/BlockPreviewDialog";
import UpdateRelatedDialog from "./blocks/UpdateRelatedDialog";

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  views: string;
  category: string;
  hasCustomBlocks: boolean;
  blocksCount: number;
  status: 'published' | 'draft' | 'scheduled';
  autoUpdate: boolean;
  currentDescription: string;
  blocks?: Block[];
}

const VideoManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUpdateStatus, setSelectedUpdateStatus] = useState('all');
  const [viewingDescription, setViewingDescription] = useState<VideoData | null>(null);
  const [editingBlocksVideo, setEditingBlocksVideo] = useState<VideoData | null>(null);
  const [previewBlock, setPreviewBlock] = useState<Block | null>(null);
  const [updateRelatedDialog, setUpdateRelatedDialog] = useState<Block | null>(null);
  const [isEditBlockDialogOpen, setIsEditBlockDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  
  const [formData, setFormData] = useState<BlockFormData>({
    title: '',
    content: '',
    type: 'static',
    category: '',
    videoId: '',
    order: 1,
    schedule: { type: 'permanent' }
  });

  const [videos, setVideos] = useState<VideoData[]>([
    {
      id: '1',
      title: 'Como Criar um Sistema de Blocos Modulares - Tutorial Completo',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      publishedAt: '2024-01-15',
      views: '15.2K',
      category: 'Tutoriais',
      hasCustomBlocks: true,
      blocksCount: 5,
      status: 'published',
      autoUpdate: true,
      currentDescription: `Neste tutorial completo, você vai aprender como criar um sistema de blocos modulares para otimizar suas descrições no YouTube.

🎯 O que você vai aprender:
- Configuração inicial do sistema
- Criação de blocos reutilizáveis
- Automação de descrições
- Melhores práticas

📱 REDES SOCIAIS:
Instagram: @meucanal
Twitter: @meucanal
LinkedIn: linkedin.com/in/meucanal

👍 Se este vídeo foi útil, deixe seu like e se inscreva no canal!
🔔 Ative o sininho para não perder nenhum conteúdo novo!

#YouTube #Automação #Tutorial`,
      blocks: [
        {
          id: '1',
          title: 'Links das Redes Sociais',
          content: '📱 Instagram: @meucanal\n🐦 Twitter: @meucanal\n💼 LinkedIn: linkedin.com/in/meucanal',
          type: 'static',
          isActive: true,
          order: 1,
          affectedVideos: 127,
          lastModified: '2024-01-15',
          schedule: { type: 'permanent' }
        },
        {
          id: '2',
          title: 'Call to Action - Tutoriais',
          content: '👍 Se este vídeo foi útil, deixe seu like e se inscreva no canal!\n🔔 Ative o sininho para não perder nenhum conteúdo novo!\n\n#YouTube #Automação #Tutorial',
          type: 'category',
          category: 'Tutoriais',
          isActive: true,
          order: 2,
          affectedVideos: 34,
          lastModified: '2024-01-15',
          schedule: { type: 'permanent' }
        }
      ]
    },
    {
      id: '2',
      title: 'Review: Melhor Ferramenta para Criadores de Conteúdo 2024',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
      publishedAt: '2024-01-12',
      views: '8.7K',
      category: 'Reviews',
      hasCustomBlocks: true,
      blocksCount: 4,
      status: 'published',
      autoUpdate: true,
      currentDescription: `Análise completa da ferramenta mais promissora para criadores de conteúdo em 2024.

🔍 PONTOS ANALISADOS:
- Interface e usabilidade
- Recursos principais
- Preço x benefício
- Comparação com concorrentes

📱 REDES SOCIAIS:
Instagram: @meucanal
Twitter: @meucanal
LinkedIn: linkedin.com/in/meucanal

👍 Deixe seu like se o vídeo foi útil!
🔔 Ative o sininho para não perder nenhum vídeo

#Review #Ferramentas #Criadores`,
      blocks: [
        {
          id: '3',
          title: 'Análise de Reviews',
          content: '🔍 PONTOS ANALISADOS:\n- Interface e usabilidade\n- Recursos principais\n- Preço x benefício\n- Comparação com concorrentes',
          type: 'category',
          category: 'Reviews',
          isActive: true,
          order: 1,
          affectedVideos: 15,
          lastModified: '2024-01-15',
          schedule: { type: 'permanent' }
        }
      ]
    },
    {
      id: '3',
      title: 'Meu Dia Criando Conteúdo - Vlog Behind the Scenes',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop',
      publishedAt: '2024-01-10',
      views: '12.4K',
      category: 'Vlogs',
      hasCustomBlocks: false,
      blocksCount: 2,
      status: 'published',
      autoUpdate: false,
      currentDescription: `Venha comigo ver como é meu dia criando conteúdo para o YouTube! Nos bastidores da criação.

📸 O QUE VOCÊ VAI VER:
- Rotina de gravação
- Processo de edição
- Planejamento de conteúdo
- Dicas de produtividade

📱 REDES SOCIAIS:
Instagram: @meucanal
Twitter: @meucanal

#Vlog #Bastidores #YouTube`,
      blocks: []
    },
    {
      id: '4',
      title: 'Gameplay Épico: Zerando o Jogo em Modo Difícil',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=200&fit=crop',
      publishedAt: '2024-01-08',
      views: '22.1K',
      category: 'Gaming',
      hasCustomBlocks: true,
      blocksCount: 3,
      status: 'published',
      autoUpdate: true,
      currentDescription: `Gameplay completo zerando o jogo no modo mais difícil! Uma verdadeira batalha épica.

🎮 DESTAQUES DO GAMEPLAY:
- Boss fights épicas
- Estratégias avançadas
- Momentos de tensão
- Final emocionante

📱 REDES SOCIAIS:
Instagram: @meucanal
Twitter: @meucanal
LinkedIn: linkedin.com/in/meucanal

👍 Deixe seu like se curtiu o gameplay!
🔔 Ative o sininho para mais gameplays

#Gaming #Gameplay #Desafio`,
      blocks: [
        {
          id: '4',
          title: 'Gaming CTA',
          content: '🎮 DESTAQUES DO GAMEPLAY:\n- Boss fights épicas\n- Estratégias avançadas\n- Momentos de tensão\n- Final emocionante',
          type: 'category',
          category: 'Gaming',
          isActive: true,
          order: 1,
          affectedVideos: 25,
          lastModified: '2024-01-15',
          schedule: { type: 'permanent' }
        }
      ]
    },
    {
      id: '5',
      title: 'Próximo Tutorial: Automação Avançada (Preview)',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      publishedAt: '2024-01-20',
      views: '0',
      category: 'Tutoriais',
      hasCustomBlocks: false,
      blocksCount: 0,
      status: 'scheduled',
      autoUpdate: true,
      currentDescription: `Preview do próximo tutorial sobre automação avançada. Em breve no canal!

🚀 O QUE VEM POR AÍ:
- Automação completa
- Integração com APIs
- Fluxos avançados
- Casos práticos

📱 REDES SOCIAIS:
Instagram: @meucanal
Twitter: @meucanal
LinkedIn: linkedin.com/in/meucanal

🔔 Ative o sininho para ser notificado quando sair!

#Tutorial #Automação #Preview`,
      blocks: []
    }
  ]);

  const categories = ['Tutoriais', 'Reviews', 'Vlogs', 'Gaming'];

  const handleEditVideoBlocks = (video: VideoData) => {
    setEditingBlocksVideo(video);
    setIsEditBlockDialogOpen(true);
  };

  const handlePreviewVideoBlocks = (video: VideoData) => {
    if (video.blocks && video.blocks.length > 0) {
      setPreviewBlock(video.blocks[0]); // Show first block as preview
    } else {
      toast({
        title: "Nenhum bloco encontrado",
        description: "Este vídeo não possui blocos personalizados.",
      });
    }
  };

  const handleCreateBlock = () => {
    if (!editingBlocksVideo) return;

    const newBlock: Block = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      type: formData.type,
      category: formData.type === 'category' ? formData.category : undefined,
      videoId: formData.type === 'specific' ? formData.videoId : undefined,
      isActive: true,
      order: formData.order,
      affectedVideos: formData.type === 'static' ? 127 : formData.type === 'category' ? 34 : 1,
      lastModified: new Date().toISOString().split('T')[0],
      schedule: formData.schedule
    };

    // Update the video with the new block
    setVideos(videos.map(video => {
      if (video.id === editingBlocksVideo.id) {
        const updatedBlocks = [...(video.blocks || []), newBlock];
        return {
          ...video,
          blocks: updatedBlocks,
          blocksCount: updatedBlocks.length,
          hasCustomBlocks: true
        };
      }
      return video;
    }));

    resetForm();
    setIsEditBlockDialogOpen(false);
    
    toast({
      title: "Bloco criado com sucesso!",
      description: `O bloco "${newBlock.title}" foi adicionado ao vídeo "${editingBlocksVideo.title}".`,
    });
  };

  const handleEditBlock = (block: Block) => {
    setEditingBlock(block);
    setFormData({
      title: block.title,
      content: block.content,
      type: block.type,
      category: block.category || '',
      videoId: block.videoId || '',
      order: block.order,
      schedule: block.schedule || { type: 'permanent' }
    });
  };

  const handleUpdateBlock = () => {
    if (!editingBlock || !editingBlocksVideo) return;

    const updatedBlock: Block = {
      ...editingBlock,
      title: formData.title,
      content: formData.content,
      order: formData.order,
      schedule: formData.schedule,
      lastModified: new Date().toISOString().split('T')[0]
    };

    // Update the video's blocks
    setVideos(videos.map(video => {
      if (video.id === editingBlocksVideo.id) {
        const updatedBlocks = (video.blocks || []).map(block => 
          block.id === editingBlock.id ? updatedBlock : block
        );
        return {
          ...video,
          blocks: updatedBlocks
        };
      }
      return video;
    }));

    setUpdateRelatedDialog(updatedBlock);
    resetForm();
    setEditingBlock(null);
  };

  const handleUpdateRelatedVideos = (shouldUpdate: boolean) => {
    if (!updateRelatedDialog) return;

    if (shouldUpdate) {
      toast({
        title: "Atualizações programadas!",
        description: `O bloco "${updateRelatedDialog.title}" foi atualizado.`,
      });
    } else {
      toast({
        title: "Edição salva",
        description: "As alterações foram salvas sem afetar outros vídeos.",
      });
    }
    
    setUpdateRelatedDialog(null);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'static',
      category: '',
      videoId: '',
      order: 1,
      schedule: { type: 'permanent' }
    });
  };

  const handleToggleAutoUpdate = (videoId: string) => {
    setVideos(videos.map(video => {
      if (video.id === videoId) {
        const newAutoUpdate = !video.autoUpdate;
        toast({
          title: newAutoUpdate ? "Atualização automática ativada" : "Atualização automática desativada",
          description: `O vídeo "${video.title}" ${newAutoUpdate ? 'receberá' : 'não receberá'} atualizações automáticas de blocos.`,
        });
        return { ...video, autoUpdate: newAutoUpdate };
      }
      return video;
    }));
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || video.status === selectedStatus;
    const matchesUpdateStatus = selectedUpdateStatus === 'all' || 
      (selectedUpdateStatus === 'auto' && video.autoUpdate) ||
      (selectedUpdateStatus === 'manual' && !video.autoUpdate);
    return matchesSearch && matchesCategory && matchesStatus && matchesUpdateStatus;
  });

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vídeos</h2>
          <p className="text-gray-600">
            Gerencie descrições e controle atualizações automáticas
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {filteredVideos.length} vídeos
          </Badge>
          <Badge variant="outline" className="text-sm text-green-600">
            {videos.filter(v => v.autoUpdate).length} com auto-update
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar vídeos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
                <SelectItem value="scheduled">Agendados</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedUpdateStatus} onValueChange={setSelectedUpdateStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Atualização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="auto">Automática</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Edit Blocks Dialog */}
      <Dialog open={isEditBlockDialogOpen} onOpenChange={setIsEditBlockDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editar Blocos - {editingBlocksVideo?.title}</DialogTitle>
            <DialogDescription>
              Gerencie os blocos de conteúdo para este vídeo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Existing Blocks */}
            {editingBlocksVideo?.blocks && editingBlocksVideo.blocks.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Blocos Existentes</h4>
                <div className="space-y-2">
                  {editingBlocksVideo.blocks.map((block) => (
                    <div key={block.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium">{block.title}</h5>
                        <p className="text-sm text-gray-600 line-clamp-1">{block.content}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setPreviewBlock(block)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditBlock(block)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add New Block Form */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">
                {editingBlock ? 'Editar Bloco' : 'Adicionar Novo Bloco'}
              </h4>
              
              <BlockForm
                formData={formData}
                setFormData={setFormData}
                isEditing={!!editingBlock}
                onSubmit={editingBlock ? handleUpdateBlock : handleCreateBlock}
                onCancel={() => {
                  resetForm();
                  setEditingBlock(null);
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Related Dialog */}
      <UpdateRelatedDialog
        block={updateRelatedDialog}
        onOpenChange={() => setUpdateRelatedDialog(null)}
        onUpdate={handleUpdateRelatedVideos}
      />

      {/* Preview Dialog */}
      <BlockPreviewDialog
        block={previewBlock}
        onOpenChange={() => setPreviewBlock(null)}
      />

      {/* Description Preview Dialog */}
      <Dialog open={!!viewingDescription} onOpenChange={() => setViewingDescription(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Descrição Atual</DialogTitle>
            <DialogDescription>
              {viewingDescription?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={viewingDescription?.thumbnail}
                alt={viewingDescription?.title}
                className="w-32 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold">{viewingDescription?.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{viewingDescription?.category}</Badge>
                  <Badge variant="outline">{viewingDescription?.views} views</Badge>
                  <Badge variant="outline">{viewingDescription?.publishedAt}</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Descrição Completa:</h4>
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {viewingDescription?.currentDescription}
                </pre>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-500">
                Blocos aplicados: {viewingDescription?.blocksCount}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (viewingDescription) {
                      handleEditVideoBlocks(viewingDescription);
                      setViewingDescription(null);
                    }
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

      {/* Videos Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="hover:shadow-lg transition-shadow duration-300">
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
                        {video.hasCustomBlocks && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {video.blocksCount} blocos personalizados
                          </Badge>
                        )}
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
                          onCheckedChange={() => handleToggleAutoUpdate(video.id)}
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
                        onClick={() => setViewingDescription(video)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Descrição Atual
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePreviewVideoBlocks(video)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditVideoBlocks(video)}
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
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum vídeo encontrado
          </h3>
          <p className="text-gray-500">
            Tente ajustar os filtros ou termos de busca
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoManager;
