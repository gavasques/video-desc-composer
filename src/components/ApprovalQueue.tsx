
import { useState } from "react";
import { CheckCircle, XCircle, Eye, Play, Pause, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface PendingUpdate {
  id: string;
  videoId: string;
  videoTitle: string;
  videoThumbnail: string;
  blockId: string;
  blockTitle: string;
  blockType: 'static' | 'category' | 'specific';
  action: 'add' | 'remove' | 'update';
  category?: string;
  currentDescription: string;
  newDescription: string;
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
}

const ApprovalQueue = () => {
  const [pendingUpdates, setPendingUpdates] = useState<PendingUpdate[]>([
    {
      id: '1',
      videoId: 'v1',
      videoTitle: 'Como Criar um Sistema de Blocos Modulares - Tutorial Completo',
      videoThumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      blockId: 'b1',
      blockTitle: 'Links das Redes Sociais',
      blockType: 'static',
      action: 'add',
      currentDescription: 'Descrição atual do vídeo...',
      newDescription: 'Descrição atual do vídeo...\n\n🔔 Se inscreva no canal!\n📱 Instagram: @meucanal\n🐦 Twitter: @meucanal\n💼 LinkedIn: linkedin.com/in/meucanal',
      createdAt: '2024-01-15T10:30:00Z',
      priority: 'high'
    },
    {
      id: '2',
      videoId: 'v2',
      videoTitle: 'Review: Melhor Ferramenta para Criadores de Conteúdo 2024',
      videoThumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
      blockId: 'b2',
      blockTitle: 'Call to Action Padrão',
      blockType: 'static',
      action: 'update',
      currentDescription: 'Descrição com CTA antigo...',
      newDescription: 'Descrição com CTA atualizado...\n\n👍 Deixe seu like se o vídeo foi útil!\n💬 Comente sua dúvida ou sugestão\n🔔 Ative o sininho para não perder nenhum vídeo',
      createdAt: '2024-01-15T09:15:00Z',
      priority: 'medium'
    }
  ]);

  const [selectedUpdates, setSelectedUpdates] = useState<string[]>([]);
  const [previewUpdate, setPreviewUpdate] = useState<PendingUpdate | null>(null);

  const handleSelectUpdate = (updateId: string, checked: boolean) => {
    if (checked) {
      setSelectedUpdates([...selectedUpdates, updateId]);
    } else {
      setSelectedUpdates(selectedUpdates.filter(id => id !== updateId));
    }
  };

  const handleSelectAll = () => {
    if (selectedUpdates.length === pendingUpdates.length) {
      setSelectedUpdates([]);
    } else {
      setSelectedUpdates(pendingUpdates.map(update => update.id));
    }
  };

  const handleApproveSelected = () => {
    const approvedCount = selectedUpdates.length;
    setPendingUpdates(pendingUpdates.filter(update => !selectedUpdates.includes(update.id)));
    setSelectedUpdates([]);
    
    toast({
      title: "Atualizações aprovadas!",
      description: `${approvedCount} vídeo(s) foram adicionados à fila de processamento do YouTube.`,
    });
  };

  const handleRejectSelected = () => {
    const rejectedCount = selectedUpdates.length;
    setPendingUpdates(pendingUpdates.filter(update => !selectedUpdates.includes(update.id)));
    setSelectedUpdates([]);
    
    toast({
      title: "Atualizações rejeitadas",
      description: `${rejectedCount} atualização(ões) foram removidas da fila.`,
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'add': return <Play className="w-4 h-4 text-green-600" />;
      case 'remove': return <Pause className="w-4 h-4 text-red-600" />;
      case 'update': return <AlertCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'add': return 'bg-green-100 text-green-800';
      case 'remove': return 'bg-red-100 text-red-800';
      case 'update': return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fila de Aprovação</h2>
          <p className="text-gray-600">
            Revise e aprove atualizações antes de aplicá-las no YouTube
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {pendingUpdates.length} pendentes
          </Badge>
          <Badge variant="outline" className="text-sm">
            {selectedUpdates.length} selecionados
          </Badge>
        </div>
      </div>

      {/* Bulk Actions */}
      {pendingUpdates.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedUpdates.length === pendingUpdates.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  Selecionar todos ({pendingUpdates.length})
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleApproveSelected}
                  disabled={selectedUpdates.length === 0}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprovar Selecionados
                </Button>
                <Button
                  onClick={handleRejectSelected}
                  disabled={selectedUpdates.length === 0}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Rejeitar Selecionados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Updates List */}
      <div className="space-y-4">
        {pendingUpdates.map((update) => (
          <Card key={update.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={selectedUpdates.includes(update.id)}
                  onCheckedChange={(checked) => handleSelectUpdate(update.id, checked as boolean)}
                />
                
                <img
                  src={update.videoThumbnail}
                  alt={update.videoTitle}
                  className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {update.videoTitle}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className={getActionColor(update.action)}>
                          {getActionIcon(update.action)}
                          <span className="ml-1 capitalize">{update.action}</span>
                        </Badge>
                        <Badge variant="outline">
                          {update.blockTitle}
                        </Badge>
                        <Badge className={getPriorityColor(update.priority)}>
                          {update.priority}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(update.createdAt).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Preview da Atualização</DialogTitle>
                            <DialogDescription>
                              Compare o antes e depois da descrição
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Antes</h4>
                              <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto">
                                <pre className="text-sm whitespace-pre-wrap font-mono">
                                  {update.currentDescription}
                                </pre>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Depois</h4>
                              <div className="bg-green-50 p-4 rounded-lg h-64 overflow-y-auto">
                                <pre className="text-sm whitespace-pre-wrap font-mono">
                                  {update.newDescription}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        onClick={() => handleApproveSelected()}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                      
                      <Button
                        onClick={() => handleRejectSelected()}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {pendingUpdates.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma atualização pendente
          </h3>
          <p className="text-gray-500">
            Todas as atualizações foram processadas ou não há alterações na fila
          </p>
        </div>
      )}
    </div>
  );
};

export default ApprovalQueue;
