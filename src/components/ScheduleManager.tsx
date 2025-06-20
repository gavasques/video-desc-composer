
import { useScheduleManager } from "@/hooks/useScheduleManager";
import ScheduleStatistics from "./schedule/ScheduleStatistics";
import ScheduleCalendar from "./schedule/ScheduleCalendar";
import SelectedDateEvents from "./schedule/SelectedDateEvents";
import AllScheduledEvents from "./schedule/AllScheduledEvents";

const ScheduleManager = () => {
  const {
    selectedDate,
    setSelectedDate,
    scheduledEvents,
    getEventsForDate,
    getEventsByStatus,
    hasEventsOnDate
  } = useScheduleManager();

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
      <ScheduleStatistics
        pendingCount={getEventsByStatus('pending').length}
        completedCount={getEventsByStatus('completed').length}
        failedCount={getEventsByStatus('failed').length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <ScheduleCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          hasEventsOnDate={hasEventsOnDate}
        />

        {/* Events for Selected Date */}
        <SelectedDateEvents
          selectedDate={selectedDate}
          events={selectedDate ? getEventsForDate(selectedDate) : []}
        />
      </div>

      {/* All Scheduled Events */}
      <AllScheduledEvents events={scheduledEvents} />
    </div>
  );
};

export default ScheduleManager;
