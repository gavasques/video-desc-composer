
import { Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryCard from "./CategoryCard";
import { Category } from "@/hooks/useCategoryManager";

interface CategoryGridProps {
  categories: Category[];
  onDeleteCategory: (id: string) => void;
  onOpenCreateDialog: () => void;
}

const CategoryGrid = ({ categories, onDeleteCategory, onOpenCreateDialog }: CategoryGridProps) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma categoria criada
        </h3>
        <p className="text-gray-500 mb-4">
          Crie categorias para organizar seus vídeos e aplicar blocos específicos
        </p>
        <Button onClick={onOpenCreateDialog} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Criar Primeira Categoria
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDeleteCategory={onDeleteCategory}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
