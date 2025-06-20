
import { useState } from "react";
import { Plus, Globe, Video, Tag, GripVertical, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface Block {
  id: string;
  title: string;
  content: string;
  type: 'static' | 'category' | 'specific';
  category?: string;
  order: number;
  active: boolean;
  videosAffected?: number;
  lastModified: string;
}

const BlockManager = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: '1',
      title: 'Links das Redes Sociais',
      content: '🔔 Se inscreva no canal!\n📱 Instagram: @meucanal\n🐦 Twitter: @meucanal\n💼 LinkedIn: linkedin.com/in/meucanal',
      type: 'static',
      order: 0,
      active: true,
      videosAffected: 127,
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      title: 'Call to Action Padrão',
      content: '👍 Deixe seu like se o vídeo foi útil!\n💬 Comente sua dúvida ou sugestão\n🔔 Ative o sininho para não perder nenhum vídeo',
      type: 'static',
      order: 1,
      active: true,
      videosAffected: 127,
      lastModified: '2024-01-10'
    },
    {
      id: '3',
      title: 'Bloco Tutorial - Introdução',
      content: '📚 Este é um tutorial passo a passo\n⏰ Confira os timestamps nos comentários\n📁 Arquivos do projeto: github.com/meucanal',
      type: 'category',
      category: 'Tutoriais',
      order: 0,
      active: true,
      videosAffected: 34,
      lastModified: '2024-01-12'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'static' as Block['type'],
    category: '',
    active: true
  });

  const handleCreateBlock = () => {
    const newBlock: Block = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      type: formData.type,
      category: formData.type === 'category' ? formData.category : undefined,
      order: blocks.filter(b => b.type === formData.type).length,
      active: formData.active,
      videosAffected: formData.type === 'static' ? 127 : formData.type === 'category' ? 34 : 1,
      lastModified: new Date().toISOString().split('T')[0]
    };

    setBlocks([...blocks, newBlock]);
    setFormData({ title: '', content: '', type: 'static', category: '', active: true });
    setIsDialogOpen(false);
    
    toast({
      title: "Bloco criado com sucesso!",
      description: `O bloco "${newBlock.title}" foi adicionado e será aplicado aos vídeos.`,
    });
  };

  const handleToggleBlock = (id: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, active: !block.active } : block
    ));
    
    const block = blocks.find(b => b.id === id);
    toast({
      title: block?.active ? "Bloco desativado" : "Bloco ativado",
      description: `O bloco "${block?.title}" foi ${block?.active ? 'desativado' : 'ativado'}.`,
    });
  };

  const handleDeleteBlock = (id: string) => {
    const block = blocks.fin(b => b.id === id);
    setBlocks(blocks.filter(b => b.id !== id));
    
    toast({
      title: "Bloco removido",
      description: `O bloco "${block?.title}" foi removido de todos os vídeos.`,
    });
  };

  const getBlockIcon = (type: Block['type']) => {
    switch (type) {
      case 'static': return <Globe className="w-4 h-4" />;
      case 'category': return <Tag className="w-4 h-4" />;
      case 'specific': return <Video className="w-4 h-4" />;
    }
  };

  const getBlockColor = (type: Block['type']) => {
    switch (type) {
      case 'static': return 'bg-blue-100 text-blue-800';
      case 'category': return 'bg-green-100 text-green-800';
      case 'specific': return 'bg-purple-100 text-purple-800';
    }
  };

  const filterBlocksByType = (type: Block['type']) => {
    return blocks.filter(block => block.type === type).sort((a, b) => a.order - b.order);
  };

  const BlockCard = ({ block }: { block: Block }) => (
    <Card className={`hover:shadow-lg transition-all duration-300 ${!block.active ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="drag-handle">
              <GripVertical className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {block.title}
                <Badge variant="secondary" className={getBlockColor(block.type)}>
                  {getBlockIcon(block.type)}
                  <span className="ml-1 capitalize">{block.type}</span>
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                Afeta {block.videosAffected} vídeos • Modificado em {block.lastModified}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={block.active}
              onCheckedChange={() => handleToggleBlock(block.id)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {block.content}
            </pre>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {block.category && (
                <Badge variant="outline" className="text-xs">
                  {block.category}
                </Badge>
              )}
              <span className="text-xs text-gray-500">
                Ordem: {block.order}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDeleteBlock(block.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Blocos</h2>
          <p className="text-gray-600">
            Organize e gerencie seus blocos de descrição modulares
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Novo Bloco
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Bloco</DialogTitle>
              <DialogDescription>
                Configure um novo bloco de descrição para seus vídeos
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Bloco</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Links das Redes Sociais"
                />
              </div>
              
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Digite o conteúdo do bloco..."
                  rows={6}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo do Bloco</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as Block['type']})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="static">Estático (Todos os vídeos)</option>
                    <option value="category">Por Categoria</option>
                    <option value="specific">Específico</option>
                  </select>
                </div>
                
                {formData.type === 'category' && (
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="Ex: Tutoriais"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({...formData, active: checked})}
                />
                <Label htmlFor="active">Ativar bloco imediatamente</Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateBlock} className="bg-red-500 hover:bg-red-600">
                  Criar Bloco
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Blocks Tabs */}
      <Tabs defaultValue="static" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="static" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Estáticos ({filterBlocksByType('static').length})
          </TabsTrigger>
          <TabsTrigger value="category" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Categorias ({filterBlocksByType('category').length})
          </TabsTrigger>
          <TabsTrigger value="specific" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Específicos ({filterBlocksByType('specific').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="static" className="space-y-4">
          {filterBlocksByType('static').map((block) => (
            <BlockCard key={block.id} block={block} />
          ))}
          {filterBlocksByType('static').length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum bloco estático
              </h3>
              <p className="text-gray-500">
                Blocos estáticos são aplicados a todos os vídeos do seu canal
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="category" className="space-y-4">
          {filterBlocksByType('category').map((block) => (
            <BlockCard key={block.id} block={block} />
          ))}
          {filterBlocksByType('category').length === 0 && (
            <div className="text-center py-12">
              <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum bloco de categoria
              </h3>
              <p className="text-gray-500">
                Blocos de categoria são aplicados a vídeos de categorias específicas
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="specific" className="space-y-4">
          {filterBlocksByType('specific').map((block) => (
            <BlockCard key={block.id} block={block} />
          ))}
          {filterBlocksByType('specific').length === 0 && (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum bloco específico
              </h3>
              <p className="text-gray-500">
                Blocos específicos são aplicados a vídeos individuais
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlockManager;
