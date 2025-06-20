
import { Download, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface BackupSettingsProps {
  onExportSettings: () => void;
  onImportSettings: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetSettings: () => void;
}

const BackupSettings = ({ onExportSettings, onImportSettings, onResetSettings }: BackupSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup de Configurações</CardTitle>
        <CardDescription>
          Exporte e importe suas configurações avançadas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={onExportSettings} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          
          <div>
            <input
              type="file"
              accept=".json"
              onChange={onImportSettings}
              className="hidden"
              id="import-settings"
            />
            <Button asChild variant="outline" className="w-full">
              <label htmlFor="import-settings" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </label>
            </Button>
          </div>
          
          <Button onClick={onResetSettings} variant="destructive">
            Resetar Tudo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackupSettings;
