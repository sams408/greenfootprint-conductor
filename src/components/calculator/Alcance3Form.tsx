
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculator } from "@/contexts/CalculatorContext";

export const Alcance3Form = () => {
  const { calculationData, handleInputChange, handleSelectChange, calculateAndSetResult } = useCalculator();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateAndSetResult();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="category">Categoría</Label>
          <Select 
            value={calculationData.source}
            onValueChange={(value) => handleSelectChange("source", value)}
            required
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business-travel">Viajes de Negocio</SelectItem>
              <SelectItem value="employee-commuting">Desplazamiento Empleados</SelectItem>
              <SelectItem value="waste">Generación de Residuos</SelectItem>
              <SelectItem value="purchased-goods">Bienes y Servicios</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Descripción</Label>
          <Input 
            id="consumption" 
            placeholder="Descripción breve" 
            required
            value={calculationData.consumption}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="consumption">Cantidad</Label>
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
                <SelectItem value="km">Kilómetros</SelectItem>
                <SelectItem value="kg">Kilogramos</SelectItem>
                <SelectItem value="units">Unidades</SelectItem>
                <SelectItem value="euros">Euros</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
