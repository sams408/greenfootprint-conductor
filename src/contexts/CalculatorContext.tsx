
import { createContext, useContext, useState, ReactNode } from "react";
import { CalculationData, calculateEmissions } from "@/utils/emissionCalculations";
import { useToast } from "@/hooks/use-toast";

interface CalculatorContextProps {
  selectedAlcance: string;
  setSelectedAlcance: (alcance: string) => void;
  result: number | null;
  setResult: (result: number | null) => void;
  calculationData: CalculationData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  calculateAndSetResult: () => void;
  handleSave: () => void;
}

const CalculatorContext = createContext<CalculatorContextProps | undefined>(undefined);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [selectedAlcance, setSelectedAlcance] = useState("alcance1");
  const [result, setResult] = useState<number | null>(null);
  const [calculationData, setCalculationData] = useState<CalculationData>({
    fuelType: "",
    consumption: "",
    unit: "",
    source: "",
    period: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCalculationData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCalculationData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateAndSetResult = () => {
    const emissions = calculateEmissions(selectedAlcance, calculationData);
    
    if (emissions !== null) {
      setResult(emissions);
      toast({
        title: "Cálculo completado",
        description: `Tu huella de carbono es de ${emissions.toFixed(2)} kg CO2e`,
      });
    } else {
      toast({
        title: "Error en el cálculo",
        description: "No se pudo calcular la huella de carbono con los datos proporcionados",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    if (result) {
      toast({
        title: "Datos guardados",
        description: "Los resultados del cálculo han sido guardados correctamente.",
      });
      // Aquí iría la lógica para guardar en la base de datos
    } else {
      toast({
        title: "Error",
        description: "Debes realizar un cálculo antes de guardar",
        variant: "destructive",
      });
    }
  };

  return (
    <CalculatorContext.Provider
      value={{
        selectedAlcance,
        setSelectedAlcance,
        result,
        setResult,
        calculationData,
        handleInputChange,
        handleSelectChange,
        calculateAndSetResult,
        handleSave,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
};
