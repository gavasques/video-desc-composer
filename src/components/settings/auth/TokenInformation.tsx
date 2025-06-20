
import { Key, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TokenInfo } from '@/types/settings';

interface TokenInformationProps {
  tokenInfo: TokenInfo;
  onRefreshToken: () => void;
  isConnected: boolean;
}

const TokenInformation = ({ tokenInfo, onRefreshToken, isConnected }: TokenInformationProps) => {
  if (!isConnected) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          Informações do Token
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Expira em</label>
            <p className="text-sm text-gray-900">
              {new Date(tokenInfo.expiry).toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Última renovação</label>
            <p className="text-sm text-gray-900">
              {new Date(tokenInfo.lastRefresh).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={onRefreshToken} className="flex-1">
            <RefreshCw className="w-4 h-4 mr-2" />
            Renovar Token
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenInformation;
