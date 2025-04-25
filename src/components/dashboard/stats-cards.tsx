
import { Card, CardContent } from "@/components/ui/card";
import { Car, Factory, Lightbulb, Sprout, TrendingDown } from 'lucide-react';
import { useLanguage } from "@/hooks/useLanguage";

export function StatsCards() {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: t('totalEmissions'),
      value: "324.6",
      unit: "Ton CO2eq",
      change: "-5.2%",
      icon: Sprout,
      positive: true,
    },
    {
      title: t('scope1'),
      value: "87.3",
      unit: "Ton CO2eq",
      change: "-2.8%",
      icon: Factory,
      positive: true,
    },
    {
      title: t('scope2'),
      value: "115.9",
      unit: "Ton CO2eq",
      change: "-7.4%",
      icon: Lightbulb,
      positive: true,
    },
    {
      title: t('scope3'),
      value: "121.4",
      unit: "Ton CO2eq",
      change: "+1.2%",
      icon: Car,
      positive: false,
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex justify-between items-start gap-2 mb-3">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center bg-primary/10">
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className={`flex items-center text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                <TrendingDown className={`h-3 w-3 mr-1 ${!stat.positive && 'rotate-180'}`} />
                {stat.change}
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground line-clamp-1">{stat.title}</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-bold">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.unit}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
