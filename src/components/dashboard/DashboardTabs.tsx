
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryTab } from "@/components/dashboard/tabs/SummaryTab";
import { DetailTab } from "@/components/dashboard/tabs/DetailTab";
import { ComparisonsTab } from "@/components/dashboard/tabs/ComparisonsTab";
import { useLanguage } from "@/hooks/useLanguage";

export function DashboardTabs() {
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="summary" className="mb-6">
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
