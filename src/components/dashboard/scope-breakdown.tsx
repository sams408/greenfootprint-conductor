import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChartIcon } from "lucide-react";

export function ScopeBreakdown() {
  const { language, t } = useLanguage();
  const [chartData, setChartData] = useState(() => getData(language));
  
  useEffect(() => {
    setChartData(getData(language));
  }, [language]);

  function getData(lang: string) {
    const labels = lang === 'es' 
      ? ['Transporte', 'Electricidad', 'Dieta', 'Residuos', 'Otros'] 
      : ['Transport', 'Electricity', 'Diet', 'Waste', 'Others'];
    
    return [
      { name: labels[0], value: 35, color: "#22C55E" },
      { name: labels[1], value: 25, color: "#3B82F6" },
      { name: labels[2], value: 20, color: "#8B5CF6" },
      { name: labels[3], value: 15, color: "#F59E0B" },
      { name: labels[4], value: 5, color: "#EC4899" },
    ];
  }

  const chartConfig = {
    transport: { 
      label: t('transport'),
      theme: { 
        light: '#22C55E',
        dark: '#22C55E'
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
        light: '#8B5CF6',
        dark: '#8B5CF6'
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
        light: '#EC4899',
        dark: '#EC4899'
      }
    }
  };

  return (
    <Card className="shadow-md border-2 border-border/70 overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2 bg-gradient-to-r from-card to-card/80">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <PieChartIcon className="h-5 w-5 text-primary" />
          {t('emissionsByCategory')}
        </CardTitle>
        <CardDescription className="text-sm">
          {t('distribution')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 flex-1 flex flex-col">
        <div className="flex-1 min-h-[200px] w-full bg-gradient-to-br from-background/50 to-background rounded-lg p-2 sm:p-3 mb-4">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={({ height }) => Math.min(height * 0.35, 80)}
                  innerRadius={({ height }) => Math.min(height * 0.2, 40)}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ filter: 'drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.25))' }} 
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {chartData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center gap-2 bg-card p-1.5 sm:p-2 rounded-lg shadow-sm">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-xs sm:text-sm font-medium">{entry.name} ({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-2 pt-3 border-t">
          <h4 className="text-sm font-medium mb-2">{t('highlightedInsights')}</h4>
          <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
            <li>{t('transportHighestContributor')}</li>
            <li>{t('electricityReduction')}</li>
            <li>{t('wasteManagementImproving')}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
