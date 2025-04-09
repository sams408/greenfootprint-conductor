
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3Icon } from 'lucide-react';

export function EmissionsSummary() {
  const { language, t } = useLanguage();
  
  const [chartData, setChartData] = useState(() => getChartData(language));
  
  useEffect(() => {
    setChartData(getChartData(language));
  }, [language]);
  
  function getChartData(lang: string) {
    const monthNames = [
      t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun')
    ];
      
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
    <Card className="col-span-2 shadow-md border-2 border-border/70 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-card to-card/80">
        <CardTitle className="flex items-center gap-2">
          <BarChart3Icon className="h-5 w-5 text-primary" />
          {t('emissionsByScope')}
        </CardTitle>
        <CardDescription>
          {t('monthlyComparisonOfEmissions')}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4">
        <div className="h-[300px] w-full bg-gradient-to-br from-background/50 to-background rounded-lg p-3">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 5,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="name" tickLine={false} axisLine={{ strokeWidth: 1 }} />
                <YAxis tickLine={false} axisLine={{ strokeWidth: 1 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  wrapperStyle={{ 
                    paddingTop: '15px', 
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px'
                  }} 
                />
                <Bar 
                  dataKey="scope1" 
                  name={t('scope1')} 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.15))' }}
                />
                <Bar 
                  dataKey="scope2" 
                  name={t('scope2')} 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]}
                  style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.15))' }}
                />
                <Bar 
                  dataKey="scope3" 
                  name={t('scope3')} 
                  fill="#8B5CF6" 
                  radius={[4, 4, 0, 0]}
                  style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.15))' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
