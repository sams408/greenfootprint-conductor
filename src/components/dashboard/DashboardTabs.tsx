import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryTab } from "@/components/dashboard/tabs/SummaryTab";
import { DetailTab } from "@/components/dashboard/tabs/DetailTab";
import { ComparisonsTab } from "@/components/dashboard/tabs/ComparisonsTab";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="mb-4 w-full justify-start overflow-x-auto">
        <TabsTrigger value="summary" className="text-sm sm:text-base">{t('summary')}</TabsTrigger>
        <TabsTrigger value="detail" className="text-sm sm:text-base">{t('detailedView')}</TabsTrigger>
        <TabsTrigger value="comparisons" className="text-sm sm:text-base">{t('comparisons')}</TabsTrigger>
      </TabsList>
      
      <div className="w-full overflow-x-hidden">
        <TabsContent value="summary">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <StatsCards />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <EmissionsSummary />
            <ScopeBreakdown />
          </div>
        </TabsContent>
        
        <TabsContent value="detail">
          <DetailTab />
        </TabsContent>
        
        <TabsContent value="comparisons">
          <ComparisonsTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
