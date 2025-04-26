
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  return (
    <div className="flex-1">
      <div className="px-4 py-6 md:px-6">
        <DashboardHeader />
        <DashboardTabs />
      </div>
    </div>
  );
};

export default Dashboard;
