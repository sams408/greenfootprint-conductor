
import { useState } from 'react';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

export function EmissionForm() {
  const { toast } = useToast();
  const [selectedScope, setSelectedScope] = useState("scope1");
  const { t } = useLanguage();
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: t('dataSubmitted'),
      description: t('emissionDataRegistered'),
    });
  };

  return (
    <Card className="eco-card">
      <CardHeader>
        <CardTitle>{t('emissionRegistration')}</CardTitle>
        <CardDescription>
          {t('enterConsumptionData')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scope1" onValueChange={setSelectedScope}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scope1">{t('scope1')}</TabsTrigger>
            <TabsTrigger value="scope2">{t('scope2')}</TabsTrigger>
            <TabsTrigger value="scope3">{t('scope3')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scope1">
            <form onSubmit={handleSubmit}>
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
          </TabsContent>
          
          <TabsContent value="scope2">
            <form onSubmit={handleSubmit}>
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
          </TabsContent>
          
          <TabsContent value="scope3">
            <form onSubmit={handleSubmit}>
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
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {t('emissionsFactorNote')}
        </p>
      </CardFooter>
    </Card>
  );
}
