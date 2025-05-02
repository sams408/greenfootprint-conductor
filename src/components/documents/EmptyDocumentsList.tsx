
import { FileText } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function EmptyDocumentsList() {
  const { t } = useLanguage();
  
  return (
    <div className="py-8 text-center text-gray-500">
      <FileText className="h-10 w-10 mx-auto mb-3 text-gray-400" />
      <p>{t('noDocuments')}</p>
      <p className="text-sm">{t('uploadSupportingDocs')}</p>
    </div>
  );
}
