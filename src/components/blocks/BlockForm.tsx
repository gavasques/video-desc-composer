
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BlockFormData } from "@/types/block";

interface BlockFormProps {
  formData: BlockFormData;
  setFormData: (data: BlockFormData) => void;
  isEditing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const BlockForm = ({ formData, setFormData, isEditing, onSubmit, onCancel }: BlockFormProps) => {
  const categories = ['Tutoriais', 'Reviews', 'Vlogs', 'Gaming'];

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div>
        <Label htmlFor="title">Título do Bloco</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Ex: Links das Redes Sociais"
        />
      </div>
      
      <div>
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder="Conteúdo do bloco..."
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Tipo do Bloco</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value: 'static' | 'category' | 'specific') => 
              setFormData({...formData, type: value})
            }
            disabled={isEditing}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="static">Estático (Todos os vídeos)</SelectItem>
              <SelectItem value="category">Por Categoria</SelectItem>
              <SelectItem value="specific">Específico (Um vídeo)</SelectItem>
            </SelectContent>
          </Select>
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
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData({...formData, category: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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

          {formData.schedule.type === 'specific' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data Inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.schedule.startDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.schedule.startDate ? (
                        format(formData.schedule.startDate, "dd/MM/yyyy")
                      ) : (
                        <span>Selecionar data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.schedule.startDate}
                      onSelect={(date) => setFormData({
                        ...formData, 
                        schedule: { ...formData.schedule, startDate: date }
                      })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>Data Final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.schedule.endDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.schedule.endDate ? (
                        format(formData.schedule.endDate, "dd/MM/yyyy")
                      ) : (
                        <span>Selecionar data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.schedule.endDate}
                      onSelect={(date) => setFormData({
                        ...formData, 
                        schedule: { ...formData.schedule, endDate: date }
                      })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </div>
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
