import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Video, Eye, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Block, BlockFormData } from "@/types/block";
import BlockForm from "./blocks/BlockForm";
import BlockPreviewDialog from "./blocks/BlockPreviewDialog";
import UpdateRelatedDialog from "./blocks/UpdateRelatedDialog";
import VideoFilters from "./videos/VideoFilters";
import VideoCard from "./videos/VideoCard";
import VideoDetailsDialog from "./videos/VideoDetailsDialog";
import VirtualizedVideoList from "./videos/VirtualizedVideoList";
import { useOptimizedVideoManager, VideoData } from "@/hooks/useOptimizedVideoManager";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { usePagination } from "@/hooks/usePagination";
import { Button } from "@/components/ui/button";

const OptimizedVideoManager = React.memo(() => {
  const {
    videos,
    categories,
    getAppliedGeneralBlocks,
    getSpecificBlocks,
    handleToggleAutoUpdate,
    handleCreateBlock,
    handleUpdateBlock,
    handleDeleteSpecificBlock
  } = useOptimizedVideoManager();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUpdateStatus, setSelectedUpdateStatus] = useState('all');
  const [viewingDescription, setViewingDescription] = useState<VideoData | null>(null);
  const [editingBlocksVideo, setEditingBlocksVideo] = useState<VideoData | null>(null);
  const [previewBlock, setPreviewBlock] = useState<Block | null>(null);
  const [updateRelatedDialog, setUpdateRelatedDialog] = useState<Block | null>(null);
  const [isEditBlockDialogOpen, setIsEditBlockDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [useVirtualization, setUseVirtualization] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);

  const [formData, setFormData] = useState<BlockFormData>({
    title: '',
    content: '',
    type: 'specific',
    category: '',
    videoId: '',
    order: 1,
    schedule: { type: 'permanent' }
  });

  // Debounced search for better performance
  const searchFunction = useCallback((video: VideoData, term: string) => {
    return video.title.toLowerCase().includes(term);
  }, []);

  const { filteredItems: searchFilteredVideos, isSearching } = useDebounceSearch(
    videos,
    searchTerm,
    searchFunction,
    300
  );

  // Apply other filters to search results
  const filteredVideos = useMemo(() => {
    return searchFilteredVideos.filter(video => {
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || video.status === selectedStatus;
      const matchesUpdateStatus = selectedUpdateStatus === 'all' || 
        (selectedUpdateStatus === 'auto' && video.autoUpdate) ||
        (selectedUpdateStatus === 'manual' && !video.autoUpdate);
      return matchesCategory && matchesStatus && matchesUpdateStatus;
    });
  }, [searchFilteredVideos, selectedCategory, selectedStatus, selectedUpdateStatus]);

  // Pagination for large datasets
  const pagination = usePagination(filteredVideos, 50);

  // Auto-enable virtualization for large datasets
  useEffect(() => {
    setUseVirtualization(filteredVideos.length > 100);
  }, [filteredVideos.length]);

  // Measure container height for virtualization
  useEffect(() => {
    if (containerRef.current && useVirtualization) {
      const updateHeight = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setContainerHeight(Math.min(600, window.innerHeight - rect.top - 100));
        }
      };
      
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [useVirtualization]);

  // Reset pagination when filters change
  useEffect(() => {
    pagination.resetPage();
  }, [searchTerm, selectedCategory, selectedStatus, selectedUpdateStatus]);

  // Memoized stats to prevent recalculation
  const stats = useMemo(() => ({
    totalVideos: filteredVideos.length,
    autoUpdateVideos: videos.filter(v => v.autoUpdate).length,
    isFiltered: filteredVideos.length !== videos.length
  }), [filteredVideos.length, videos]);

  const handleEditVideoBlocks = useCallback((video: VideoData) => {
    setEditingBlocksVideo(video);
    setFormData({
      title: '',
      content: '',
      type: 'specific',
      category: '',
      videoId: video.id,
      order: 1,
      schedule: { type: 'permanent' }
    });
    setIsEditBlockDialogOpen(true);
  }, []);

  const handlePreviewVideoBlocks = useCallback((video: VideoData) => {
    const specificBlocks = getSpecificBlocks(video);
    if (specificBlocks.length > 0) {
      setPreviewBlock(specificBlocks[0]);
    } else {
      toast({
        title: "Nenhum bloco específico encontrado",
        description: "Este vídeo não possui blocos específicos personalizados.",
      });
    }
  }, [getSpecificBlocks]);

  const handleCreateBlockWrapper = useCallback(() => {
    if (!editingBlocksVideo) return;
    handleCreateBlock(formData, editingBlocksVideo);
    resetForm();
  }, [editingBlocksVideo, formData, handleCreateBlock]);

  const handleEditBlock = useCallback((block: Block) => {
    setEditingBlock(block);
    setFormData({
      title: block.title,
      content: block.content,
      type: 'specific',
      category: '',
      videoId: block.videoId || '',
      order: block.order,
      schedule: block.schedule || { type: 'permanent' }
    });
  }, []);

  const handleUpdateBlockWrapper = useCallback(() => {
    if (!editingBlock || !editingBlocksVideo) return;
    handleUpdateBlock(editingBlock, formData, editingBlocksVideo);
    resetForm();
    setEditingBlock(null);
  }, [editingBlock, editingBlocksVideo, formData, handleUpdateBlock]);

  const handleDeleteSpecificBlockWrapper = useCallback((blockId: string) => {
    if (!editingBlocksVideo) return;
    handleDeleteSpecificBlock(blockId, editingBlocksVideo);
  }, [editingBlocksVideo, handleDeleteSpecificBlock]);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      content: '',
      type: 'specific',
      category: '',
      videoId: editingBlocksVideo?.id || '',
      order: 1,
      schedule: { type: 'permanent' }
    });
  }, [editingBlocksVideo?.id]);

  const videosToDisplay = useVirtualization ? filteredVideos : pagination.currentItems;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vídeos</h2>
          <p className="text-gray-600">
            Gerencie descrições e controle atualizações automáticas
            {isSearching && <span className="text-blue-500 ml-2">(Buscando...)</span>}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {stats.totalVideos} vídeos
            {stats.isFiltered && ` (de ${videos.length})`}
          </Badge>
          <Badge variant="outline" className="text-sm text-green-600">
            {stats.autoUpdateVideos} com auto-update
          </Badge>
          {useVirtualization && (
            <Badge variant="outline" className="text-sm text-blue-600">
              Virtualizado
            </Badge>
          )}
        </div>
      </div>

      {/* Filters */}
      <VideoFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedUpdateStatus={selectedUpdateStatus}
        setSelectedUpdateStatus={setSelectedUpdateStatus}
        categories={categories}
      />

      {/* Edit Blocks Dialog */}
      <Dialog open={isEditBlockDialogOpen} onOpenChange={setIsEditBlockDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Blocos - {editingBlocksVideo?.title}</DialogTitle>
            <DialogDescription>
              Gerencie os blocos específicos para este vídeo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {editingBlocksVideo && (
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Blocos Aplicados Automaticamente</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Estes blocos são aplicados automaticamente baseado na categoria e configurações gerais:
                </p>
                <div className="space-y-2">
                  {getAppliedGeneralBlocks(editingBlocksVideo).map((block) => (
                    <div key={block.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium">{block.title}</h5>
                          <Badge variant="outline" className="text-xs">
                            {block.type === 'static' ? 'Estático' : `Categoria: ${block.category}`}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Ordem {block.order}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{block.content}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setPreviewBlock(block)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {getAppliedGeneralBlocks(editingBlocksVideo).length === 0 && (
                    <p className="text-gray-500 text-sm italic">
                      Nenhum bloco geral está sendo aplicado automaticamente a este vídeo.
                    </p>
                  )}
                </div>
              </div>
            )}

            {editingBlocksVideo && getSpecificBlocks(editingBlocksVideo).length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Blocos Específicos do Vídeo</h4>
                <div className="space-y-2">
                  {getSpecificBlocks(editingBlocksVideo).map((block) => (
                    <div key={block.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium">{block.title}</h5>
                          <Badge variant="outline" className="text-xs">
                            Ordem {block.order}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{block.content}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSpecificBlockWrapper(block.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">
                {editingBlock ? 'Editar Bloco Específico' : 'Adicionar Novo Bloco Específico'}
              </h4>
              
              <BlockForm
                formData={formData}
                setFormData={setFormData}
                isEditing={!!editingBlock}
                onSubmit={editingBlock ? handleUpdateBlockWrapper : handleCreateBlockWrapper}
                onCancel={() => {
                  resetForm();
                  setEditingBlock(null);
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Other Dialogs */}
      <UpdateRelatedDialog
        block={updateRelatedDialog}
        onOpenChange={() => setUpdateRelatedDialog(null)}
        onUpdate={() => setUpdateRelatedDialog(null)}
      />

      <BlockPreviewDialog
        block={previewBlock}
        onOpenChange={() => setPreviewBlock(null)}
      />

      <VideoDetailsDialog
        video={viewingDescription}
        appliedGeneralBlocks={viewingDescription ? getAppliedGeneralBlocks(viewingDescription) : []}
        specificBlocks={viewingDescription ? getSpecificBlocks(viewingDescription) : []}
        onClose={() => setViewingDescription(null)}
        onEditBlocks={handleEditVideoBlocks}
      />

      {/* Videos List with Conditional Virtualization */}
      <div ref={containerRef}>
        {useVirtualization ? (
          <VirtualizedVideoList
            videos={videosToDisplay}
            getAppliedGeneralBlocks={getAppliedGeneralBlocks}
            getSpecificBlocks={getSpecificBlocks}
            onViewDescription={setViewingDescription}
            onPreviewBlocks={handlePreviewVideoBlocks}
            onEditBlocks={handleEditVideoBlocks}
            onToggleAutoUpdate={handleToggleAutoUpdate}
            height={containerHeight}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {videosToDisplay.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                appliedGeneralBlocks={getAppliedGeneralBlocks(video)}
                specificBlocks={getSpecificBlocks(video)}
                onViewDescription={setViewingDescription}
                onPreviewBlocks={handlePreviewVideoBlocks}
                onEditBlocks={handleEditVideoBlocks}
                onToggleAutoUpdate={handleToggleAutoUpdate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls (only show when not virtualizing) */}
      {!useVirtualization && filteredVideos.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Mostrando {pagination.startIndex} a {pagination.endIndex} de {pagination.totalItems} vídeos
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={pagination.previousPage}
              disabled={!pagination.hasPrevious}
            >
              Anterior
            </Button>
            <span className="text-sm">
              Página {pagination.currentPage} de {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={pagination.nextPage}
              disabled={!pagination.hasNext}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}

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
});

OptimizedVideoManager.displayName = 'OptimizedVideoManager';

export default OptimizedVideoManager;
