
import { Calendar, Play, Pause, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ScheduledEvent } from "@/hooks/useScheduleManager";

interface SelectedDateEventsProps {
  selectedDate: Date | undefined;
  events: ScheduledEvent[];
}

const SelectedDateEvents = ({ selectedDate, events }: SelectedDateEventsProps) => {
  const getActionIcon = (action: string) => {
    return action === 'activate' ? 
      <Play className="w-4 h-4 text-green-600" /> : 
      <Pause className="w-4 h-4 text-red-600" />;
  };

  const getActionColor = (action: string) => {
    return action === 'activate' ? 
      'bg-green-100 text-green-800' : 
      'bg-red-100 text-red-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'failed': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy") : 'Selecione uma data'}
        </CardTitle>
        <CardDescription>
          Eventos agendados para esta data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedDate && events.length > 0 ? (
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.blockTitle}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getActionColor(event.action)}>
                        {getActionIcon(event.action)}
                        <span className="ml-1 capitalize">{event.action === 'activate' ? 'Ativar' : 'Desativar'}</span>
                      </Badge>
                      <Badge variant="outline">
                        {event.blockType === 'static' ? 'Estático' : event.category}
                      </Badge>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusIcon(event.status)}
                        <span className="ml-1 capitalize">{event.status === 'pending' ? 'Pendente' : event.status === 'completed' ? 'Concluído' : 'Falha'}</span>
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {event.affectedVideos} vídeos afetados
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              {selectedDate ? 'Nenhum evento agendado para esta data' : 'Selecione uma data no calendário'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SelectedDateEvents;
