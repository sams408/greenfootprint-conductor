
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Leaf, Recycle, Car, PlugZap, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function RecommendationsCard() {
  const { language } = useLanguage();
  
  const [recommendations, setRecommendations] = useState(() => getRecommendations(language));
  const [expandedRec, setExpandedRec] = useState<number | null>(null);
  
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
          steps: [
            "1. Replace all traditional light bulbs with LED lighting (saves up to 80% energy)",
            "2. Install programmable thermostats to optimize cooling/heating times",
            "3. Schedule regular maintenance for HVAC systems to ensure efficiency",
            "4. Configure computers and equipment to use energy-saving modes",
            "5. Train staff on proper energy conservation practices"
          ]
        },
        {
          id: 2,
          title: "Implement sustainable transport plan",
          description: "Incentives for carpooling and public transportation",
          impact: "Medium",
          icon: Car,
          steps: [
            "1. Create a company carpooling program with scheduling tools",
            "2. Offer transit subsidies for employees using public transportation",
            "3. Implement a flexible work policy to reduce commuting days",
            "4. Install secure bicycle storage and shower facilities",
            "5. Consider transitioning fleet vehicles to electric or hybrid models"
          ]
        },
        {
          id: 3,
          title: "Renewable energy sources",
          description: "Contract electricity supply with renewable origin guarantee",
          impact: "High",
          icon: PlugZap,
          steps: [
            "1. Request quotes from certified renewable energy providers",
            "2. Verify Guarantee of Origin certificates for electricity supply",
            "3. Consider on-site solar panel installation for applicable facilities",
            "4. Conduct energy audit to identify optimal renewable solution",
            "5. Track and report emissions reduction from renewable transition"
          ]
        },
        {
          id: 4,
          title: "Business recycling program",
          description: "Implement waste separation and composting",
          impact: "Low",
          icon: Recycle,
          steps: [
            "1. Set up clearly labeled recycling stations throughout facilities",
            "2. Contract specialized waste management services for proper disposal",
            "3. Implement paperless initiative to reduce paper consumption",
            "4. Train staff on proper waste separation procedures",
            "5. Track waste metrics and set reduction targets"
          ]
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
          steps: [
            "1. Sustituir todas las bombillas tradicionales por iluminación LED (ahorra hasta 80% de energía)",
            "2. Instalar termostatos programables para optimizar tiempos de refrigeración/calefacción",
            "3. Programar mantenimiento regular de sistemas HVAC para garantizar eficiencia",
            "4. Configurar ordenadores y equipos para usar modos de ahorro de energía",
            "5. Capacitar al personal en prácticas adecuadas de conservación energética"
          ]
        },
        {
          id: 2,
          title: "Implementar plan de transporte sostenible",
          description: "Incentivos para compartir vehículo y transporte público",
          impact: "Medio",
          icon: Car,
          steps: [
            "1. Crear un programa de coche compartido con herramientas de programación",
            "2. Ofrecer subsidios para empleados que utilicen transporte público",
            "3. Implementar política de trabajo flexible para reducir días de desplazamiento",
            "4. Instalar estacionamiento seguro para bicicletas e instalaciones de duchas",
            "5. Considerar la transición de la flota de vehículos a modelos eléctricos o híbridos"
          ]
        },
        {
          id: 3,
          title: "Fuentes de energía renovable",
          description: "Contratar suministro eléctrico con garantía de origen renovable",
          impact: "Alto",
          icon: PlugZap,
          steps: [
            "1. Solicitar presupuestos a proveedores certificados de energía renovable",
            "2. Verificar certificados de Garantía de Origen para el suministro eléctrico",
            "3. Considerar la instalación de paneles solares en las instalaciones aplicables",
            "4. Realizar auditoría energética para identificar la solución renovable óptima",
            "5. Seguir y reportar la reducción de emisiones por la transición renovable"
          ]
        },
        {
          id: 4,
          title: "Programa de reciclaje empresarial",
          description: "Implementar separación de residuos y compostaje",
          impact: "Bajo",
          icon: Recycle,
          steps: [
            "1. Establecer estaciones de reciclaje claramente etiquetadas en las instalaciones",
            "2. Contratar servicios especializados de gestión de residuos para una eliminación adecuada",
            "3. Implementar iniciativa sin papel para reducir el consumo de papel",
            "4. Capacitar al personal en procedimientos adecuados de separación de residuos",
            "5. Realizar seguimiento de métricas de residuos y establecer objetivos de reducción"
          ]
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

  // Toggle expanded state for a recommendation
  const toggleExpand = (id: number) => {
    if (expandedRec === id) {
      setExpandedRec(null);
    } else {
      setExpandedRec(id);
    }
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
          <div key={rec.id} className="flex flex-col rounded-lg border p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 eco-icon">
                <rec.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{rec.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactStyle(rec.impact)}`}>
                    {getImpactText(rec.impact)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleExpand(rec.id)} 
                  className="mt-2 flex items-center gap-1 px-0 text-sm"
                >
                  {language === 'en' ? 'Step-by-step guide' : 'Guía paso a paso'}
                  {expandedRec === rec.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {expandedRec === rec.id && (
              <div className="mt-3 pl-7">
                <h5 className="text-sm font-medium mb-2">
                  {language === 'en' ? 'Implementation Steps:' : 'Pasos de implementación:'}
                </h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {rec.steps.map((step, index) => (
                    <li key={index} className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold">{index + 1}.</span> 
                      <span>{step.substring(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
