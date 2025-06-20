
import { useState } from "react";
import { Search, Filter, Video, Eye, Edit, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  views: string;
  category: string;
  hasCustomBlocks: boolean;
  blocksCount: number;
  status: 'published' | 'draft' | 'scheduled';
}

const VideoManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const videos: VideoData[] = [
    {
      id: '1',
      title: 'Como Criar um Sistema de Blocos Modulares - Tutorial Completo',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      publishedAt: '2024-01-15',
      views: '15.2K',
      category: 'Tutoriais',
      hasCustomBlocks: true,
      blocksCount: 5,
      status: 'published'
    },
    {
      id: '2',
      title: 'Review: Melhor Ferramenta para Criadores de Conteúdo 2024',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
      publishedAt: '2024-01-12',
      views: '8.7K',
      category: 'Reviews',
      hasCustomBlocks: true,
      blocksCount: 4,
      status: 'published'
    },
    {
      id: '3',
      title: 'Meu Dia Criando Conteúdo - Vlog Behind the Scenes',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop',
      publishedAt: '2024-01-10',
      views: '12.4K',
      category: 'Vlogs',
      hasCustomBlocks: false,
      blocksCount: 2,
      status: 'published'
    },
    {
      id: '4',
      title: 'Gameplay Épico: Zerando o Jogo em Modo Difícil',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=200&fit=crop',
      publishedAt: '2024-01-08',
      views: '22.1K',
      category: 'Gaming',
      hasCustomBlocks: true,
      blocksCount: 3,
      status: 'published'
    },
    {
      id: '5',
      title: 'Próximo Tutorial: Automação Avançada (Preview)',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      publishedAt: '2024-01-20',
      views: '0',
      category: 'Tutoriais',
      hasCustomBlocks: false,
      blocksCount: 0,
      status: 'scheduled'
    }
  ];

  const categories = ['Tutoriais', 'Reviews', 'Vlogs', 'Gaming'];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || video.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Rascunho';
      case 'scheduled': return 'Agendado';
      default: return 'Desconhecido';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tutoriais': return 'bg-blue-100 text-blue-800';
      case 'Reviews': return 'bg-green-100 text-green-800';
      case 'Vlogs': return 'bg-purple-100 text-purple-800';
      case 'Gaming': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vídeos</h2>
          <p className="text-gray-600">
            Gerencie descrições e blocos de vídeos individuais
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {filteredVideos.length} vídeos
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar vídeos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
                <SelectItem value="scheduled">Agendados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                </div>
                
                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{video.publishedAt}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{video.views} visualizações</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className={getCategoryColor(video.category)}>
                          <Tag className="w-3 h-3 mr-1" />
                          {video.category}
                        </Badge>
                        <Badge className={getStatusColor(video.status)}>
                          {getStatusLabel(video.status)}
                        </Badge>
                        {video.hasCustomBlocks && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {video.blocksCount} blocos personalizados
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Blocos
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
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum vídeo encontrado
          </h3>
          <p className="text-gray-500">
            Tente ajustar os filtros ou termos de busca
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoManager;
