
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

interface Scope3FormProps {
  onSubmit: (event: React.FormEvent) => void;
}

export function Scope3Form({ onSubmit }: Scope3FormProps) {
  const { t } = useLanguage();
  
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="category">{t('category')}</Label>
          <Select required>
            <SelectTrigger id="category">
              <SelectValue placeholder={t('selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business-travel">{t('businessTravel')}</SelectItem>
              <SelectItem value="employee-commuting">{t('employeeCommuting')}</SelectItem>
              <SelectItem value="waste">{t('waste')}</SelectItem>
              <SelectItem value="purchased-goods">{t('purchasedGoods')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">{t('description')}</Label>
          <Input id="description" placeholder={t('descriptionPlaceholder')} required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">{t('amount')}</Label>
            <Input id="amount" type="number" min="0" step="0.01" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="unit3">{t('unit')}</Label>
            <Select required>
              <SelectTrigger id="unit3">
                <SelectValue placeholder={t('selectUnit')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km">{t('kilometers')}</SelectItem>
                <SelectItem value="kg">{t('kilograms')}</SelectItem>
                <SelectItem value="units">{t('units')}</SelectItem>
                <SelectItem value="euros">{t('euros')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="period3">{t('period')}</Label>
          <Input id="period3" type="month" required />
        </div>
      </div>
      
      <Button type="submit" className="mt-4 w-full">{t('registerEmissions')}</Button>
    </form>
  );
}
