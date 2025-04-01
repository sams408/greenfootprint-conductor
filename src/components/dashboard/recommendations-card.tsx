
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Leaf, Recycle, Car, PlugZap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';

export function RecommendationsCard() {
  const { language } = useLanguage();
  
  const [recommendations, setRecommendations] = useState(() => getRecommendations(language));
  
  useEffect(() => {
    setRecommendations(getRecommendations(language));
  }, [language]);
  
  function getRecommendations(lang: string) {
    if (lang === 'en') {
      return [
        {
          id: 1,
          title: "Optimize electricity consumption",
          description: "15% reduction possible through LED usage and climate control adjustments",
          impact: "High",
          icon: Lightbulb,
        },
        {
          id: 2,
          title: "Implement sustainable transport plan",
          description: "Incentives for carpooling and public transportation",
          impact: "Medium",
          icon: Car,
        },
        {
          id: 3,
          title: "Renewable energy sources",
          description: "Contract electricity supply with renewable origin guarantee",
          impact: "High",
          icon: PlugZap,
        },
        {
          id: 4,
          title: "Business recycling program",
          description: "Implement waste separation and composting",
          impact: "Low",
          icon: Recycle,
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: "Optimizar consumo eléctrico",
          description: "Reducción de 15% posible mediante uso de LED y ajustes de climatización",
          impact: "Alto",
          icon: Lightbulb,
        },
        {
          id: 2,
          title: "Implementar plan de transporte sostenible",
          description: "Incentivos para compartir vehículo y transporte público",
          impact: "Medio",
          icon: Car,
        },
        {
          id: 3,
          title: "Fuentes de energía renovable",
          description: "Contratar suministro eléctrico con garantía de origen renovable",
          impact: "Alto",
          icon: PlugZap,
        },
        {
          id: 4,
          title: "Programa de reciclaje empresarial",
          description: "Implementar separación de residuos y compostaje",
          impact: "Bajo",
          icon: Recycle,
        },
      ];
    }
  }
  
  // Function to get the appropriate style for the impact badge
  const getImpactStyle = (impact: string) => {
    if (impact === 'Alto' || impact === 'High') return "bg-green-100 text-green-800";
    if (impact === 'Medio' || impact === 'Medium') return "bg-amber-100 text-amber-800";
    return "bg-blue-100 text-blue-800";
  };
  
  // Function to translate impact level for display
  const getImpactText = (impact: string) => {
    const isEnglish = language === 'en';
    if (impact === 'Alto' || impact === 'High') return isEnglish ? 'High Impact' : 'Impacto Alto';
    if (impact === 'Medio' || impact === 'Medium') return isEnglish ? 'Medium Impact' : 'Impacto Medio';
    return isEnglish ? 'Low Impact' : 'Impacto Bajo';
  };

  return (
    <Card className="eco-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-eco-primary" />
            {language === 'en' ? 'Recommendations' : 'Recomendaciones'}
          </CardTitle>
          <CardDescription>
            {language === 'en' ? 'Suggested improvements based on your emissions' : 'Mejoras sugeridas según tus emisiones'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="flex items-start gap-3 rounded-lg border p-3 shadow-sm">
            <div className="mt-0.5 eco-icon">
              <rec.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{rec.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactStyle(rec.impact)}`}>
                  {getImpactText(rec.impact)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
