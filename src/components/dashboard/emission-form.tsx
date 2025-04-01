
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export function EmissionForm() {
  const { toast } = useToast();
  const [selectedScope, setSelectedScope] = useState("scope1");
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Datos guardados",
      description: "Los datos de emisión han sido registrados correctamente.",
    });
  };

  return (
    <Card className="eco-card">
      <CardHeader>
        <CardTitle>Registro de Emisiones</CardTitle>
        <CardDescription>
          Introduce los datos de consumo para calcular tu huella de carbono
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scope1" onValueChange={setSelectedScope}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scope1">Alcance 1</TabsTrigger>
            <TabsTrigger value="scope2">Alcance 2</TabsTrigger>
            <TabsTrigger value="scope3">Alcance 3</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scope1">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fuelType">Tipo de Combustible</Label>
                  <Select required>
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
                    <Input id="consumption" type="number" min="0" step="0.01" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unidad</Label>
                    <Select required>
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
                  <Select required>
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
                  <Input id="period" type="month" required />
                </div>
              </div>
              
              <Button type="submit" className="mt-4 w-full">Registrar Emisiones</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="scope2">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="energyType">Tipo de Energía</Label>
                  <Select required>
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
                    <Label htmlFor="consumption2">Consumo</Label>
                    <Input id="consumption2" type="number" min="0" step="0.01" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit2">Unidad</Label>
                    <Select required>
                      <SelectTrigger id="unit2">
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
                  <Label htmlFor="location">Ubicación</Label>
                  <Input id="location" placeholder="Oficina central, planta, etc." required />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="period2">Período</Label>
                  <Input id="period2" type="month" required />
                </div>
              </div>
              
              <Button type="submit" className="mt-4 w-full">Registrar Emisiones</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="scope3">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select required>
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
                  <Input id="description" placeholder="Descripción breve" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Cantidad</Label>
                    <Input id="amount" type="number" min="0" step="0.01" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit3">Unidad</Label>
                    <Select required>
                      <SelectTrigger id="unit3">
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
                  <Label htmlFor="period3">Período</Label>
                  <Input id="period3" type="month" required />
                </div>
              </div>
              
              <Button type="submit" className="mt-4 w-full">Registrar Emisiones</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Los factores de emisión se aplican según el Greenhouse Gas Protocol y la ISO 14064.
        </p>
      </CardFooter>
    </Card>
  );
}
