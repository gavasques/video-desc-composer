
import DashboardStats from "./dashboard/DashboardStats";
import DashboardCharts from "./dashboard/DashboardCharts";
import RecentActivity from "./dashboard/RecentActivity";
import { useDashboardData } from "@/hooks/useDashboardData";

const Dashboard = () => {
  const { data: stats } = useDashboardData();

  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} />
      <DashboardCharts stats={stats} />
      <RecentActivity activities={stats?.recentActivity} />
    </div>
  );
};

export default Dashboard;
