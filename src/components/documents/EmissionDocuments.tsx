
import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentUploader } from './DocumentUploader';
import { DocumentsList } from './DocumentsList';
import { useLanguage } from '@/hooks/useLanguage';

interface EmissionDocumentsProps {
  emissionId: string;
}

export function EmissionDocuments({ emissionId }: EmissionDocumentsProps) {
  const { t } = useLanguage();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleDocumentUploaded = () => {
    setRefreshTrigger(prev => prev + 1);
    setDialogOpen(false);
  };

  // Format the emission ID to ensure it's a valid UUID
  // This is crucial because Supabase expects a UUID format for the emission_id column
  const formattedEmissionId = typeof emissionId === 'string' 
    ? (emissionId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i) 
      ? emissionId 
      : `emission-${emissionId}`)
    : `emission-${emissionId}`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('supportingDocuments')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('documentationDescription')}
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              {t('uploadDocument')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t('uploadSupportingDocs')}</DialogTitle>
              <DialogDescription>
                {t('uploadDocumentDescription')}
              </DialogDescription>
            </DialogHeader>
            <DocumentUploader 
              emissionId={formattedEmissionId}
              onDocumentUploaded={handleDocumentUploaded}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        <DocumentsList 
          emissionId={formattedEmissionId} 
          refreshTrigger={refreshTrigger} 
        />
      </CardContent>
    </Card>
  );
}
