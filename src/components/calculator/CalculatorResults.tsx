
import { FilePlus, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useCalculator } from "@/contexts/CalculatorContext";

export const CalculatorResults = () => {
  const { result, selectedAlcance, calculationData, handleSave } = useCalculator();

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
            <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg">
              <h3 className="text-xl font-medium mb-2">Emisiones Totales</h3>
              <div className="text-4xl font-bold text-eco-primary">{result.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">kg CO2 equivalente</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Detalles</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <div className="text-sm text-muted-foreground">Alcance</div>
                <div className="text-sm font-medium">
                  {selectedAlcance === "alcance1" ? "Alcance 1" : 
                  selectedAlcance === "alcance2" ? "Alcance 2" : "Alcance 3"}
                </div>
                
                <div className="text-sm text-muted-foreground">Fuente</div>
                <div className="text-sm font-medium">{calculationData.source || calculationData.fuelType}</div>
                
                <div className="text-sm text-muted-foreground">Consumo</div>
                <div className="text-sm font-medium">{`${calculationData.consumption} ${calculationData.unit}`}</div>
                
                <div className="text-sm text-muted-foreground">Período</div>
                <div className="text-sm font-medium">{calculationData.period}</div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleSave} 
                className="w-full flex items-center gap-2"
                variant="outline"
              >
                <FilePlus className="h-4 w-4" />
                Guardar Resultado
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Sin resultados aún</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Completa el formulario y haz clic en "Calcular Huella de Carbono" para ver los resultados
            </p>
          </div>
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
