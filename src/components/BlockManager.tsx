import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BlockFormData } from "@/types/block";
import BlockForm from "./blocks/BlockForm";
import OptimizedBlockList from "./blocks/OptimizedBlockList";
import VirtualizedBlockList from "./blocks/VirtualizedBlockList";
import BlockPreviewDialog from "./blocks/BlockPreviewDialog";
import UpdateRelatedDialog from "./blocks/UpdateRelatedDialog";
import PerformanceMonitor from "./common/PerformanceMonitor";
import { useBlockManager } from "@/hooks/useBlockManager";
import { toast } from "@/hooks/use-toast";

const BlockManager = () => {
  const { blocks, createBlock, updateBlock, toggleBlock, deleteBlock } = useBlockManager();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const [previewBlock, setPreviewBlock] = useState<any>(null);
  const [updateRelatedDialog, setUpdateRelatedDialog] = useState<any>(null);
  const [useVirtualization, setUseVirtualization] = useState(blocks.length > 50);
  
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
    createBlock(formData);
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEditBlock = (block: any) => {
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

    const updatedBlock = updateBlock(editingBlock.id, formData);
    if (updatedBlock) {
      setUpdateRelatedDialog(updatedBlock);
    }
    
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

  return (
    <div className="space-y-6">
      <PerformanceMonitor componentName="BlockManager" />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blocos Modulares</h2>
          <p className="text-gray-600">
            Gerencie blocos de conteúdo para aplicar automaticamente nas descrições
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUseVirtualization(!useVirtualization)}
          >
            {useVirtualization ? 'Lista Normal' : 'Virtualizado'}
          </Button>
          
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
      </div>

      {/* Dialogs */}
      <UpdateRelatedDialog
        block={updateRelatedDialog}
        onOpenChange={() => setUpdateRelatedDialog(null)}
        onUpdate={handleUpdateRelatedVideos}
      />

      <BlockPreviewDialog
        block={previewBlock}
        onOpenChange={() => setPreviewBlock(null)}
      />

      {/* Block List - Conditional Virtualization */}
      {useVirtualization ? (
        <VirtualizedBlockList
          blocks={blocks}
          onEdit={handleEditBlock}
          onToggle={toggleBlock}
          onDelete={deleteBlock}
          onPreview={setPreviewBlock}
          height={600}
        />
      ) : (
        <OptimizedBlockList
          blocks={blocks}
          onEdit={handleEditBlock}
          onToggle={toggleBlock}
          onDelete={deleteBlock}
          onPreview={setPreviewBlock}
        />
      )}
    </div>
  );
};

export default BlockManager;
