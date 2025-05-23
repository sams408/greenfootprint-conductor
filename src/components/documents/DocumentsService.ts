
import { supabase } from '@/integrations/supabase/client';
import { DocumentType } from './types';

// Helper function to validate and sanitize UUIDs
const validateEmissionId = (emissionId: string): string => {
  // Check if the ID is already a valid UUID
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (uuidPattern.test(emissionId)) {
    return emissionId;
  } else {
    throw new Error(`Invalid UUID format: ${emissionId}`);
  }
};

// Function to check if our storage bucket exists and create it if not
export const ensureStorageBucket = async () => {
  try {
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === 'emission-documents');
    
    if (!bucketExists) {
      // Create bucket if it doesn't exist
      const { data, error } = await supabase.storage.createBucket('emission-documents', {
        public: true,
      });
      
      if (error) throw error;
      console.log('Created storage bucket:', data);
    }
    return true;
  } catch (error) {
    console.error("Error ensuring storage bucket exists:", error);
    return false;
  }
};

export const getEmissionDocuments = async (emissionId: string) => {
  try {
    // Validate the emission ID before querying
    const validatedId = validateEmissionId(emissionId);
    
    const { data, error } = await supabase
      .from('emission_documents')
      .select('*')
      .eq('emission_id', validatedId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error in getEmissionDocuments:", error);
    throw error;
  }
};

export const downloadDocument = async (filePath: string) => {
  try {
    // Ensure the bucket exists
    await ensureStorageBucket();
    
    const { data, error } = await supabase.storage
      .from('emission-documents')
      .download(filePath);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error in downloadDocument:", error);
    throw error;
  }
};

export const deleteDocument = async (documentId: string, filePath: string) => {
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
  } catch (error) {
    console.error("Error in deleteDocument:", error);
    throw error;
  }
};

export const getDocumentPublicUrl = (filePath: string) => {
  const { data } = supabase.storage
    .from('emission-documents')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};
