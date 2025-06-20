
import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CategoryFormData {
  name: string;
  description: string;
  color: string;
}

interface ColorOption {
  value: string;
  label: string;
  class: string;
}

interface CategoryFormProps {
  colorOptions: ColorOption[];
  onCreateCategory: (formData: CategoryFormData) => void;
}

const CategoryForm = ({ colorOptions, onCreateCategory }: CategoryFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    color: 'bg-blue-500'
  });

  const handleSubmit = () => {
    onCreateCategory(formData);
    setFormData({ name: '', description: '', color: 'bg-blue-500' });
    setIsDialogOpen(false);
  };

  return (
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
            <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600">
              Criar Categoria
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
