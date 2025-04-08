
import { Calculator } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useCalculator } from "@/contexts/CalculatorContext";
import { ResultsSummary } from "./ResultsSummary";
import { ResultsActions } from "./ResultsActions";
import { EmptyState } from "./EmptyState";

export const CalculatorResults = () => {
  const { result } = useCalculator();

  return (
    <Card className="eco-card h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-eco-primary" />
          <CardTitle>Resultados de Huella de Carbono</CardTitle>
        </div>
        <CardDescription>
          Detalles del cálculo y emisiones de CO2e
        </CardDescription>
      </CardHeader>
      <CardContent>
        {result !== null ? (
          <div className="space-y-6">
            <ResultsSummary />
            <ResultsActions />
          </div>
        ) : (
          <EmptyState />
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Los cálculos se realizan utilizando factores de emisión actualizados según estándares ISO 14064 y GHG Protocol.
        </p>
      </CardFooter>
    </Card>
  );
};
