
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectionStatus } from "@/types/settings";

interface ConnectionControlProps {
  status: ConnectionStatus;
  onDisconnect: () => void;
  onReconnect: () => void;
}

const ConnectionControl = ({ status, onDisconnect, onReconnect }: ConnectionControlProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Conexão</CardTitle>
        <CardDescription>
          Controle a conexão com sua conta do YouTube
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Status da Conexão</h4>
            <p className="text-sm text-gray-600">
              {status.isConnected 
                ? 'Sua conta está conectada e funcionando normalmente'
                : 'Sua conta não está conectada'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onReconnect}
              disabled={status.isConnected}
            >
              Reconectar
            </Button>
            <Button 
              variant="destructive" 
              onClick={onDisconnect}
              disabled={!status.isConnected}
            >
              Desconectar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionControl;
