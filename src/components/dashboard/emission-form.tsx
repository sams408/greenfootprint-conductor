
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Scope1Form } from './emission-forms/Scope1Form';
import { Scope2Form } from './emission-forms/Scope2Form';
import { Scope3Form } from './emission-forms/Scope3Form';

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
            <Scope1Form onSubmit={handleSubmit} />
          </TabsContent>
          
          <TabsContent value="scope2">
            <Scope2Form onSubmit={handleSubmit} />
          </TabsContent>
          
          <TabsContent value="scope3">
            <Scope3Form onSubmit={handleSubmit} />
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
