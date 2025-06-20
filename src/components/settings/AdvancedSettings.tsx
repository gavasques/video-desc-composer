
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAdvancedSettings } from "@/hooks/useAdvancedSettings";
import AutomationSettings from "./advanced/AutomationSettings";
import PerformanceSettings from "./advanced/PerformanceSettings";
import SecuritySettings from "./advanced/SecuritySettings";
import DevelopmentSettings from "./advanced/DevelopmentSettings";
import BackupSettings from "./advanced/BackupSettings";

const AdvancedSettings = () => {
  const { 
    settings, 
    updateSection, 
    exportSettings, 
    importSettings, 
    resetSettings 
  } = useAdvancedSettings();

  return (
    <div className="space-y-6">
      {/* Warning */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Configurações Avançadas</h4>
              <p className="text-sm text-yellow-700">
                Essas configurações são para usuários experientes. Alterações incorretas podem afetar o desempenho da aplicação.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AutomationSettings 
        config={settings.automation}
        onChange={(updates) => updateSection('automation', updates)}
      />

      <PerformanceSettings 
        config={settings.performance}
        onChange={(updates) => updateSection('performance', updates)}
      />

      <SecuritySettings 
        config={settings.security}
        onChange={(updates) => updateSection('security', updates)}
      />

      <DevelopmentSettings 
        config={settings.development}
        onChange={(updates) => updateSection('development', updates)}
      />

      <BackupSettings 
        onExportSettings={exportSettings}
        onImportSettings={importSettings}
        onResetSettings={resetSettings}
      />
    </div>
  );
};

export default AdvancedSettings;
