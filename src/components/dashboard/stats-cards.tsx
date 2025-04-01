
import { Car, Factory, Lightbulb, Sprout, TrendingDown } from 'lucide-react';
import { useLanguage } from "@/hooks/useLanguage";

export function StatsCards() {
  const { language, t } = useLanguage();
  
  const stats = [
    {
      title: language === 'en' ? "Total Emissions" : "Emisiones Totales",
      value: "324.6",
      unit: "Ton CO2eq",
      change: "-5.2%",
      icon: Sprout,
      positive: true,
    },
    {
      title: language === 'en' ? "Scope 1" : "Alcance 1",
      value: "87.3",
      unit: "Ton CO2eq",
      change: "-2.8%",
      icon: Factory,
      positive: true,
    },
    {
      title: language === 'en' ? "Scope 2" : "Alcance 2",
      value: "115.9",
      unit: "Ton CO2eq",
      change: "-7.4%",
      icon: Lightbulb,
      positive: true,
    },
    {
      title: language === 'en' ? "Scope 3" : "Alcance 3",
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
        <div key={stat.title} className="stats-card">
          <div className="flex justify-between items-start mb-3">
            <div className="eco-icon">
              <stat.icon className="h-5 w-5" />
            </div>
            <div className={`flex items-center text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
              <TrendingDown className={`h-3 w-3 mr-1 ${!stat.positive && 'rotate-180'}`} />
              {stat.change}
            </div>
          </div>
          <p className="stats-label">{stat.title}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="stats-value">{stat.value}</span>
            <span className="text-xs text-muted-foreground">{stat.unit}</span>
          </div>
        </div>
      ))}
    </>
  );
}
