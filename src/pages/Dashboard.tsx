
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  return (
    <div className="flex-1 w-full overflow-y-auto">
      <div className="container mx-auto px-4 py-6 md:px-6 max-w-7xl">
        <DashboardHeader />
        <DashboardTabs />
      </div>
    </div>
  );
};

export default Dashboard;
