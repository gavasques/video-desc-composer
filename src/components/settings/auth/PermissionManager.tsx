
import { Youtube, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionScope } from '@/types/settings';

interface PermissionManagerProps {
  permissions: PermissionScope[];
  isConnected: boolean;
  onReauthorize: () => void;
  onRevokeAccess: () => void;
}

const PermissionManager = ({ 
  permissions, 
  isConnected, 
  onReauthorize, 
  onRevokeAccess 
}: PermissionManagerProps) => {
  return (
    <>
      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Permissões Concedidas</CardTitle>
          <CardDescription>
            Escopos de acesso autorizados para sua aplicação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isConnected ? (
            <div className="space-y-3">
              {permissions.map((permission) => (
                <div key={permission.scope} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{permission.scope}</p>
                    <p className="text-xs text-gray-600">{permission.description}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Ativo
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhuma permissão concedida</p>
              <p className="text-sm text-gray-500">Conecte sua conta para ver as permissões</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações de Autenticação</CardTitle>
          <CardDescription>
            Gerencie sua conexão e permissões
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isConnected ? (
              <>
                <Button onClick={onReauthorize} variant="outline">
                  Reautorizar
                </Button>
                <Button onClick={onRevokeAccess} variant="destructive">
                  Revogar Acesso
                </Button>
              </>
            ) : (
              <Button onClick={onReauthorize} className="col-span-2">
                <Youtube className="w-4 h-4 mr-2" />
                Conectar ao YouTube
              </Button>
            )}
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Nota:</strong> As permissões são gerenciadas através do OAuth 2.0 do Google.
              </p>
              <p>
                Você pode revogar o acesso a qualquer momento através das{" "}
                <a 
                  href="https://myaccount.google.com/permissions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  configurações da sua conta Google
                </a>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PermissionManager;
