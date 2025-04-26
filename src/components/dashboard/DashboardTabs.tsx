
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailTab } from "@/components/dashboard/tabs/DetailTab";
import { ComparisonsTab } from "@/components/dashboard/tabs/ComparisonsTab";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { EmissionsSummary } from "@/components/dashboard/emissions-summary";
import { ScopeBreakdown } from "@/components/dashboard/scope-breakdown";

export function DashboardTabs() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("summary");
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["summary", "detail", "comparisons"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <div className="border-b">
        <TabsList className="w-full justify-start overflow-x-auto bg-transparent">
          <TabsTrigger value="summary" className="text-sm sm:text-base data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2">{t('summary')}</TabsTrigger>
          <TabsTrigger value="detail" className="text-sm sm:text-base data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2">{t('detailedView')}</TabsTrigger>
          <TabsTrigger value="comparisons" className="text-sm sm:text-base data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 py-2">{t('comparisons')}</TabsTrigger>
        </TabsList>
      </div>
      
      <div className="w-full">
        <TabsContent value="summary" className="mt-0 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <StatsCards />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <EmissionsSummary />
            <ScopeBreakdown />
          </div>
        </TabsContent>
        
        <TabsContent value="detail" className="mt-0 pt-4">
          <DetailTab />
        </TabsContent>
        
        <TabsContent value="comparisons" className="mt-0 pt-4">
          <ComparisonsTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
