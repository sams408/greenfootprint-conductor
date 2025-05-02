
import { FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

interface Emission {
  id: number;
  date: string;
  scope: string;
  category: string;
  description: string;
  value: number;
  unit: string;
}

interface EmissionsTableProps {
  emissions: Emission[];
  onOpenDetail: (emission: Emission) => void;
}

export function EmissionsTable({ emissions, onOpenDetail }: EmissionsTableProps) {
  const { t } = useLanguage();
  
  return (
    <div className="rounded-md border eco-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('date')}</TableHead>
            <TableHead>{t('scope')}</TableHead>
            <TableHead>{t('category')}</TableHead>
            <TableHead>{t('description')}</TableHead>
            <TableHead className="text-right">{t('value')}</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emissions.length > 0 ? (
            emissions.map((emission) => (
              <TableRow key={emission.id}>
                <TableCell>{new Date(emission.date).toLocaleDateString()}</TableCell>
                <TableCell>{emission.scope}</TableCell>
                <TableCell>{emission.category}</TableCell>
                <TableCell>{emission.description}</TableCell>
                <TableCell className="text-right">
                  {emission.value} {emission.unit}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => onOpenDetail(emission)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                {t('noResults')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
