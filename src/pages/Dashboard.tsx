
import { EmissionsSummary } from "@/components/dashboard/emissions-summary";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ScopeBreakdown } from "@/components/dashboard/scope-breakdown";
import { RecommendationsCard } from "@/components/dashboard/recommendations-card";
import { EmissionForm } from "@/components/dashboard/emission-form";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/hooks/useLanguage";

const Dashboard = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
            <p className="text-muted-foreground">
              {t('carbonFootprintManagement')}
            </p>
          </div>
          <div className="text-sm text-muted-foreground mt-2 md:mt-0">
            {new Date().toLocaleDateString()}
          </div>
        </div>
        <Separator className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <EmissionsSummary />
          <ScopeBreakdown />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RecommendationsCard />
          <EmissionForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
