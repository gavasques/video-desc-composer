
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface PendingVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  category?: string;
  assignedBlocks: string[];
  status: 'pending' | 'configured' | 'ignored';
}

export interface Block {
  id: string;
  title: string;
  type: 'static' | 'category' | 'specific';
  category?: string;
}

export const usePendingVideos = () => {
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

  const updateVideoConfiguration = (videoId: string, category: string, selectedBlocks: string[]) => {
    const updatedVideos = pendingVideos.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            category,
            assignedBlocks: selectedBlocks,
            status: 'configured' as const
          }
        : video
    );

    setPendingVideos(updatedVideos);
    
    const video = pendingVideos.find(v => v.id === videoId);
    toast({
      title: "Vídeo configurado!",
      description: `O vídeo "${video?.title}" foi configurado com sucesso.`,
    });
  };

  const ignoreVideo = (videoId: string) => {
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

  const getFilteredBlocks = (selectedCategory: string) => {
    return availableBlocks.filter(block => 
      block.type === 'static' || 
      block.type === 'specific' || 
      (block.type === 'category' && block.category === selectedCategory)
    );
  };

  return {
    pendingVideos,
    availableBlocks,
    categories,
    updateVideoConfiguration,
    ignoreVideo,
    getFilteredBlocks
  };
};
