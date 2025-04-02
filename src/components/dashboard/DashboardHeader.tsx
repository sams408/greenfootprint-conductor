
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/useLanguage";

export function DashboardHeader() {
  const { t } = useLanguage();
  
  return (
    <>
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
    </>
  );
}
