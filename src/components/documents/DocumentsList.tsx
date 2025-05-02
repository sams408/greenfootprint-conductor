
import { useEffect, useState } from 'react';
import { FileText, Download, Trash, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useSupabaseAuth';

type Document = {
  id: string;
  emission_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  uploaded_by: string;
  description: string | null;
};

interface DocumentsListProps {
  emissionId: string;
  refreshTrigger?: number;
}

export function DocumentsList({ emissionId, refreshTrigger = 0 }: DocumentsListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();

  // Load documents
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('emission_documents')
          .select('*')
          .eq('emission_id', emissionId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDocuments(data || []);
      } catch (error: any) {
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

  const handleDownload = async (document: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('emission-documents')
        .download(document.file_path);
      
      if (error) throw error;
      
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
      // Delete from database
      const { error: dbError } = await supabase
        .from('emission_documents')
        .delete()
        .eq('id', documentId);
      
      if (dbError) throw dbError;
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('emission-documents')
        .remove([filePath]);
      
      if (storageError) throw storageError;
      
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

  const handleView = async (document: Document) => {
    try {
      const { data } = supabase.storage
        .from('emission-documents')
        .getPublicUrl(document.file_path);
      
      window.open(data.publicUrl, '_blank');
    } catch (error: any) {
      toast({
        title: t('viewError'),
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('image')) return 'image';
    if (fileType.includes('excel') || fileType.includes('sheet')) return 'excel';
    if (fileType.includes('word') || fileType.includes('document')) return 'word';
    return 'file';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (loading) {
    return <div className="py-4 text-center text-gray-500">{t('loading')}</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <FileText className="h-10 w-10 mx-auto mb-3 text-gray-400" />
        <p>{t('noDocuments')}</p>
        <p className="text-sm">{t('uploadSupportingDocs')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-sm leading-none">{doc.file_name}</h4>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>{formatFileSize(doc.file_size)}</span>
                    <span>•</span>
                    <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                  </div>
                  {doc.description && (
                    <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                  )}
                </div>
              </div>
              <div className="flex mt-3 sm:mt-0 space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleView(doc)}
                  className="h-8 text-xs"
                >
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  {t('view')}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDownload(doc)}
                  className="h-8 text-xs"
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  {t('download')}
                </Button>
                
                {user?.id === doc.uploaded_by && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(doc.id, doc.file_path)}
                    className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="h-3.5 w-3.5 mr-1.5" />
                    {t('delete')}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
