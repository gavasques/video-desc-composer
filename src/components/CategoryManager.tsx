
import { useState } from "react";
import { Plus, Tag, Edit, Trash2, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  videoCount: number;
  blocks: number;
  lastModified: string;
}

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Tutoriais',
      description: 'Vídeos educacionais e guias passo a passo',
      color: 'bg-blue-500',
      videoCount: 34,
      blocks: 3,
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      name: 'Reviews',
      description: 'Análises e avaliações de produtos',
      color: 'bg-green-500',
      videoCount: 28,
      blocks: 2,
      lastModified: '2024-01-12'
    },
    {
      id: '3',
      name: 'Vlogs',
      description: 'Conteúdo pessoal e do dia a dia',
      color: 'bg-purple-500',
      videoCount: 21,
      blocks: 1,
      lastModified: '2024-01-10'
    },
    {
      id: '4',
      name: 'Gaming',
      description: 'Gameplay e conteúdo de jogos',
      color: 'bg-orange-500',
      videoCount: 18,
      blocks: 2,
      lastModified: '2024-01-08'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500'
  });

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Azul', class: 'bg-blue-500' },
    { value: 'bg-green-500', label: 'Verde', class: 'bg-green-500' },
    { value: 'bg-purple-500', label: 'Roxo', class: 'bg-purple-500' },
    { value: 'bg-orange-500', label: 'Laranja', class: 'bg-orange-500' },
    { value: 'bg-red-500', label: 'Vermelho', class: 'bg-red-500' },
    { value: 'bg-pink-500', label: 'Rosa', class: 'bg-pink-500' },
    { value: 'bg-yellow-500', label: 'Amarelo', class: 'bg-yellow-500' },
    { value: 'bg-indigo-500', label: 'Índigo', class: 'bg-indigo-500' }
  ];

  const handleCreateCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      color: formData.color,
      videoCount: 0,
      blocks: 0,
      lastModified: new Date().toISOString().split('T')[0]
    };

    setCategories([...categories, newCategory]);
    setFormData({ name: '', description: '', color: 'bg-blue-500' });
    setIsDialogOpen(false);
    
    toast({
      title: "Categoria criada com sucesso!",
      description: `A categoria "${newCategory.name}" foi adicionada ao sistema.`,
    });
  };

  const handleDeleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    setCategories(categories.filter(c => c.id !== id));
    
    toast({
      title: "Categoria removida",
      description: `A categoria "${category?.name}" foi removida. Os vídeos foram movidos para "Sem categoria".`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>
          <p className="text-gray-600">
            Organize seus vídeos em categorias para aplicar blocos específicos
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Categoria</DialogTitle>
              <DialogDescription>
                Configure uma nova categoria para organizar seus vídeos
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Categoria</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Tutoriais"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descreva o tipo de conteúdo desta categoria..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label>Cor da Categoria</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setFormData({...formData, color: color.value})}
                      className={`p-3 rounded-lg ${color.class} ${
                        formData.color === color.value ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                      }`}
                      title={color.label}
                    >
                      <div className="w-full h-4"></div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateCategory} className="bg-red-500 hover:bg-red-600">
                  Criar Categoria
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Video className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                    <div className="text-lg font-semibold">{category.videoCount}</div>
                    <div className="text-xs text-gray-500">Vídeos</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Tag className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                    <div className="text-lg font-semibold">{category.blocks}</div>
                    <div className="text-xs text-gray-500">Blocos</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge variant="outline" className="text-xs">
                    Modificado em {category.lastModified}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Ver Vídeos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma categoria criada
          </h3>
          <p className="text-gray-500 mb-4">
            Crie categorias para organizar seus vídeos e aplicar blocos específicos
          </p>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeira Categoria
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
