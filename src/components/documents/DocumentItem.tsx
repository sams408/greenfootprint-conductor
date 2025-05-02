
import { FileText, Download, Trash, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { DocumentType } from './types';

interface DocumentItemProps {
  document: DocumentType;
  currentUserId?: string;
  onView: (document: DocumentType) => void;
  onDownload: (document: DocumentType) => void;
  onDelete: (documentId: string, filePath: string) => void;
}

export function DocumentItem({ document, currentUserId, onView, onDownload, onDelete }: DocumentItemProps) {
  const { t } = useLanguage();

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <Card key={document.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-sm leading-none">{document.file_name}</h4>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span>{formatFileSize(document.file_size)}</span>
                <span>•</span>
                <span>{new Date(document.created_at).toLocaleDateString()}</span>
              </div>
              {document.description && (
                <p className="text-sm text-gray-600 mt-1">{document.description}</p>
              )}
            </div>
          </div>
          <div className="flex mt-3 sm:mt-0 space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onView(document)}
              className="h-8 text-xs"
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              {t('view')}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDownload(document)}
              className="h-8 text-xs"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              {t('download')}
            </Button>
            
            {currentUserId === document.uploaded_by && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDelete(document.id, document.file_path)}
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
  );
}
