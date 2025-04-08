
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculator } from "@/contexts/CalculatorContext";

export const Alcance2Form = () => {
  const { calculationData, handleInputChange, handleSelectChange, calculateAndSetResult } = useCalculator();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateAndSetResult();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="energyType">Tipo de Energía</Label>
          <Select
            value={calculationData.fuelType}
            onValueChange={(value) => handleSelectChange("fuelType", value)}
            required
          >
            <SelectTrigger id="energyType">
              <SelectValue placeholder="Seleccionar tipo de energía" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electricity">Electricidad</SelectItem>
              <SelectItem value="heat">Calor/Frío</SelectItem>
              <SelectItem value="steam">Vapor</SelectItem>
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
                <SelectItem value="kwh">kWh</SelectItem>
                <SelectItem value="mwh">MWh</SelectItem>
                <SelectItem value="gj">GJ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="source">Ubicación</Label>
          <Input 
            id="source" 
            placeholder="Oficina central, planta, etc." 
            required
            value={calculationData.source}
            onChange={handleInputChange}
          />
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
