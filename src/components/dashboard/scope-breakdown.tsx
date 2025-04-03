
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { PieChartIcon } from "lucide-react";

export function ScopeBreakdown() {
  const { language, t } = useLanguage();
  const [chartData, setChartData] = useState(() => getData(language));
  
  // Update chart data when language changes
  useEffect(() => {
    setChartData(getData(language));
  }, [language]);

  // Data for the chart
  function getData(lang: string) {
    const labels = lang === 'es' 
      ? ['Transporte', 'Electricidad', 'Dieta', 'Residuos', 'Otros'] 
      : ['Transport', 'Electricity', 'Diet', 'Waste', 'Others'];
    
    return [
      { name: labels[0], value: 35, color: "#10B981" },
      { name: labels[1], value: 25, color: "#3B82F6" },
      { name: labels[2], value: 20, color: "#6366F1" },
      { name: labels[3], value: 15, color: "#F59E0B" },
      { name: labels[4], value: 5, color: "#8B5CF6" },
    ];
  }

  const chartConfig = {
    transport: { 
      label: t('transport'),
      theme: { 
        light: '#10B981',
        dark: '#10B981'
      }
    },
    electricity: { 
      label: t('electricity'),
      theme: { 
        light: '#3B82F6',
        dark: '#3B82F6'
      }
    },
    diet: { 
      label: t('diet'),
      theme: { 
        light: '#6366F1',
        dark: '#6366F1'
      }
    },
    waste: { 
      label: t('waste'),
      theme: { 
        light: '#F59E0B',
        dark: '#F59E0B'
      }
    },
    others: { 
      label: t('others'),
      theme: { 
        light: '#8B5CF6',
        dark: '#8B5CF6'
      }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5" />
          {t('emissionsByCategory')}
        </CardTitle>
        <CardDescription>
          {t('distribution')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full flex items-center justify-center">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={1000}
                  animationBegin={0}
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, '']}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-2">
          <div className="flex flex-wrap justify-center gap-4 my-4">
            {chartData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm">{entry.name} ({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium mb-3">{t('highlightedInsights')}</h4>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
            <li>{t('transportHighestContributor')}</li>
            <li>{t('electricityReduction')}</li>
            <li>{t('wasteManagementImproving')}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
