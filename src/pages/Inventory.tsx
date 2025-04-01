
import { Navbar } from "@/components/navbar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

// Datos de ejemplo para el inventario
const inventoryData = [
  { id: 1, type: 'Paneles Solares', quantity: 24, lastUpdate: '2023-12-10', status: 'Activo' },
  { id: 2, type: 'Sensores de CO2', quantity: 38, lastUpdate: '2023-11-28', status: 'Activo' },
  { id: 3, type: 'Filtros de aire', quantity: 15, lastUpdate: '2023-12-15', status: 'Mantenimiento' },
  { id: 4, type: 'Bombillas LED', quantity: 120, lastUpdate: '2023-12-05', status: 'Activo' },
  { id: 5, type: 'Termostatos inteligentes', quantity: 12, lastUpdate: '2023-11-20', status: 'Inactivo' },
];

const Inventory = () => {
  const { t } = useLanguage();
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Activo':
      case 'Active':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'Mantenimiento':
      case 'Maintenance':
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case 'Inactivo':
      case 'Inactive':
        return <Badge className="bg-red-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('inventory')}</h1>
            <p className="text-muted-foreground">
              {t('inventoryItems')}
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            {t('addItem')}
          </Button>
        </div>
        <Separator className="mb-6" />

        <Card>
          <CardHeader>
            <CardTitle>{t('inventoryItems')}</CardTitle>
            <CardDescription>
              {t('lastUpdate')}: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">{t('equipmentType')}</TableHead>
                  <TableHead className="w-[100px] text-center">{t('quantity')}</TableHead>
                  <TableHead className="w-[150px]">{t('lastUpdate')}</TableHead>
                  <TableHead className="w-[100px]">{t('status')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell>{item.lastUpdate}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
