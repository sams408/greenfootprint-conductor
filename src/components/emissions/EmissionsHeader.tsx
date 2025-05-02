
import { FileDown, FileUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

interface EmissionsHeaderProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}

export function EmissionsHeader({ showForm, setShowForm }: EmissionsHeaderProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('emissions')}</h1>
        <p className="text-muted-foreground">
          {t('distribution')}
        </p>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4" />
          {showForm ? t('cancel') : `${t('addItem')}`}
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <FileDown className="h-4 w-4" />
          {t('export')}
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <FileUp className="h-4 w-4" />
          {t('import')}
        </Button>
      </div>
    </div>
  );
}
