
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmissionForm } from "@/components/dashboard/emission-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { FileDown, FileUp, Plus, Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Datos de ejemplo para emisiones
const emissionsData = [
  {
    id: 1,
    date: "2023-06-15",
    scope: "1",
    category: "Combustible Edificios",
    description: "Gas Natural Oficina Central",
    value: 12.5,
    unit: "Ton CO2eq",
  },
  {
    id: 2,
    date: "2023-06-10",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Oficina Central",
    value: 28.3,
    unit: "Ton CO2eq",
  },
  {
    id: 3,
    date: "2023-06-05",
    scope: "1",
    category: "Flota Empresarial",
    description: "Diésel Flota Comercial",
    value: 15.8,
    unit: "Ton CO2eq",
  },
  {
    id: 4,
    date: "2023-05-28",
    scope: "3",
    category: "Viajes de Trabajo",
    description: "Vuelos Internacionales",
    value: 34.2,
    unit: "Ton CO2eq",
  },
  {
    id: 5,
    date: "2023-05-20",
    scope: "3",
    category: "Servicios Subcontratados",
    description: "Gestión de Residuos",
    value: 8.7,
    unit: "Ton CO2eq",
  },
  {
    id: 6,
    date: "2023-05-15",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Centro Logístico",
    value: 19.5,
    unit: "Ton CO2eq",
  },
];

const Emissions = () => {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Emisiones</h1>
            <p className="text-muted-foreground">
              Registro y gestión de emisiones de gases de efecto invernadero
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowForm(!showForm)}
            >
              <Plus className="h-4 w-4" />
              Nuevo Registro
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <FileDown className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <FileUp className="h-4 w-4" />
              Importar
            </Button>
          </div>
        </div>
        <Separator className="mb-6" />

        {showForm && (
          <div className="mb-6">
            <EmissionForm />
          </div>
        )}

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por categoría, descripción..."
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Alcance</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los alcances</SelectItem>
                  <SelectItem value="1">Alcance 1</SelectItem>
                  <SelectItem value="2">Alcance 2</SelectItem>
                  <SelectItem value="3">Alcance 3</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Categoría</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="fuel">Combustibles</SelectItem>
                  <SelectItem value="electricity">Electricidad</SelectItem>
                  <SelectItem value="travel">Viajes</SelectItem>
                  <SelectItem value="waste">Residuos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border eco-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Alcance</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emissionsData.map((emission) => (
                  <TableRow key={emission.id}>
                    <TableCell>{new Date(emission.date).toLocaleDateString()}</TableCell>
                    <TableCell>{emission.scope}</TableCell>
                    <TableCell>{emission.category}</TableCell>
                    <TableCell>{emission.description}</TableCell>
                    <TableCell className="text-right">
                      {emission.value} {emission.unit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">
              Mostrando 6 de 124 registros
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emissions;
