
import { Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivityProps {
  activities?: Array<{
    id: number;
    action: string;
    time: string;
    type: 'create' | 'update' | 'batch' | string;
  }>;
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-green-500';
      case 'update': return 'bg-blue-500';
      case 'batch': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Atividade Recente
        </CardTitle>
        <CardDescription>
          Últimas alterações no sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`}></div>
              <div className="flex-1">
                <div className="text-sm font-medium">{activity.action}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
