
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculator } from "@/contexts/CalculatorContext";

export const Alcance1Form = () => {
  const { calculationData, handleInputChange, handleSelectChange, calculateAndSetResult } = useCalculator();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateAndSetResult();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fuelType">Tipo de Combustible</Label>
          <Select 
            value={calculationData.fuelType}
            onValueChange={(value) => handleSelectChange("fuelType", value)}
            required
          >
            <SelectTrigger id="fuelType">
              <SelectValue placeholder="Seleccionar combustible" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diesel">Diésel</SelectItem>
              <SelectItem value="gasoline">Gasolina</SelectItem>
              <SelectItem value="natgas">Gas Natural</SelectItem>
              <SelectItem value="lpg">GLP (Gas Licuado)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="consumption">Consumo</Label>
            <Input 
              id="consumption" 
              type="number" 
              min="0" 
              step="0.01" 
              required 
              value={calculationData.consumption}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="unit">Unidad</Label>
            <Select 
              value={calculationData.unit}
              onValueChange={(value) => handleSelectChange("unit", value)}
              required
            >
              <SelectTrigger id="unit">
                <SelectValue placeholder="Seleccionar unidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="liters">Litros</SelectItem>
                <SelectItem value="kg">Kilogramos</SelectItem>
                <SelectItem value="m3">Metros cúbicos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="source">Fuente</Label>
          <Select
            value={calculationData.source}
            onValueChange={(value) => handleSelectChange("source", value)}
            required
          >
            <SelectTrigger id="source">
              <SelectValue placeholder="Seleccionar fuente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buildings">Edificios</SelectItem>
              <SelectItem value="vehicles">Flota Vehicular</SelectItem>
              <SelectItem value="machinery">Maquinaria</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="period">Período</Label>
          <Input 
            id="period" 
            type="month" 
            required 
            value={calculationData.period}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <Button type="submit" className="mt-4 w-full">Calcular Huella de Carbono</Button>
    </form>
  );
};
