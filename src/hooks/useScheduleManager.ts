
import { useState } from "react";
import { format } from "date-fns";

export interface ScheduledEvent {
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

export const useScheduleManager = () => {
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

  const hasEventsOnDate = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  return {
    selectedDate,
    setSelectedDate,
    scheduledEvents,
    setScheduledEvents,
    getEventsForDate,
    getEventsByStatus,
    hasEventsOnDate
  };
};
