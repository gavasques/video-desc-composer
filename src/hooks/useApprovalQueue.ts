
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface PendingUpdate {
  id: string;
  videoId: string;
  videoTitle: string;
  videoThumbnail: string;
  blockId: string;
  blockTitle: string;
  blockType: 'static' | 'category' | 'specific';
  action: 'add' | 'remove' | 'update';
  category?: string;
  currentDescription: string;
  newDescription: string;
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
}

export const useApprovalQueue = () => {
  const [pendingUpdates, setPendingUpdates] = useState<PendingUpdate[]>([
    {
      id: '1',
      videoId: 'v1',
      videoTitle: 'Como Criar um Sistema de Blocos Modulares - Tutorial Completo',
      videoThumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      blockId: 'b1',
      blockTitle: 'Links das Redes Sociais',
      blockType: 'static',
      action: 'add',
      currentDescription: 'Descrição atual do vídeo...',
      newDescription: 'Descrição atual do vídeo...\n\n🔔 Se inscreva no canal!\n📱 Instagram: @meucanal\n🐦 Twitter: @meucanal\n💼 LinkedIn: linkedin.com/in/meucanal',
      createdAt: '2024-01-15T10:30:00Z',
      priority: 'high'
    },
    {
      id: '2',
      videoId: 'v2',
      videoTitle: 'Review: Melhor Ferramenta para Criadores de Conteúdo 2024',
      videoThumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
      blockId: 'b2',
      blockTitle: 'Call to Action Padrão',
      blockType: 'static',
      action: 'update',
      currentDescription: 'Descrição com CTA antigo...',
      newDescription: 'Descrição com CTA atualizado...\n\n👍 Deixe seu like se o vídeo foi útil!\n💬 Comente sua dúvida ou sugestão\n🔔 Ative o sininho para não perder nenhum vídeo',
      createdAt: '2024-01-15T09:15:00Z',
      priority: 'medium'
    }
  ]);

  const [selectedUpdates, setSelectedUpdates] = useState<string[]>([]);

  const handleSelectUpdate = (updateId: string, checked: boolean) => {
    if (checked) {
      setSelectedUpdates([...selectedUpdates, updateId]);
    } else {
      setSelectedUpdates(selectedUpdates.filter(id => id !== updateId));
    }
  };

  const handleSelectAll = () => {
    if (selectedUpdates.length === pendingUpdates.length) {
      setSelectedUpdates([]);
    } else {
      setSelectedUpdates(pendingUpdates.map(update => update.id));
    }
  };

  const handleApproveSelected = () => {
    const approvedCount = selectedUpdates.length;
    setPendingUpdates(pendingUpdates.filter(update => !selectedUpdates.includes(update.id)));
    setSelectedUpdates([]);
    
    toast({
      title: "Atualizações aprovadas!",
      description: `${approvedCount} vídeo(s) foram adicionados à fila de processamento do YouTube.`,
    });
  };

  const handleRejectSelected = () => {
    const rejectedCount = selectedUpdates.length;
    setPendingUpdates(pendingUpdates.filter(update => !selectedUpdates.includes(update.id)));
    setSelectedUpdates([]);
    
    toast({
      title: "Atualizações rejeitadas",
      description: `${rejectedCount} atualização(ões) foram removidas da fila.`,
    });
  };

  const approveSingleUpdate = (updateId: string) => {
    setPendingUpdates(pendingUpdates.filter(update => update.id !== updateId));
    toast({
      title: "Atualização aprovada!",
      description: "O vídeo foi adicionado à fila de processamento do YouTube.",
    });
  };

  const rejectSingleUpdate = (updateId: string) => {
    setPendingUpdates(pendingUpdates.filter(update => update.id !== updateId));
    toast({
      title: "Atualização rejeitada",
      description: "A atualização foi removida da fila.",
    });
  };

  return {
    pendingUpdates,
    selectedUpdates,
    handleSelectUpdate,
    handleSelectAll,
    handleApproveSelected,
    handleRejectSelected,
    approveSingleUpdate,
    rejectSingleUpdate
  };
};
