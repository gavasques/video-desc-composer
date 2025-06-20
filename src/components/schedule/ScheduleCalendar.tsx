
import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface ScheduleCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  hasEventsOnDate: (date: Date) => boolean;
}

const ScheduleCalendar = ({ selectedDate, onSelectDate, hasEventsOnDate }: ScheduleCalendarProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
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
          onSelect={onSelectDate}
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
  );
};

export default ScheduleCalendar;
