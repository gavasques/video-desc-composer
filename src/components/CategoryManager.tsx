import { useCategoryManager } from "@/hooks/useCategoryManager";
import CategoryForm from "./categories/CategoryForm";
import CategoryGrid from "./categories/CategoryGrid";

const CategoryManager = () => {
  const {
    categories,
    colorOptions,
    handleCreateCategory,
    handleDeleteCategory
  } = useCategoryManager();

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
        
        <CategoryForm
          colorOptions={colorOptions}
          onCreateCategory={handleCreateCategory}
        />
      </div>

      {/* Categories Grid */}
      <CategoryGrid
        categories={categories}
        onDeleteCategory={handleDeleteCategory}
        onOpenCreateDialog={() => {
          // This will be handled by CategoryForm's internal state
          // We could expose this if needed, but keeping it simple for now
        }}
      />
    </div>
  );
};

export default CategoryManager;
