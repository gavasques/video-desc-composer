
import { Shield, Youtube, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthenticationState } from '@/types/settings';

interface AuthStatusProps {
  authState: AuthenticationState;
  isTokenExpiringSoon: boolean;
}

const AuthStatus = ({ authState, isTokenExpiringSoon }: AuthStatusProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Status de Autenticação
        </CardTitle>
        <CardDescription>
          Status atual da conexão OAuth com o YouTube
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Youtube className="w-6 h-6 text-red-500" />
            <div>
              <h4 className="font-medium">YouTube API</h4>
              <p className="text-sm text-gray-600">
                {authState.isConnected ? 'Conectado e autorizado' : 'Não conectado'}
              </p>
            </div>
          </div>
          <Badge 
            variant={authState.isConnected ? 'default' : 'destructive'}
            className={authState.isConnected ? 'bg-green-100 text-green-800' : ''}
          >
            {authState.isConnected ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Conectado
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Desconectado
              </>
            )}
          </Badge>
        </div>

        {authState.isConnected && isTokenExpiringSoon && (
          <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Token expirando em breve</p>
              <p className="text-yellow-700">
                Seu token de acesso expirará em menos de 24 horas. Considere renová-lo.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthStatus;
