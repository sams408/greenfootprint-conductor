
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

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
        <CardTitle>{t('emissionsByCategory')}</CardTitle>
        <CardDescription>
          {t('distribution')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex items-center justify-center">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={1000}
                  animationBegin={0}
                  nameKey="name"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ 
                    paddingTop: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "16px"
                  }}
                  formatter={(value, entry, index) => (
                    <span className="text-sm font-medium flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: chartData[index].color }}></span>
                      {value} ({chartData[index].value}%)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-8 pt-4 border-t">
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
