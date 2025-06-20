
import { useAuthManager } from "@/hooks/useAuthManager";
import { useTokenManager } from "@/hooks/useTokenManager";
import { usePermissionManager } from "@/hooks/usePermissionManager";
import AuthStatus from "./auth/AuthStatus";
import TokenInformation from "./auth/TokenInformation";
import PermissionManager from "./auth/PermissionManager";

const AuthSettings = () => {
  const { authState, revokeAccess, reauthorize } = useAuthManager();
  const { tokenInfo, refreshToken, checkIfExpiringSoon } = useTokenManager();
  const { permissions } = usePermissionManager();

  const isTokenExpiringSoon = checkIfExpiringSoon();

  return (
    <div className="space-y-6">
      <AuthStatus 
        authState={authState} 
        isTokenExpiringSoon={isTokenExpiringSoon} 
      />
      
      <TokenInformation
        tokenInfo={tokenInfo}
        onRefreshToken={refreshToken}
        isConnected={authState.isConnected}
      />
      
      <PermissionManager
        permissions={permissions}
        isConnected={authState.isConnected}
        onReauthorize={reauthorize}
        onRevokeAccess={revokeAccess}
      />
    </div>
  );
};

export default AuthSettings;
