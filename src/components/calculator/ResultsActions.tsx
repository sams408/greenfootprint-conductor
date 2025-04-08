
import { FilePlus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCalculator } from "@/contexts/CalculatorContext";

interface ResultsActionsProps {
  showSaveButton?: boolean;
}

export const ResultsActions = ({ showSaveButton = true }: ResultsActionsProps) => {
  const { handleSave } = useCalculator();
  
  return (
    <div className="space-y-3">
      {showSaveButton && (
        <Button 
          onClick={handleSave} 
          className="w-full flex items-center gap-2"
          variant="outline"
        >
          <FilePlus className="h-4 w-4" />
          Guardar Resultado
        </Button>
      )}
      
      <Link to="/dashboard?tab=detail" className="block w-full">
        <Button 
          className="w-full flex items-center gap-2"
          variant={showSaveButton ? "secondary" : "outline"}
        >
          <Lightbulb className="h-4 w-4" />
          Ver Recomendaciones Personalizadas
        </Button>
      </Link>
    </div>
  );
};
