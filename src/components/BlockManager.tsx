
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Block, BlockFormData } from "@/types/block";
import BlockForm from "./blocks/BlockForm";
import BlockTabs from "./blocks/BlockTabs";
import BlockPreviewDialog from "./blocks/BlockPreviewDialog";
import UpdateRelatedDialog from "./blocks/UpdateRelatedDialog";

const BlockManager = () => {
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [previewBlock, setPreviewBlock] = useState<Block | null>(null);
  const [updateRelatedDialog, setUpdateRelatedDialog] = useState<Block | null>(null);
  
  const [formData, setFormData] = useState<BlockFormData>({
    title: '',
    content: '',
    type: 'static',
    category: '',
    videoId: '',
    order: 1,
    schedule: { type: 'permanent' }
  });

  const handleCreateBlock = () => {
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
    resetForm();
    setIsDialogOpen(false);
    
    toast({
      title: "Bloco criado com sucesso!",
      description: `O bloco "${newBlock.title}" foi adicionado à fila de aprovação para ${newBlock.affectedVideos} vídeo(s).`,
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
      schedule: {
        type: block.schedule?.type || 'permanent',
        startDate: block.schedule?.startDate,
        endDate: block.schedule?.endDate
      }
    });
    setIsDialogOpen(true);
  };

  const handleUpdateBlock = () => {
    if (!editingBlock) return;

    const updatedBlock: Block = {
      ...editingBlock,
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

    setBlocks(blocks.map(block => block.id === editingBlock.id ? updatedBlock : block));
    setUpdateRelatedDialog(updatedBlock);
    resetForm();
    setIsDialogOpen(false);
    setEditingBlock(null);
  };

  const handleUpdateRelatedVideos = (shouldUpdate: boolean) => {
    if (!updateRelatedDialog) return;

    if (shouldUpdate) {
      toast({
        title: "Atualizações programadas!",
        description: `${updateRelatedDialog.affectedVideos} vídeo(s) foram adicionados à fila de aprovação.`,
      });
    } else {
      toast({
        title: "Edição salva",
        description: "As alterações foram salvas sem afetar os vídeos existentes.",
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

  const handleToggleBlock = (blockId: string) => {
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

  const handleDeleteBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    setBlocks(blocks.filter(b => b.id !== blockId));
    
    toast({
      title: "Bloco removido",
      description: `O bloco "${block?.title}" foi removido e ${block?.affectedVideos} vídeo(s) foram adicionados à fila para remoção.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blocos Modulares</h2>
          <p className="text-gray-600">
            Gerencie blocos de conteúdo para aplicar automaticamente nas descrições
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600" onClick={() => setEditingBlock(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Bloco
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingBlock ? 'Editar Bloco' : 'Criar Novo Bloco'}
              </DialogTitle>
              <DialogDescription>
                Configure um bloco de conteúdo para aplicar nas descrições dos vídeos
              </DialogDescription>
            </DialogHeader>
            
            <BlockForm
              formData={formData}
              setFormData={setFormData}
              isEditing={!!editingBlock}
              onSubmit={editingBlock ? handleUpdateBlock : handleCreateBlock}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Update Relate4d Videos Dialog */}
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

      {/* Block Tabs */}
      <BlockTabs
        blocks={blocks}
        onEditBlock={handleEditBlock}
        onToggleBlock={handleToggleBlock}
        onDeleteBlock={handleDeleteBlock}
        onPreviewBlock={setPreviewBlock}
      />
    </div>
  );
};

export default BlockManager;
