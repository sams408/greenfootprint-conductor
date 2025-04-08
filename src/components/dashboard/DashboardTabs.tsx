
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
  
  // Set active tab based on URL parameter if present
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["summary", "detail", "comparisons"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="mb-4">
        <TabsTrigger value="summary">{t('summary')}</TabsTrigger>
        <TabsTrigger value="detail">{t('detailedView')}</TabsTrigger>
        <TabsTrigger value="comparisons">{t('comparisons')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="summary">
        <SummaryTab />
      </TabsContent>
      
      <TabsContent value="detail">
        <DetailTab />
      </TabsContent>
      
      <TabsContent value="comparisons">
        <ComparisonsTab />
      </TabsContent>
    </Tabs>
  );
}
