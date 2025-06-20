import { useState, useMemo, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { Block, BlockFormData } from "@/types/block";

export interface VideoData {
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

export const useOptimizedVideoManager = () => {
  const [videos, setVideos] = useState<VideoData[]>([
    {
      id: '1',
      title: 'Como criar automações no YouTube - Tutorial Completo',
      thumbnail: '/placeholder.svg',
      publishedAt: '2024-01-15',
      views: '12.5K',
      category: 'Tutoriais',
      hasCustomBlocks: true,
      blocksCount: 3,
      status: 'published',
      autoUpdate: true,
      currentDescription: 'Neste vídeo você vai aprender como criar automações incríveis para o YouTube...\n\n📱 Instagram: @meucanal\n🐦 Twitter: @meucanal\n💼 LinkedIn: linkedin.com/in/meucanal\n\n👍 Se este vídeo foi útil, deixe seu like e se inscreva no canal!\n🔔 Ative o sininho para não perder nenhum conteúdo novo!\n\n#YouTube #Automação #Tutorial',
      blocks: [
        {
          id: 'video-1-block-1',
          title: 'Links dos Recursos Mencionados',
          content: '🔗 Ferramenta A: https://exemplo.com/ferramenta-a\n🔗 Ferramenta B: https://exemplo.com/ferramenta-b\n📋 Template gratuito: https://exemplo.com/template',
          type: 'specific',
          videoId: '1',
          isActive: true,
          order: 2,
          affectedVideos: 1,
          lastModified: '2024-01-15',
          schedule: { type: 'permanent' }
        }
      ]
    },
    {
      id: '2',
      title: 'Review: Melhor ferramenta de edição de vídeo 2024',
      thumbnail: '/placeholder.svg',
      publishedAt: '2024-01-10',
      views: '8.2K',
      category: 'Reviews',
      hasCustomBlocks: false,
      blocksCount: 2,
      status: 'published',
      autoUpdate: true,
      currentDescription: 'Hoje vamos fazer uma review completa da melhor ferramenta de edição...\n\n📱 Instagram: @meucanal\n🐦 Twitter: @meucanal\n💼 LinkedIn: linkedin.com/in/meucanal\n\n🔍 Gostou da review? Deixe seu like e se inscreva!\n💬 Comente qual ferramenta quer ver revisada!\n\n#Review #Análise #Ferramentas',
      blocks: []
    },
    {
      id: '3',
      title: 'Vlog: Um dia na vida de um criador de conteúdo',
      thumbnail: '/placeholder.svg',
      publishedAt: '2024-01-08',
      views: '15.1K',
      category: 'Vlogs',
      hasCustomBlocks: false,
      blocksCount: 1,
      status: 'published',
      autoUpdate: false,
      currentDescription: 'Venha comigo neste vlog e veja como é um dia na vida de um criador...\n\n📱 Instagram: @meucanal\n🐦 Twitter: @meucanal\n💼 LinkedIn: linkedin.com/in/meucanal',
      blocks: []
    }
  ]);

  const [generalBlocks] = useState<Block[]>([
    {
      id: 'general-1',
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
      id: 'general-2',
      title: 'Call to Action - Tutoriais',
      content: '👍 Se este vídeo foi útil, deixe seu like e se inscreva no canal!\n🔔 Ative o sininho para não perder nenhum conteúdo novo!\n\n#YouTube #Automação #Tutorial',
      type: 'category',
      category: 'Tutoriais',
      isActive: true,
      order: 2,
      affectedVideos: 34,
      lastModified: '2024-01-15',
      schedule: { type: 'permanent' }
    },
    {
      id: 'general-3',
      title: 'Call to Action - Reviews',
      content: '🔍 Gostou da review? Deixe seu like e se inscreva!\n💬 Comente qual ferramenta quer ver revisada!\n\n#Review #Análise #Ferramentas',
      type: 'category',
      category: 'Reviews',
      isActive: true,
      order: 1,
      affectedVideos: 15,
      lastModified: '2024-01-15',
      schedule: { type: 'permanent' }
    }
  ]);

  const categories = useMemo(() => ['Tutoriais', 'Reviews', 'Vlogs', 'Gaming'], []);

  // Memoized function to get applied general blocks for a specific video
  const getAppliedGeneralBlocks = useCallback((video: VideoData) => {
    return generalBlocks.filter(block => {
      if (!block.isActive) return false;
      
      if (block.type === 'static') return true;
      if (block.type === 'category' && block.category === video.category) return true;
      
      return false;
    });
  }, [generalBlocks]);

  // Memoized function to get only specific blocks for a video
  const getSpecificBlocks = useCallback((video: VideoData) => {
    return video.blocks?.filter(block => block.type === 'specific') || [];
  }, []);

  const handleToggleAutoUpdate = useCallback((videoId: string) => {
    setVideos(prevVideos => prevVideos.map(video => {
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
  }, []);

  const handleCreateBlock = useCallback((formData: BlockFormData, editingBlocksVideo: VideoData) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      type: 'specific',
      videoId: editingBlocksVideo.id,
      isActive: true,
      order: formData.order,
      affectedVideos: 1,
      lastModified: new Date().toISOString().split('T')[0],
      schedule: formData.schedule
    };

    setVideos(prevVideos => prevVideos.map(video => {
      if (video.id === editingBlocksVideo.id) {
        const updatedBlocks = [...(video.blocks || []), newBlock];
        return {
          ...video,
          blocks: updatedBlocks,
          hasCustomBlocks: true
        };
      }
      return video;
    }));

    toast({
      title: "Bloco específico criado com sucesso!",
      description: `O bloco "${newBlock.title}" foi adicionado ao vídeo "${editingBlocksVideo.title}".`,
    });
  }, []);

  const handleUpdateBlock = useCallback((editingBlock: Block, formData: BlockFormData, editingBlocksVideo: VideoData) => {
    const updatedBlock: Block = {
      ...editingBlock,
      title: formData.title,
      content: formData.content,
      order: formData.order,
      schedule: formData.schedule,
      lastModified: new Date().toISOString().split('T')[0]
    };

    setVideos(prevVideos => prevVideos.map(video => {
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

    toast({
      title: "Bloco específico atualizado!",
      description: `O bloco "${updatedBlock.title}" foi atualizado.`,
    });
  }, []);

  const handleDeleteSpecificBlock = useCallback((blockId: string, editingBlocksVideo: VideoData) => {
    setVideos(prevVideos => prevVideos.map(video => {
      if (video.id === editingBlocksVideo.id) {
        const updatedBlocks = (video.blocks || []).filter(block => block.id !== blockId);
        return {
          ...video,
          blocks: updatedBlocks,
          hasCustomBlocks: updatedBlocks.length > 0
        };
      }
      return video;
    }));

    toast({
      title: "Bloco removido",
      description: "O bloco específico foi removido do vídeo.",
    });
  }, []);

  return {
    videos,
    generalBlocks,
    categories,
    getAppliedGeneralBlocks,
    getSpecificBlocks,
    handleToggleAutoUpdate,
    handleCreateBlock,
    handleUpdateBlock,
    handleDeleteSpecificBlock
  };
};
