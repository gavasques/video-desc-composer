
import { Edit, Trash2, Video, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/hooks/useCategoryManager";

interface CategoryCardProps {
  category: Category;
  onDeleteCategory: (id: string) => void;
}

const CategoryCard = ({ category, onDeleteCategory }: CategoryCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
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
              onClick={() => onDeleteCategory(category.id)}
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
  );
};

export default CategoryCard;
