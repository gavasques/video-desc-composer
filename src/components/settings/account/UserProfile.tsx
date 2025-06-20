
import { User, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserAccount } from "@/types/settings";

interface UserProfileProps {
  userInfo: UserAccount;
}

const UserProfile = ({ userInfo }: UserProfileProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Informações da Conta
        </CardTitle>
        <CardDescription>
          Dados do seu canal do YouTube conectado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <img
            src={userInfo.avatar}
            alt={userInfo.name}
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{userInfo.name}</h3>
              {userInfo.isVerified && (
                <CheckCircle className="w-5 h-5 text-blue-500" />
              )}
              <Badge 
                variant={userInfo.connectionStatus === 'connected' ? 'default' : 'destructive'}
                className="ml-2"
              >
                {userInfo.connectionStatus === 'connected' ? 'Conectado' : 'Desconectado'}
              </Badge>
            </div>
            <p className="text-gray-600 mb-1">{userInfo.email}</p>
            <p className="text-sm text-gray-500">ID do Canal: {userInfo.channelId}</p>
            <p className="text-sm text-gray-500">Membro desde: {new Date(userInfo.joinedDate).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
