
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

interface Scope2FormProps {
  onSubmit: (event: React.FormEvent) => void;
}

export function Scope2Form({ onSubmit }: Scope2FormProps) {
  const { t } = useLanguage();
  
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="energyType">{t('energyType')}</Label>
          <Select required>
            <SelectTrigger id="energyType">
              <SelectValue placeholder={t('selectEnergyType')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electricity">{t('electricity')}</SelectItem>
              <SelectItem value="heat">{t('heatCool')}</SelectItem>
              <SelectItem value="steam">{t('steam')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="consumption2">{t('consumption')}</Label>
            <Input id="consumption2" type="number" min="0" step="0.01" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="unit2">{t('unit')}</Label>
            <Select required>
              <SelectTrigger id="unit2">
                <SelectValue placeholder={t('selectUnit')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kwh">{t('kwh')}</SelectItem>
                <SelectItem value="mwh">{t('mwh')}</SelectItem>
                <SelectItem value="gj">{t('gj')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">{t('location')}</Label>
          <Input id="location" placeholder={t('locationPlaceholder')} required />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="period2">{t('period')}</Label>
          <Input id="period2" type="month" required />
        </div>
      </div>
      
      <Button type="submit" className="mt-4 w-full">{t('registerEmissions')}</Button>
    </form>
  );
}
