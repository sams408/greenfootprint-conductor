
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { DocumentItem } from './DocumentItem';
import { EmptyDocumentsList } from './EmptyDocumentsList';
import { DocumentType } from './types';
import { DocumentSkeleton } from './DocumentSkeleton';
import { 
  getEmissionDocuments, 
  downloadDocument, 
  deleteDocument, 
  getDocumentPublicUrl 
} from './DocumentsService';

interface DocumentsListProps {
  emissionId: string;
  refreshTrigger?: number;
}

export function DocumentsList({ emissionId, refreshTrigger = 0 }: DocumentsListProps) {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();

  // Load documents
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const data = await getEmissionDocuments(emissionId);
        setDocuments(data);
      } catch (error: any) {
        console.error("Error fetching documents:", error);
        toast({
          title: t('error'),
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [emissionId, refreshTrigger, toast, t]);

  const handleDownload = async (document: DocumentType) => {
    try {
      const data = await downloadDocument(document.file_path);
      
      // Create a URL and trigger download
      const url = URL.createObjectURL(data);
      const a = window.document.createElement('a');
      window.document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = document.file_name;
      a.click();
      URL.revokeObjectURL(url);
      window.document.body.removeChild(a);
    } catch (error: any) {
      toast({
        title: t('downloadError'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (documentId: string, filePath: string) => {
    if (!window.confirm(t('confirmDelete'))) return;

    try {
      await deleteDocument(documentId, filePath);
      
      // Update UI
      setDocuments(documents.filter(doc => doc.id !== documentId));
      
      toast({
        title: t('deleteSuccess'),
        description: t('documentDeleted'),
      });
    } catch (error: any) {
      toast({
        title: t('deleteError'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleView = async (document: DocumentType) => {
    try {
      const publicUrl = getDocumentPublicUrl(document.file_path);
      window.open(publicUrl, '_blank');
    } catch (error: any) {
      toast({
        title: t('viewError'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <DocumentSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return <EmptyDocumentsList />;
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <DocumentItem
          key={doc.id}
          document={doc}
          currentUserId={user?.id}
          onView={handleView}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
