
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Blocks, Tag, Video } from "lucide-react";
import { Block } from "@/types/block";
import BlockCard from "./BlockCard";

interface BlockTabsProps {
  blocks: Block[];
  onEditBlock: (block: Block) => void;
  onToggleBlock: (blockId: string) => void;
  onDeleteBlock: (blockId: string) => void;
  onPreviewBlock: (block: Block) => void;
}

const BlockTabs = ({ blocks, onEditBlock, onToggleBlock, onDeleteBlock, onPreviewBlock }: BlockTabsProps) => {
  return (
    <Tabs defaultValue="static" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="static" className="flex items-center gap-2">
          <Blocks className="w-4 h-4" />
          Estáticos
        </TabsTrigger>
        <TabsTrigger value="category" className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Por Categoria
        </TabsTrigger>
        <TabsTrigger value="specific" className="flex items-center gap-2">
          <Video className="w-4 h-4" />
          Específicos
        </TabsTrigger>
      </TabsList>

      {/* Static Blocks */}
      <TabsContent value="static">
        <div className="space-y-4">
          {blocks.filter(block => block.type === 'static').map((block) => (
            <BlockCard
              key={block.id}
              block={block}
              onEdit={onEditBlock}
              onToggle={onToggleBlock}
              onDelete={onDeleteBlock}
              onPreview={onPreviewBlock}
            />
          ))}
        </div>
      </TabsContent>

      {/* Category Blocks */}
      <TabsContent value="category">
        <div className="space-y-4">
          {blocks.filter(block => block.type === 'category').map((block) => (
            <BlockCard
              key={block.id}
              block={block}
              onEdit={onEditBlock}
              onToggle={onToggleBlock}
              onDelete={onDeleteBlock}
              onPreview={onPreviewBlock}
            />
          ))}
        </div>
      </TabsContent>

      {/* Specific Blocks */}
      <TabsContent value="specific">
        <div className="space-y-4">
          {blocks.filter(block => block.type === 'specific').length === 0 ? (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum bloco específico criado
              </h3>
              <p className="text-gray-500">
                Blocos específicos são criados diretamente na página de cada vídeo
              </p>
            </div>
          ) : (
            blocks.filter(block => block.type === 'specific').map((block) => (
              <BlockCard
                key={block.id}
                block={block}
                onEdit={onEditBlock}
                onToggle={onToggleBlock}
                onDelete={onDeleteBlock}
                onPreview={onPreviewBlock}
              />
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BlockTabs;
