
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

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
      { name: monthNames[0], scope1: 40, scope2: 24, scope3: 28, total: 92 },
      { name: monthNames[1], scope1: 30, scope2: 20, scope3: 27, total: 77 },
      { name: monthNames[2], scope1: 25, scope2: 25, scope3: 32, total: 82 },
      { name: monthNames[3], scope1: 27, scope2: 18, scope3: 29, total: 74 },
      { name: monthNames[4], scope1: 32, scope2: 21, scope3: 35, total: 88 },
      { name: monthNames[5], scope1: 38, scope2: 25, scope3: 40, total: 103 },
    ];
  }
  
  const chartConfig = {
    scope1: {
      label: t('scope1'),
      theme: { 
        light: '#3B82F6', // primary blue
        dark: '#3B82F6'
      }
    },
    scope2: {
      label: t('scope2'),
      theme: { 
        light: '#10B981', // green
        dark: '#10B981'
      }
    },
    scope3: {
      label: t('scope3'),
      theme: { 
        light: '#8B5CF6', // purple
        dark: '#8B5CF6'
      }
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{t('emissionsByScope')}</CardTitle>
        <CardDescription>
          {t('monthlyComparisonOfEmissions')}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
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
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="scope1" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="scope2" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="scope3" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
