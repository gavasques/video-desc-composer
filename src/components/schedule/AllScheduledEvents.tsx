
import { Play, Pause, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ScheduledEvent } from "@/hooks/useScheduleManager";

interface AllScheduledEventsProps {
  events: ScheduledEvent[];
}

const AllScheduledEvents = ({ events }: AllScheduledEventsProps) => {
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
        <CardTitle>Todos os Eventos Agendados</CardTitle>
        <CardDescription>
          Lista completa de ativações e desativações programadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{format(event.date, 'dd')}</div>
                    <div className="text-xs text-gray-500">{format(event.date, 'MMM')}</div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{event.blockTitle}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getActionColor(event.action)}>
                        {getActionIcon(event.action)}
                        <span className="ml-1">{event.action === 'activate' ? 'Ativar' : 'Desativar'}</span>
                      </Badge>
                      <Badge variant="outline">
                        {event.blockType === 'static' ? 'Estático' : event.category}
                      </Badge>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusIcon(event.status)}
                        <span className="ml-1">{event.status === 'pending' ? 'Pendente' : event.status === 'completed' ? 'Concluído' : 'Falha'}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.affectedVideos} vídeos • {format(event.date, "dd/MM/yyyy 'às' HH:mm")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllScheduledEvents;
