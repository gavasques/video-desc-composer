
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  videoCount: number;
  blocks: number;
  lastModified: string;
}

export const useCategoryManager = () => {
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

  const handleCreateCategory = (formData: { name: string; description: string; color: string }) => {
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
    
    toast({
      title: "Categoria criada com sucesso!",
      description: `A categoria "${newCategory.name}" foi adicionada ao sistema.`,
    });

    return newCategory;
  };

  const handleDeleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    setCategories(categories.filter(c => c.id !== id));
    
    toast({
      title: "Categoria removida",
      description: `A categoria "${category?.name}" foi removida. Os vídeos foram movidos para "Sem categoria".`,
    });
  };

  return {
    categories,
    colorOptions,
    handleCreateCategory,
    handleDeleteCategory
  };
};
