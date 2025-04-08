
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';

interface Scope1FormProps {
  onSubmit: (event: React.FormEvent) => void;
}

export function Scope1Form({ onSubmit }: Scope1FormProps) {
  const { t } = useLanguage();
  
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fuelType">{t('fuelType')}</Label>
          <Select required>
            <SelectTrigger id="fuelType">
              <SelectValue placeholder={t('selectFuel')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diesel">{t('diesel')}</SelectItem>
              <SelectItem value="gasoline">{t('gasoline')}</SelectItem>
              <SelectItem value="natgas">{t('naturalGas')}</SelectItem>
              <SelectItem value="lpg">{t('lpg')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="consumption">{t('consumption')}</Label>
            <Input id="consumption" type="number" min="0" step="0.01" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="unit">{t('unit')}</Label>
            <Select required>
              <SelectTrigger id="unit">
                <SelectValue placeholder={t('selectUnit')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="liters">{t('liters')}</SelectItem>
                <SelectItem value="kg">{t('kilograms')}</SelectItem>
                <SelectItem value="m3">{t('cubicMeters')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="source">{t('source')}</Label>
          <Select required>
            <SelectTrigger id="source">
              <SelectValue placeholder={t('selectSource')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buildings">{t('buildings')}</SelectItem>
              <SelectItem value="vehicles">{t('vehicleFleet')}</SelectItem>
              <SelectItem value="machinery">{t('machinery')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="period">{t('period')}</Label>
          <Input id="period" type="month" required />
        </div>
      </div>
      
      <Button type="submit" className="mt-4 w-full">{t('registerEmissions')}</Button>
    </form>
  );
}
