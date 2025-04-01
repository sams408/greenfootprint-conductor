
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Leaf, Recycle, Car, PlugZap } from 'lucide-react';

const recommendations = [
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

export function RecommendationsCard() {
  return (
    <Card className="eco-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-eco-primary" />
            Recomendaciones
          </CardTitle>
          <CardDescription>Mejoras sugeridas según tus emisiones</CardDescription>
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
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  rec.impact === "Alto" 
                    ? "bg-green-100 text-green-800" 
                    : rec.impact === "Medio"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                }`}>
                  Impacto {rec.impact}
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
