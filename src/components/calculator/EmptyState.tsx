
import { Calculator } from "lucide-react";
import { ResultsActions } from "./ResultsActions";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">Sin resultados aún</h3>
      <p className="text-sm text-muted-foreground mt-2">
        Completa el formulario y haz clic en "Calcular Huella de Carbono" para ver los resultados
      </p>
      
      <div className="mt-6">
        <ResultsActions showSaveButton={false} />
      </div>
    </div>
  );
};
