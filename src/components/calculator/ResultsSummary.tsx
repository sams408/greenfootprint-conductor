
import { useCalculator } from "@/contexts/CalculatorContext";

export const ResultsSummary = () => {
  const { result, selectedAlcance, calculationData } = useCalculator();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg">
        <h3 className="text-xl font-medium mb-2">Emisiones Totales</h3>
        <div className="text-4xl font-bold text-eco-primary">{result?.toFixed(2)}</div>
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
    </div>
  );
};
