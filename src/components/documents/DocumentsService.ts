
import { supabase } from '@/integrations/supabase/client';
import { DocumentType } from './types';

export const getEmissionDocuments = async (emissionId: string) => {
  const { data, error } = await supabase
    .from('emission_documents')
    .select('*')
    .eq('emission_id', emissionId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const downloadDocument = async (filePath: string) => {
  const { data, error } = await supabase.storage
    .from('emission-documents')
    .download(filePath);
  
  if (error) throw error;
  return data;
};

export const deleteDocument = async (documentId: string, filePath: string) => {
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
};

export const getDocumentPublicUrl = (filePath: string) => {
  const { data } = supabase.storage
    .from('emission-documents')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};
