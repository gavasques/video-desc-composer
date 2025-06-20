
import { useState } from "react";
import { Calendar, Clock, Play, Pause, AlertCircle, CheckCircle, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format, isAfter, isBefore, isToday } from "date-fns";

interface ScheduledEvent {
  id: string;
  blockId: string;
  blockTitle: string;
  blockType: 'static' | 'category';
  category?: string;
  action: 'activate' | 'deactivate';
  date: Date;
  affectedVideos: number;
  status: 'pending' | 'completed' | 'failed';
}

const ScheduleManager = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([
    {
      id: '1',
      blockId: 'b1',
      blockTitle: 'Promoção Black Friday',
      blockType: 'static',
      action: 'activate',
      date: new Date(2024, 10, 25), // 25 de novembro
      affectedVideos: 127,
      status: 'pending'
    },
    {
      id: '2',
      blockId: 'b1',
      blockTitle: 'Promoção Black Friday',
      blockType: 'static',
      action: 'deactivate',
      date: new Date(2024, 11, 2), // 2 de dezembro
      affectedVideos: 127,
      status: 'pending'
    },
    {
      id: '3',
      blockId: 'b2',
      blockTitle: 'Especial Fim de Ano - Tutoriais',
      blockType: 'category',
      category: 'Tutoriais',
      action: 'activate',
      date: new Date(2024, 11, 15), // 15 de dezembro
      affectedVideos: 34,
      status: 'pending'
    }
  ]);

  const getEventsForDate = (date: Date) => {
    return scheduledEvents.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getEventsByStatus = (status: 'pending' | 'completed' | 'failed') => {
    return scheduledEvents.filter(event => event.status === status);
  };

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

  const hasEventsOnDate = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Agendamento de Blocos</h2>
        <p className="text-gray-600">
          Configure quando seus blocos devem ser ativados ou desativados
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold">{getEventsByStatus('pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold">{getEventsByStatus('completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Falhas</p>
                <p className="text-2xl font-bold">{getEventsByStatus('failed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Calendário
            </CardTitle>
            <CardDescription>
              Clique em uma data para ver os eventos agendados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEvents: (date) => hasEventsOnDate(date)
              }}
              modifiersStyles={{
                hasEvents: { 
                  backgroundColor: '#3b82f6', 
                  color: 'white',
                  fontWeight: 'bold'
                }
              }}
            />
            
            <div className="mt-4 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Datas com eventos agendados</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events for Selected Date */}
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
            {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getEventsForDate(selectedDate).map((event) => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{event.blockTitle}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getActionColor(event.action)} size="sm">
                            {getActionIcon(event.action)}
                            <span className="ml-1 capitalize">{event.action === 'activate' ? 'Ativar' : 'Desativar'}</span>
                          </Badge>
                          <Badge variant="outline" size="sm">
                            {event.blockType === 'static' ? 'Estático' : event.category}
                          </Badge>
                          <Badge className={getStatusColor(event.status)} size="sm">
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
      </div>

      {/* All Scheduled Events */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Eventos Agendados</CardTitle>
          <CardDescription>
            Lista completa de ativações e desativações programadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledEvents
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
    </div>
  );
};

export default ScheduleManager;
