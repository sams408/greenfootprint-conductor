
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calculator, FilePlus, Leaf } from "lucide-react";

const CarbonCalculator = () => {
  const { toast } = useToast();
  const [selectedAlcance, setSelectedAlcance] = useState("alcance1");
  const [result, setResult] = useState<number | null>(null);
  const [calculationData, setCalculationData] = useState({
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

  const calculateEmissions = () => {
    // Factores de emisión simplificados (kg CO2e por unidad)
    const emissionFactors = {
      diesel: { liters: 2.68, kg: 3.21, m3: 2680 },
      gasoline: { liters: 2.31, kg: 2.8, m3: 2310 },
      natgas: { liters: 0, kg: 2.54, m3: 1.88 },
      lpg: { liters: 1.51, kg: 2.99, m3: 1510 },
      electricity: { kwh: 0.25, mwh: 250, gj: 69.4 },
      businessTravel: { km: 0.17, units: 0, euros: 0.05 },
      employeeCommuting: { km: 0.12, units: 0, euros: 0.04 },
      waste: { kg: 0.58, units: 0, euros: 0.02 },
      goods: { kg: 3.2, units: 15.5, euros: 0.08 },
    };

    let emissions = 0;
    const consumption = parseFloat(calculationData.consumption);
    
    if (isNaN(consumption)) {
      toast({
        title: "Error",
        description: "Por favor, introduce un consumo válido",
        variant: "destructive",
      });
      return;
    }
    
    // Cálculo de emisiones según alcance y tipo de combustible/energía/categoría
    if (selectedAlcance === "alcance1" && calculationData.fuelType && calculationData.unit) {
      const fuelType = calculationData.fuelType as keyof typeof emissionFactors;
      const unit = calculationData.unit as keyof (typeof emissionFactors)[keyof typeof emissionFactors];
      
      if (emissionFactors[fuelType]?.[unit]) {
        emissions = consumption * emissionFactors[fuelType][unit];
      }
    } else if (selectedAlcance === "alcance2" && calculationData.fuelType && calculationData.unit) {
      const unit = calculationData.unit as keyof typeof emissionFactors.electricity;
      
      if (emissionFactors.electricity[unit]) {
        emissions = consumption * emissionFactors.electricity[unit];
      }
    } else if (selectedAlcance === "alcance3" && calculationData.source && calculationData.unit) {
      const sourceMap: Record<string, keyof typeof emissionFactors> = {
        "business-travel": "businessTravel",
        "employee-commuting": "employeeCommuting",
        "waste": "waste",
        "purchased-goods": "goods"
      };
      
      const source = sourceMap[calculationData.source];
      const unit = calculationData.unit as keyof (typeof emissionFactors)[keyof typeof emissionFactors];
      
      if (source && emissionFactors[source]?.[unit]) {
        emissions = consumption * emissionFactors[source][unit];
      }
    }

    if (emissions > 0) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEmissions();
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="eco-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-eco-primary" />
                <CardTitle>Datos de Consumo</CardTitle>
              </div>
              <CardDescription>
                Introduce los datos para calcular tu huella de carbono
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="alcance1" onValueChange={setSelectedAlcance}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="alcance1">Alcance 1</TabsTrigger>
                  <TabsTrigger value="alcance2">Alcance 2</TabsTrigger>
                  <TabsTrigger value="alcance3">Alcance 3</TabsTrigger>
                </TabsList>
                
                <TabsContent value="alcance1">
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
                </TabsContent>
                
                <TabsContent value="alcance2">
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
                </TabsContent>
                
                <TabsContent value="alcance3">
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
                        <Label htmlFor="consumption">Descripción</Label>
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
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="eco-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-eco-primary" />
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
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
