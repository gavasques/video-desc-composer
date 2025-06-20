
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Eye, ToggleLeft, ToggleRight, Clock } from "lucide-react";
import { format } from "date-fns";
import { Block } from "@/types/block";

interface BlockCardProps {
  block: Block;
  onEdit: (block: Block) => void;
  onToggle: (blockId: string) => void;
  onDelete: (blockId: string) => void;
  onPreview: (block: Block) => void;
}

const BlockCard = ({ block, onEdit, onToggle, onDelete, onPreview }: BlockCardProps) => {
  const getScheduleText = (schedule?: Block['schedule']) => {
    if (!schedule || schedule.type === 'permanent') return 'Permanente';
    if (schedule.startDate && schedule.endDate) {
      return `${format(schedule.startDate, 'dd/MM/yyyy')} - ${format(schedule.endDate, 'dd/MM/yyyy')}`;
    }
    return 'Data específica';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold">{block.title}</h3>
              <Badge variant="outline">Ordem {block.order}</Badge>
              {block.type === 'category' && block.category && (
                <Badge className="bg-blue-100 text-blue-800">{block.category}</Badge>
              )}
              <Badge variant="outline" className="text-blue-600">
                <Clock className="w-3 h-3 mr-1" />
                {getScheduleText(block.schedule)}
              </Badge>
              {block.isActive ? (
                <Badge className="bg-green-100 text-green-800">
                  <ToggleRight className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
              ) : (
                <Badge variant="outline" className="text-gray-600">
                  <ToggleLeft className="w-3 h-3 mr-1" />
                  Inativo
                </Badge>
              )}
            </div>
            
            <p className="text-gray-600 mb-3 line-clamp-2">{block.content}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{block.affectedVideos} vídeos afetados</span>
              <span>Modificado em {block.lastModified}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPreview(block)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(block)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Switch
              checked={block.isActive}
              onCheckedChange={() => onToggle(block.id)}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(block.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockCard;
