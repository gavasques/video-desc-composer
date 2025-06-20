
import { Block } from "@/types/block";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Power, Trash2 } from "lucide-react";

interface BlockListProps {
  blocks: Block[];
  onEdit: (block: Block) => void;
  onToggle: (blockId: string) => void;
  onDelete: (blockId: string) => void;
  onPreview: (block: Block) => void;
}

const BlockList = ({ blocks, onEdit, onToggle, onDelete, onPreview }: BlockListProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'static': return 'bg-blue-100 text-blue-800';
      case 'category': return 'bg-green-100 text-green-800';
      case 'specific': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'static': return 'Estático';
      case 'category': return 'Categoria';
      case 'specific': return 'Específico';
      default: return type;
    }
  };

  return (
    <div className="grid gap-4">
      {blocks.map((block) => (
        <Card key={block.id} className={`${!block.isActive ? 'opacity-60' : ''}`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{block.title}</CardTitle>
                <CardDescription>
                  Afeta {block.affectedVideos} vídeo(s) • Última modificação: {block.lastModified}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getTypeColor(block.type)}>
                  {getTypeLabel(block.type)}
                </Badge>
                <Badge variant={block.isActive ? "default" : "secondary"}>
                  {block.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm whitespace-pre-line line-clamp-3">
                {block.content}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Ordem: {block.order}
                {block.category && ` • Categoria: ${block.category}`}
                {block.schedule?.type === 'specific' && (
                  ` • Programado: ${block.schedule.startDate} a ${block.schedule.endDate}`
                )}
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggle(block.id)}
                  className={block.isActive ? "text-orange-600" : "text-green-600"}
                >
                  <Power className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(block.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlockList;
