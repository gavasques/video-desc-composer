
import { Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuotaUsage } from "@/types/settings";

interface QuotaMonitoringProps {
  quotaUsage: QuotaUsage;
  quotaPercentage: number;
  isNearLimit: boolean;
}

const QuotaMonitoring = ({ quotaUsage, quotaPercentage, isNearLimit }: QuotaMonitoringProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Uso de Quota
        </CardTitle>
        <CardDescription>
          Monitoramento do uso da API do YouTube
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Cota utilizada</span>
            <span>{quotaUsage.used.toLocaleString()} / {quotaUsage.limit.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                quotaPercentage > 80 ? 'bg-red-500' : 
                quotaPercentage > 60 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`}
              style={{ width: `${quotaPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{quotaPercentage.toFixed(1)}% utilizada</span>
            <span>Reset: {quotaUsage.resetDate}</span>
          </div>
        </div>

        {isNearLimit && (
          <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Cota quase esgotada</p>
              <p className="text-yellow-700">
                Você está próximo do limite diário. Considere otimizar as requisições.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuotaMonitoring;
