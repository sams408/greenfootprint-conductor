
import { Navbar } from "@/components/navbar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <DashboardHeader />
        <DashboardTabs />
      </div>
    </div>
  );
};

export default Dashboard;
