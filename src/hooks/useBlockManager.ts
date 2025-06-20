
import { useState } from "react";
import { Block, BlockFormData } from "@/types/block";
import { toast } from "@/hooks/use-toast";

export const useBlockManager = () => {
  const [blocks, setBlocks] = useState<Block[]>([
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
      title: 'Call to Action Padrão',
      content: '👍 Deixe seu like se o vídeo foi útil!\n💬 Comente sua dúvida ou sugestão\n🔔 Ative o sininho para não perder nenhum vídeo',
      type: 'static',
      isActive: true,
      order: 2,
      affectedVideos: 127,
      lastModified: '2024-01-15',
      schedule: { type: 'permanent' }
    },
    {
      id: '3',
      title: 'Bloco de Tutoriais',
      content: 'Confira nossa playlist completa de tutoriais!\n[Link para a playlist]',
      type: 'category',
      category: 'Tutoriais',
      isActive: true,
      order: 1,
      affectedVideos: 34,
      lastModified: '2024-01-15',
      schedule: { type: 'permanent' }
    }
  ]);

  const createBlock = (formData: BlockFormData) => {
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
      schedule: formData.schedule.type === 'specific' ? {
        type: 'specific',
        startDate: formData.schedule.startDate,
        endDate: formData.schedule.endDate
      } : { type: 'permanent' }
    };

    setBlocks([...blocks, newBlock]);
    
    toast({
      title: "Bloco criado com sucesso!",
      description: `O bloco "${newBlock.title}" foi adicionado à fila de aprovação para ${newBlock.affectedVideos} vídeo(s).`,
    });

    return newBlock;
  };

  const updateBlock = (blockId: string, formData: BlockFormData) => {
    const blockToUpdate = blocks.find(b => b.id === blockId);
    if (!blockToUpdate) return null;

    const updatedBlock: Block = {
      ...blockToUpdate,
      title: formData.title,
      content: formData.content,
      order: formData.order,
      schedule: formData.schedule.type === 'specific' ? {
        type: 'specific',
        startDate: formData.schedule.startDate,
        endDate: formData.schedule.endDate
      } : { type: 'permanent' },
      lastModified: new Date().toISOString().split('T')[0]
    };

    setBlocks(blocks.map(block => block.id === blockId ? updatedBlock : block));
    return updatedBlock;
  };

  const toggleBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;

    setBlocks(blocks.map(b => 
      b.id === blockId ? { ...b, isActive: !b.isActive } : b
    ));

    toast({
      title: `Bloco ${block.isActive ? 'desativado' : 'ativado'}!`,
      description: `${block.affectedVideos} vídeo(s) foram adicionados à fila de aprovação.`,
    });
  };

  const deleteBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    setBlocks(blocks.filter(b => b.id !== blockId));
    
    toast({
      title: "Bloco removido",
      description: `O bloco "${block?.title}" foi removido e ${block?.affectedVideos} vídeo(s) foram adicionados à fila para remoção.`,
    });
  };

  return {
    blocks,
    createBlock,
    updateBlock,
    toggleBlock,
    deleteBlock
  };
};
