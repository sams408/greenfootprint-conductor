
import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { ensureStorageBucket } from './DocumentsService';

interface EmissionDocumentsProps {
  emissionId: string;
}

export function EmissionDocuments({ emissionId }: EmissionDocumentsProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Ensure storage bucket exists on component mount
  useEffect(() => {
    const checkStorageBucket = async () => {
      const bucketExists = await ensureStorageBucket();
      if (!bucketExists) {
        toast({
          title: t('error'),
          description: t('storageBucketMissing'),
          variant: 'destructive',
        });
      }
    };
    
    checkStorageBucket();
  }, [toast, t]);
  
  const handleDocumentUploaded = () => {
    setRefreshTrigger(prev => prev + 1);
    setDialogOpen(false);
  };

  // Ensure we're dealing with a valid UUID
  const isValidUuid = (id: string): boolean => {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidPattern.test(id);
  };

  // If the ID isn't a valid UUID, we can't use it with Supabase
  if (!isValidUuid(emissionId)) {
    console.error(`Invalid UUID format: ${emissionId}`);
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('supportingDocuments')}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-red-500">
            {t('invalidEmissionId')}
          </div>
        </CardContent>
      </Card>
    );
  }

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
              emissionId={emissionId}
              onDocumentUploaded={handleDocumentUploaded}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        <DocumentsList 
          emissionId={emissionId} 
          refreshTrigger={refreshTrigger} 
        />
      </CardContent>
    </Card>
  );
}
