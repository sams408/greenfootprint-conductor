
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';

export function EmissionsSummary() {
  const { language, t } = useLanguage();
  
  const [chartData, setChartData] = useState(() => getChartData(language));
  
  useEffect(() => {
    setChartData(getChartData(language));
  }, [language]);
  
  function getChartData(lang: string) {
    const monthNames = lang === 'en' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
      
    return [
      { name: monthNames[0], alcance1: 40, alcance2: 24, alcance3: 28 },
      { name: monthNames[1], alcance1: 30, alcance2: 20, alcance3: 27 },
      { name: monthNames[2], alcance1: 25, alcance2: 25, alcance3: 32 },
      { name: monthNames[3], alcance1: 27, alcance2: 18, alcance3: 29 },
      { name: monthNames[4], alcance1: 32, alcance2: 21, alcance3: 35 },
      { name: monthNames[5], alcance1: 38, alcance2: 25, alcance3: 40 },
    ];
  }
  
  const scopeLabels = {
    alcance1: language === 'en' ? 'Scope 1' : 'Alcance 1',
    alcance2: language === 'en' ? 'Scope 2' : 'Alcance 2',
    alcance3: language === 'en' ? 'Scope 3' : 'Alcance 3',
  };

  return (
    <Card className="col-span-2 eco-card">
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Emissions by Scope' : 'Emisiones por Alcance'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Monthly comparison of CO2eq emissions (tons)' 
            : 'Comparativa mensual de emisiones de CO2eq (toneladas)'}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #eaeaea' }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
                formatter={(value, name) => {
                  const translatedName = scopeLabels[name as keyof typeof scopeLabels] || name;
                  return [value, translatedName];
                }}
              />
              <Legend 
                formatter={(value) => {
                  return scopeLabels[value as keyof typeof scopeLabels] || value;
                }}
              />
              <Bar dataKey="alcance1" name="alcance1" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="alcance2" name="alcance2" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="alcance3" name="alcance3" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
