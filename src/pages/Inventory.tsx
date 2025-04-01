
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Datos de ejemplo para el inventario
const initialInventoryData = [
  { id: 1, type: 'Paneles Solares', quantity: 24, lastUpdate: '2023-12-10', status: 'Activo' },
  { id: 2, type: 'Sensores de CO2', quantity: 38, lastUpdate: '2023-11-28', status: 'Activo' },
  { id: 3, type: 'Filtros de aire', quantity: 15, lastUpdate: '2023-12-15', status: 'Mantenimiento' },
  { id: 4, type: 'Bombillas LED', quantity: 120, lastUpdate: '2023-12-05', status: 'Activo' },
  { id: 5, type: 'Termostatos inteligentes', quantity: 12, lastUpdate: '2023-11-20', status: 'Inactivo' },
];

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    type: '',
    quantity: 0,
    status: 'Activo'
  });
  
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value) : value
    });
  };

  const handleStatusChange = (value: string) => {
    setFormData({
      ...formData,
      status: value
    });
  };

  const handleAddItem = () => {
    const newItem = {
      id: inventoryData.length + 1,
      type: formData.type,
      quantity: formData.quantity,
      lastUpdate: new Date().toISOString().split('T')[0],
      status: formData.status
    };
    
    setInventoryData([...inventoryData, newItem]);
    setFormData({ type: '', quantity: 0, status: 'Activo' });
    setOpenDialog(false);
    
    toast({
      title: t('addItem'),
      description: `${t('equipmentType')}: ${newItem.type} ${t('quantity')}: ${newItem.quantity}`,
    });
  };

  const handleEditItem = () => {
    if (!currentItem) return;
    
    const updatedInventory = inventoryData.map(item => {
      if (item.id === currentItem.id) {
        return {
          ...item,
          type: formData.type,
          quantity: formData.quantity,
          lastUpdate: new Date().toISOString().split('T')[0],
          status: formData.status
        };
      }
      return item;
    });
    
    setInventoryData(updatedInventory);
    setEditDialogOpen(false);
    setCurrentItem(null);
    
    toast({
      title: t('edit'),
      description: `${t('equipmentType')}: ${formData.type} ${t('updated')}`,
    });
  };

  const handleDeleteItem = () => {
    if (!currentItem) return;
    
    const updatedInventory = inventoryData.filter(item => item.id !== currentItem.id);
    setInventoryData(updatedInventory);
    setDeleteDialogOpen(false);
    setCurrentItem(null);
    
    toast({
      title: t('delete'),
      description: `${t('equipmentType')}: ${currentItem.type} ${t('deleted')}`,
    });
  };

  const openEditDialog = (item: any) => {
    setCurrentItem(item);
    setFormData({
      type: item.type,
      quantity: item.quantity,
      status: item.status
    });
    setEditDialogOpen(true);
  };

  const openViewDialog = (item: any) => {
    setCurrentItem(item);
    setViewDialogOpen(true);
  };

  const openDeleteDialog = (item: any) => {
    setCurrentItem(item);
    setDeleteDialogOpen(true);
  };

  const translateStatus = (status: string) => {
    if (language === 'es') {
      return status;
    } else {
      switch(status) {
        case 'Activo': return 'Active';
        case 'Mantenimiento': return 'Maintenance';
        case 'Inactivo': return 'Inactive';
        default: return status;
      }
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
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                {t('addItem')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('addItem')}</DialogTitle>
                <DialogDescription>
                  {t('completeFormToRegister')}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    {t('equipmentType')}
                  </Label>
                  <Input
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    {t('quantity')}
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    {t('status')}
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={t('status')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">{t('active')}</SelectItem>
                      <SelectItem value="Mantenimiento">{t('maintenance')}</SelectItem>
                      <SelectItem value="Inactivo">{t('inactive')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddItem} className="bg-green-600 hover:bg-green-700">{t('addItem')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                    <TableCell>{getStatusBadge(translateStatus(item.status))}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" onClick={() => openViewDialog(item)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => openDeleteDialog(item)}
                      >
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

      {/* View Item Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('view')}: {currentItem?.type}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="font-semibold">{t('equipmentType')}:</div>
              <div className="col-span-2">{currentItem?.type}</div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="font-semibold">{t('quantity')}:</div>
              <div className="col-span-2">{currentItem?.quantity}</div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="font-semibold">{t('lastUpdate')}:</div>
              <div className="col-span-2">{currentItem?.lastUpdate}</div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="font-semibold">{t('status')}:</div>
              <div className="col-span-2">{getStatusBadge(translateStatus(currentItem?.status))}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('edit')}: {currentItem?.type}</DialogTitle>
            <DialogDescription>
              {t('completeFormToRegister')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                {t('equipmentType')}
              </Label>
              <Input
                id="edit-type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-quantity" className="text-right">
                {t('quantity')}
              </Label>
              <Input
                id="edit-quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                {t('status')}
              </Label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t('status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">{t('active')}</SelectItem>
                  <SelectItem value="Mantenimiento">{t('maintenance')}</SelectItem>
                  <SelectItem value="Inactivo">{t('inactive')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditItem}>{t('edit')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteConfirmation')}
              <br />
              <br />
              <strong>{currentItem?.type}</strong> - {currentItem?.quantity} {t('quantity')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteItem}
              className="bg-red-600 hover:bg-red-700"
            >
              {t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Inventory;
