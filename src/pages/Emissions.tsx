import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmissionForm } from "@/components/dashboard/emission-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { FileDown, FileUp, Plus, Search, Filter, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { EmissionDetailDialog } from "@/components/dashboard/EmissionDetailDialog";

// Datos de ejemplo para emisiones
const initialEmissionsData = [
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
  {
    id: 7,
    date: "2023-05-10",
    scope: "1",
    category: "Combustible Edificios",
    description: "Gas Propano Cafetería",
    value: 5.2,
    unit: "Ton CO2eq",
  },
  {
    id: 8,
    date: "2023-05-05",
    scope: "3",
    category: "Transporte de Empleados",
    description: "Desplazamiento al Trabajo",
    value: 42.7,
    unit: "Ton CO2eq",
  },
  {
    id: 9,
    date: "2023-04-28",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Almacén",
    value: 16.9,
    unit: "Ton CO2eq",
  },
  {
    id: 10,
    date: "2023-04-20",
    scope: "1",
    category: "Flota Empresarial",
    description: "Gasolina Vehículos Comerciales",
    value: 22.3,
    unit: "Ton CO2eq",
  },
  {
    id: 11,
    date: "2023-04-15",
    scope: "3",
    category: "Servicios Subcontratados",
    description: "Tratamiento de Aguas Residuales",
    value: 7.4,
    unit: "Ton CO2eq",
  },
  {
    id: 12,
    date: "2023-04-10",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Servidores",
    value: 31.6,
    unit: "Ton CO2eq",
  },
  {
    id: 13,
    date: "2023-04-05",
    scope: "1",
    category: "Combustible Edificios",
    description: "Gas Natural Calefacción",
    value: 18.2,
    unit: "Ton CO2eq",
  },
  {
    id: 14,
    date: "2023-03-28",
    scope: "3",
    category: "Viajes de Trabajo",
    description: "Viajes en Tren",
    value: 5.8,
    unit: "Ton CO2eq",
  },
  {
    id: 15,
    date: "2023-03-20",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Aire Acondicionado",
    value: 24.1,
    unit: "Ton CO2eq",
  }
];

const Emissions = () => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scopeFilter, setScopeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedEmission, setSelectedEmission] = useState<any>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  
  // Filter and paginate emissions data
  const filteredEmissions = initialEmissionsData.filter(emission => {
    const matchesSearch = 
      emission.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
      emission.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesScope = scopeFilter === "all" || emission.scope === scopeFilter;
    
    const matchesCategory = 
      categoryFilter === "all" || 
      (categoryFilter === "fuel" && (emission.category.includes("Combustible") || emission.category.includes("Flota"))) ||
      (categoryFilter === "electricity" && emission.category.includes("Eléctrico")) ||
      (categoryFilter === "travel" && emission.category.includes("Viajes")) ||
      (categoryFilter === "waste" && (emission.category.includes("Residuos") || emission.category.includes("Subcontratados")));
    
    return matchesSearch && matchesScope && matchesCategory;
  });
  
  const totalPages = Math.ceil(filteredEmissions.length / itemsPerPage);
  const currentEmissions = filteredEmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleOpenDetail = (emission: any) => {
    setSelectedEmission(emission);
    setDetailDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('emissions')}</h1>
            <p className="text-muted-foreground">
              {t('distribution')}
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
              {showForm ? t('cancel') : `${t('addItem')}`}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <FileDown className="h-4 w-4" />
              {t('export')}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <FileUp className="h-4 w-4" />
              {t('import')}
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
                placeholder={t('search')}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            <div className="flex gap-2">
              <Select 
                value={scopeFilter} 
                onValueChange={(value) => {
                  setScopeFilter(value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>{t('scope')}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allScopes')}</SelectItem>
                  <SelectItem value="1">{t('scope1')}</SelectItem>
                  <SelectItem value="2">{t('scope2')}</SelectItem>
                  <SelectItem value="3">{t('scope3')}</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={categoryFilter} 
                onValueChange={(value) => {
                  setCategoryFilter(value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>{t('category')}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allCategories')}</SelectItem>
                  <SelectItem value="fuel">{t('fuels')}</SelectItem>
                  <SelectItem value="electricity">{t('electricity')}</SelectItem>
                  <SelectItem value="travel">{t('travel')}</SelectItem>
                  <SelectItem value="waste">{t('waste')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border eco-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>{t('scope')}</TableHead>
                  <TableHead>{t('category')}</TableHead>
                  <TableHead>{t('description')}</TableHead>
                  <TableHead className="text-right">{t('value')}</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEmissions.map((emission) => (
                  <TableRow key={emission.id}>
                    <TableCell>{new Date(emission.date).toLocaleDateString()}</TableCell>
                    <TableCell>{emission.scope}</TableCell>
                    <TableCell>{emission.category}</TableCell>
                    <TableCell>{emission.description}</TableCell>
                    <TableCell className="text-right">
                      {emission.value} {emission.unit}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleOpenDetail(emission)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {currentEmissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      {t('noResults')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">
              {t('showing')} {Math.min((currentPage - 1) * itemsPerPage + 1, filteredEmissions.length)} - {Math.min(currentPage * itemsPerPage, filteredEmissions.length)} {t('of')} {filteredEmissions.length} {t('records')}
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                {t('previous')}
              </Button>
              {[...Array(Math.min(3, totalPages))].map((_, i) => {
                let pageNumber = i + 1;
                if (totalPages > 3) {
                  if (currentPage > totalPages - 2) {
                    pageNumber = totalPages - 2 + i;
                  } else if (currentPage > 2) {
                    pageNumber = currentPage - 1 + i;
                  }
                }
                
                return (
                  <Button 
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                {t('next')}
              </Button>
            </div>
          </div>
        </div>

        {/* Emission Detail Dialog */}
        <EmissionDetailDialog
          isOpen={detailDialogOpen}
          onClose={() => setDetailDialogOpen(false)}
          emission={selectedEmission}
        />
      </div>
    </div>
  );
};

export default Emissions;
