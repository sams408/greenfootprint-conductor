
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
  
  if (!emission) return null;
  
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
          
          <EmissionDocuments emissionId={emission.id.toString()} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
