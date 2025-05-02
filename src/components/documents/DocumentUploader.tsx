
import { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useSupabaseAuth';

interface DocumentUploaderProps {
  emissionId: string;
  onDocumentUploaded?: () => void;
}

export function DocumentUploader({ emissionId, onDocumentUploaded }: DocumentUploaderProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    
    setUploading(true);
    setProgress(0);

    try {
      // Create a unique path for the file using user ID and timestamp
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${emissionId}/${fileName}`;

      // Upload file to storage bucket
      const uploadOptions = {
        cacheControl: '3600',
      };
      
      // Set up manual progress tracking
      let lastProgress = 0;
      const uploadTask = supabase.storage
        .from('emission-documents')
        .upload(filePath, file, uploadOptions);
        
      // Simulate progress since Supabase doesn't provide real-time progress
      const progressInterval = setInterval(() => {
        lastProgress += Math.floor(Math.random() * 15) + 5;
        if (lastProgress > 95) {
          lastProgress = 95;
          clearInterval(progressInterval);
        }
        setProgress(lastProgress);
      }, 300);
        
      const { error: uploadError } = await uploadTask;
      
      clearInterval(progressInterval);
      setProgress(100);

      if (uploadError) throw uploadError;

      // Get the public URL for the file
      const { data: publicURLData } = supabase.storage
        .from('emission-documents')
        .getPublicUrl(filePath);

      // Insert record in emission_documents table
      const { error: dbError } = await supabase
        .from('emission_documents')
        .insert({
          emission_id: emissionId,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id,
          description: description
        });

      if (dbError) throw dbError;
      
      toast({
        title: t('uploadSuccess'),
        description: t('documentUploaded'),
      });

      // Reset form
      setFile(null);
      setDescription('');
      
      // Notify parent component
      if (onDocumentUploaded) {
        onDocumentUploaded();
      }
    } catch (error: any) {
      toast({
        title: t('uploadError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
        {!file ? (
          <>
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">{t('dragDropFiles')}</p>
            <p className="text-xs text-gray-400 mt-1">{t('maxFileSize')}</p>
            <label className="mt-4">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="cursor-pointer"
              >
                {t('selectFile')}
              </Button>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
              />
            </label>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <File className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium truncate max-w-[200px]">
                  {file.name}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 rounded-full"
                onClick={() => setFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 mb-2">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t('fileDescription')}
        </label>
        <textarea
          className="w-full p-2 border rounded-md text-sm h-20"
          placeholder={t('descriptionPlaceholder')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {uploading && (
        <div className="space-y-1">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right text-gray-500">{progress}%</p>
        </div>
      )}

      <Button 
        onClick={handleUpload} 
        disabled={!file || uploading}
        className="w-full"
      >
        {uploading ? t('uploading') : t('uploadDocument')}
      </Button>
    </div>
  );
}
