
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Block } from "@/types/block";

interface BlockPreviewDialogProps {
  block: Block | null;
  onOpenChange: (open: boolean) => void;
}

const BlockPreviewDialog = ({ block, onOpenChange }: BlockPreviewDialogProps) => {
  const getScheduleText = (schedule?: Block['schedule']) => {
    if (!schedule || schedule.type === 'permanent') return 'Permanente';
    if (schedule.startDate && schedule.endDate) {
      return `${format(schedule.startDate, 'dd/MM/yyyy')} - ${format(schedule.endDate, 'dd/MM/yyyy')}`;
    }
    return 'Data específica';
  };

  return (
    <Dialog open={!!block} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preview do Bloco</DialogTitle>
          <DialogDescription>
            Visualize como o bloco aparecerá na descrição
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Conteúdo do Bloco:</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">{block?.content}</pre>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Tipo:</strong> {block?.type === 'static' ? 'Estático' : block?.type === 'category' ? 'Categoria' : 'Específico'}
            </div>
            <div>
              <strong>Ordem:</strong> {block?.order}
            </div>
            <div>
              <strong>Vídeos afetados:</strong> {block?.affectedVideos}
            </div>
            <div>
              <strong>Agendamento:</strong> {getScheduleText(block?.schedule)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockPreviewDialog;
