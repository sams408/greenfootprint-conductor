
import { FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmissionDocuments } from '@/components/documents/EmissionDocuments';
import { useLanguage } from '@/hooks/useLanguage';
import { useState, useEffect } from 'react';

interface EmissionDetailProps {
  isOpen: boolean;
  onClose: () => void;
  emission: {
    id: number;
    date: string;
    scope: string;
    category: string;
    description: string;
    value: number;
    unit: string;
  } | null;
}

export function EmissionDetailDialog({ isOpen, onClose, emission }: EmissionDetailProps) {
  const { t } = useLanguage();
  
  // Generate a UUID from the numeric emission ID
  const getEmissionUuid = (id: number | null) => {
    if (!id) return null;
    
    // Use a deterministic method to create a UUID from a number
    // This ensures we always get the same UUID for the same emission ID
    const idStr = id.toString();
    const baseUuid = "00000000-0000-4000-8000-000000000000";
    const parts = baseUuid.split('-');
    
    // Modify the last segment with the emission ID, ensuring it fits
    let lastPart = idStr.padStart(12, '0');
    if (lastPart.length > 12) {
      lastPart = lastPart.substring(lastPart.length - 12);
    }
    
    parts[4] = lastPart;
    return parts.join('-');
  };
  
  if (!emission) return null;
  
  const emissionUuid = getEmissionUuid(emission.id);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{emission.description}</DialogTitle>
          <DialogDescription>
            {t('scope')} {emission.scope} - {emission.category} - {new Date(emission.date).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between items-center mb-4 text-sm">
            <div>
              <span className="font-medium">{t('emissionValue')}:</span> {emission.value} {emission.unit}
            </div>
            <div>
              <span className="font-medium">{t('registeredDate')}:</span> {new Date(emission.date).toLocaleDateString()}
            </div>
          </div>
          
          {emissionUuid && (
            <EmissionDocuments emissionId={emissionUuid} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
