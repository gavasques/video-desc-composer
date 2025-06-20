
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Block } from "@/types/block";

interface UpdateRelatedDialogProps {
  block: Block | null;
  onOpenChange: (open: boolean) => void;
  onUpdate: (shouldUpdate: boolean) => void;
}

const UpdateRelatedDialog = ({ block, onOpenChange, onUpdate }: UpdateRelatedDialogProps) => {
  return (
    <Dialog open={!!block} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Atualizar Vídeos Relacionados?
          </DialogTitle>
          <DialogDescription>
            Você editou o bloco "{block?.title}". Deseja aplicar as alterações nos vídeos relacionados?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>{block?.affectedVideos} vídeos</strong> serão afetados por esta mudança.
              As atualizações serão enviadas para a fila de aprovação.
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => onUpdate(false)}
            >
              Ignorar Edição
            </Button>
            <Button 
              onClick={() => onUpdate(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Atualizar Vídeos
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRelatedDialog;
