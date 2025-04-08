
import { Calculator } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CalculatorTabs } from "./CalculatorTabs";

export const CalculatorDataInput = () => {
  return (
    <Card className="eco-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-eco-primary" />
          <CardTitle>Datos de Consumo</CardTitle>
        </div>
        <CardDescription>
          Introduce los datos para calcular tu huella de carbono
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CalculatorTabs />
      </CardContent>
    </Card>
  );
};
