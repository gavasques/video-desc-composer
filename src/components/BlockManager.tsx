import { useState } from "react";
import { Plus, Blocks, Tag, Video, Edit, Trash2, Calendar, Clock, ToggleLeft, ToggleRight, Eye, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Block {
  id: string;
  title: string;
  content: string;
  type: 'static' | 'category' | 'specific';
  category?: string;
  videoId?: string;
  isActive: boolean;
  order: number;
  affectedVideos: number;
  lastModified: string;
  schedule?: {
    type: 'permanent' | 'specific';
    startDate?: Date;
    endDate?: Date;
  };
}

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
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'static' as 'static' | 'category' | 'specific',
    category: '',
    videoId: '',
    order: 1,
    schedule: {
      type: 'permanent' as 'permanent' | 'specific',
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined
    }
  });

  const categories = ['Tutoriais', 'Reviews', 'Vlogs', 'Gaming'];

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
      schedule: formData.schedule.type === 'specific' ? formData.schedule : { type: 'permanent' }
    };

    setBlocks([...blocks, newBlock]);
    resetForm();
    setIsDialogOpen(false);
    
    // Add to approval queue
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
      schedule: block.schedule || { type: 'permanent' }
    });
    setIsDialogOpen(true);
  };

  const handleUpdateBlock = () => {
    if (!editingBlock) return;

    const updatedBlock = {
      ...editingBlock,
      title: formData.title,
      content: formData.content,
      order: formData.order,
      schedule: formData.schedule.type === 'specific' ? formData.schedule : { type: 'permanent' },
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

  const getScheduleText = (schedule?: Block['schedule']) => {
    if (!schedule || schedule.type === 'permanent') return 'Permanente';
    if (schedule.startDate && schedule.endDate) {
      return `${format(schedule.startDate, 'dd/MM/yyyy')} - ${format(schedule.endDate, 'dd/MM/yyyy')}`;
    }
    return 'Data específica';
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
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
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
                  placeholder="Conteúdo do bloco..."
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo do Bloco</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: 'static' | 'category' | 'specific') => 
                      setFormData({...formData, type: value})
                    }
                    disabled={!!editingBlock}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">Estático (Todos os vídeos)</SelectItem>
                      <SelectItem value="category">Por Categoria</SelectItem>
                      <SelectItem value="specific">Específico (Um vídeo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
              </div>

              {formData.type === 'category' && (
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Scheduling Section */}
              {(formData.type === 'static' || formData.type === 'category') && (
                <div className="space-y-4 border-t pt-4">
                  <Label>Agendamento</Label>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="permanent"
                        name="schedule"
                        checked={formData.schedule.type === 'permanent'}
                        onChange={() => setFormData({...formData, schedule: { type: 'permanent' }})}
                      />
                      <Label htmlFor="permanent">Permanente</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="specific"
                        name="schedule"
                        checked={formData.schedule.type === 'specific'}
                        onChange={() => setFormData({...formData, schedule: { type: 'specific' }})}
                      />
                      <Label htmlFor="specific">Data Específica</Label>
                    </div>
                  </div>

                  {formData.schedule.type === 'specific' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Data Inicial</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.schedule.startDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.schedule.startDate ? (
                                format(formData.schedule.startDate, "dd/MM/yyyy")
                              ) : (
                                <span>Selecionar data</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={formData.schedule.startDate}
                              onSelect={(date) => setFormData({
                                ...formData, 
                                schedule: { ...formData.schedule, startDate: date }
                              })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <Label>Data Final</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.schedule.endDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.schedule.endDate ? (
                                format(formData.schedule.endDate, "dd/MM/yyyy")
                              ) : (
                                <span>Selecionar data</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={formData.schedule.endDate}
                              onSelect={(date) => setFormData({
                                ...formData, 
                                schedule: { ...formData.schedule, endDate: date }
                              })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={editingBlock ? handleUpdateBlock : handleCreateBlock} 
                  className="bg-red-500 hover:bg-red-600"
                >
                  {editingBlock ? 'Atualizar' : 'Criar'} Bloco
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Update Related Videos Dialog */}
      <Dialog open={!!updateRelatedDialog} onOpenChange={() => setUpdateRelatedDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Atualizar Vídeos Relacionados?
            </DialogTitle>
            <DialogDescription>
              Você editou o bloco "{updateRelatedDialog?.title}". Deseja aplicar as alterações nos vídeos relacionados?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>{updateRelatedDialog?.affectedVideos} vídeos</strong> serão afetados por esta mudança.
                As atualizações serão enviadas para a fila de aprovação.
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => handleUpdateRelatedVideos(false)}
              >
                Ignorar Edição
              </Button>
              <Button 
                onClick={() => handleUpdateRelatedVideos(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Atualizar Vídeos
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewBlock} onOpenChange={() => setPreviewBlock(null)}>
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
                <pre className="text-sm whitespace-pre-wrap">{previewBlock?.content}</pre>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Tipo:</strong> {previewBlock?.type === 'static' ? 'Estático' : previewBlock?.type === 'category' ? 'Categoria' : 'Específico'}
              </div>
              <div>
                <strong>Ordem:</strong> {previewBlock?.order}
              </div>
              <div>
                <strong>Vídeos afetados:</strong> {previewBlock?.affectedVideos}
              </div>
              <div>
                <strong>Agendamento:</strong> {getScheduleText(previewBlock?.schedule)}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Blocks Tabs */}
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
              <Card key={block.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{block.title}</h3>
                        <Badge variant="outline">Ordem {block.order}</Badge>
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
                        onClick={() => setPreviewBlock(block)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditBlock(block)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Switch
                        checked={block.isActive}
                        onCheckedChange={() => handleToggleBlock(block.id)}
                      />
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Category Blocks */}
        <TabsContent value="category">
          <div className="space-y-4">
            {blocks.filter(block => block.type === 'category').map((block) => (
              <Card key={block.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{block.title}</h3>
                        <Badge variant="outline">Ordem {block.order}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">{block.category}</Badge>
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
                        onClick={() => setPreviewBlock(block)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditBlock(block)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Switch
                        checked={block.isActive}
                        onCheckedChange={() => handleToggleBlock(block.id)}
                      />
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
                </CardContent>
              </Card>
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
                <Card key={block.id} className="hover:shadow-lg transition-shadow duration-300">
                  {/* Similar structure to other blocks */}
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlockManager;
