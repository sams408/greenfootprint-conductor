
export interface DocumentType {
  id: string;
  emission_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  uploaded_by: string;
  description: string | null;
}
