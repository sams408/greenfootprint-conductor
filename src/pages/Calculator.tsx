
import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { CalculatorProvider } from "@/contexts/CalculatorContext";
import { CalculatorDataInput } from "@/components/calculator/CalculatorDataInput";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";

const CarbonCalculator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calculadora de Huella de Carbono</h1>
            <p className="text-muted-foreground">
              Calcula y registra tu impacto ambiental según los estándares ISO 14064 y GHG Protocol
            </p>
          </div>
        </div>
        <Separator className="mb-6" />

        <CalculatorProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CalculatorDataInput />
            <CalculatorResults />
          </div>
        </CalculatorProvider>
      </div>
    </div>
  );
};

export default CarbonCalculator;
