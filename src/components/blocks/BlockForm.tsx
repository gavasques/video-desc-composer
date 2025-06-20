
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BlockFormData } from "@/types/block";

interface BlockFormProps {
  formData: BlockFormData;
  setFormData: (data: BlockFormData) => void;
  isEditing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const BlockForm = ({ formData, setFormData, isEditing, onSubmit, onCancel }: BlockFormProps) => {
  // Only show form for specific blocks when editing video blocks
  const isVideoSpecificForm = formData.type === 'specific';

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div>
        <Label htmlFor="title">Título do Bloco</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Ex: Informações Específicas do Vídeo"
        />
      </div>
      
      <div>
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder="Conteúdo específico para este vídeo..."
          rows={4}
        />
      </div>
      
      {isVideoSpecificForm && (
        <div>
          <Label htmlFor="order">Ordem</Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
            min="1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Define a posição do bloco na descrição (blocos automáticos também são considerados)
          </p>
        </div>
      )}

      {/* Show type info for specific blocks */}
      {isVideoSpecificForm && (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Bloco Específico:</strong> Este bloco será aplicado apenas a este vídeo.
          </p>
        </div>
      )}

      {!isVideoSpecificForm && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Tipo do Bloco</Label>
              <select 
                id="type"
                value={formData.type} 
                onChange={(e) => setFormData({...formData, type: e.target.value as 'static' | 'category' | 'specific'})}
                disabled={isEditing}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="static">Estático (Todos os vídeos)</option>
                <option value="category">Por Categoria</option>
                <option value="specific">Específico (Um vídeo)</option>
              </select>
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
              <select 
                id="category"
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Tutoriais">Tutoriais</option>
                <option value="Reviews">Reviews</option>
                <option value="Vlogs">Vlogs</option>
                <option value="Gaming">Gaming</option>
              </select>
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
                    onChange={() => setFormData({...formData, schedule: { type: 'permanent', startDate: undefined, endDate: undefined }})}
                  />
                  <Label htmlFor="permanent">Permanente</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="specific"
                    name="schedule"
                    checked={formData.schedule.type === 'specific'}
                    onChange={() => setFormData({...formData, schedule: { type: 'specific', startDate: undefined, endDate: undefined }})}
                  />
                  <Label htmlFor="specific">Data Específica</Label>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          onClick={onSubmit} 
          className="bg-red-500 hover:bg-red-600"
        >
          {isEditing ? 'Atualizar' : 'Criar'} Bloco
        </Button>
      </div>
    </div>
  );
};

export default BlockForm;
