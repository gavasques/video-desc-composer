
import { useAccountInfo } from "@/hooks/useAccountInfo";
import { useChannelStats } from "@/hooks/useChannelStats";
import { useConnectionManager } from "@/hooks/useConnectionManager";
import UserProfile from "./account/UserProfile";
import ChannelStatistics from "./account/ChannelStatistics";
import ConnectionControl from "./account/ConnectionControl";

const AccountSettings = () => {
  const { userInfo, loading } = useAccountInfo();
  const { stats } = useChannelStats();
  const { status, disconnect, reconnect } = useConnectionManager();

  if (loading || !userInfo) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UserProfile userInfo={userInfo} />
      <ChannelStatistics stats={stats} />
      <ConnectionControl 
        status={status} 
        onDisconnect={disconnect} 
        onReconnect={reconnect} 
      />
    </div>
  );
};

export default AccountSettings;
