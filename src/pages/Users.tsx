
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, Plus, Search, Trash, UserPlus, Users } from "lucide-react";

// Tipos para los usuarios
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  department: string;
  createdAt: string;
}

// Datos de ejemplo
const mockUsers: User[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    email: "carlos@empresa.com",
    role: "admin",
    status: "active",
    department: "Sostenibilidad",
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    name: "María Gómez",
    email: "maria@empresa.com",
    role: "editor",
    status: "active",
    department: "Operaciones",
    createdAt: "2023-06-22",
  },
  {
    id: "3",
    name: "Juan López",
    email: "juan@empresa.com",
    role: "viewer",
    status: "inactive",
    department: "Finanzas",
    createdAt: "2023-04-10",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@empresa.com",
    role: "editor",
    status: "active",
    department: "Marketing",
    createdAt: "2023-07-03",
  },
];

const UsersPage = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer",
    department: "",
  });

  // Filtrar usuarios según término de búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    // Validaciones básicas
    if (!newUser.name || !newUser.email || !newUser.department) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    // Crear nuevo usuario
    const newUserObj: User = {
      id: `${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUserObj]);
    
    // Resetear formulario
    setNewUser({
      name: "",
      email: "",
      role: "viewer",
      department: "",
    });
    setShowAddUserForm(false);

    toast({
      title: "Usuario añadido",
      description: `${newUser.name} ha sido añadido correctamente`,
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado correctamente",
    });
  };

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user
      )
    );
    
    const targetUser = users.find(user => user.id === id);
    const newStatus = targetUser?.status === "active" ? "inactivo" : "activo";
    
    toast({
      title: "Estado actualizado",
      description: `El usuario ahora está ${newStatus}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">
              Administra los usuarios y sus permisos en la plataforma
            </p>
          </div>
        </div>
        <Separator className="mb-6" />

        <div className="space-y-6">
          {/* Controles */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuario..."
                className="pl-8 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setShowAddUserForm(!showAddUserForm)}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Añadir Usuario
            </Button>
          </div>

          {/* Formulario para añadir usuario */}
          <Collapsible open={showAddUserForm} onOpenChange={setShowAddUserForm}>
            <CollapsibleContent>
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-eco-primary" />
                    <CardTitle>Añadir Nuevo Usuario</CardTitle>
                  </div>
                  <CardDescription>
                    Introduce la información del nuevo usuario
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input
                          id="name"
                          placeholder="Nombre y apellido"
                          value={newUser.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="correo@empresa.com"
                          value={newUser.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select
                          value={newUser.role}
                          onValueChange={(value) => handleSelectChange("role", value)}
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Seleccionar rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Visualizador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Input
                          id="department"
                          placeholder="Departamento"
                          value={newUser.department}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" onClick={() => setShowAddUserForm(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddUser}>
                        <Plus className="mr-2 h-4 w-4" /> Crear Usuario
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* Lista de usuarios */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-eco-primary" />
                <CardTitle>Usuarios ({filteredUsers.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {filteredUsers.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <div className="grid grid-cols-12 gap-3 bg-muted px-4 py-3 font-medium text-sm">
                    <div className="col-span-3">Nombre</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Rol</div>
                    <div className="col-span-2">Departamento</div>
                    <div className="col-span-1">Estado</div>
                    <div className="col-span-1 text-center">Acciones</div>
                  </div>
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="grid grid-cols-12 gap-3 px-4 py-3 items-center border-t text-sm"
                    >
                      <div className="col-span-3 font-medium">{user.name}</div>
                      <div className="col-span-3 text-muted-foreground">{user.email}</div>
                      <div className="col-span-2">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs
                          ${user.role === "admin" ? "bg-blue-100 text-blue-800" :
                            user.role === "editor" ? "bg-green-100 text-green-800" :
                              "bg-gray-100 text-gray-800"}`}
                        >
                          {user.role === "admin" ? "Administrador" :
                           user.role === "editor" ? "Editor" : "Visualizador"}
                        </span>
                      </div>
                      <div className="col-span-2">{user.department}</div>
                      <div className="col-span-1">
                        <div className="flex items-center">
                          <Checkbox
                            id={`status-${user.id}`}
                            checked={user.status === "active"}
                            onCheckedChange={() => toggleUserStatus(user.id)}
                          />
                          <label
                            htmlFor={`status-${user.id}`}
                            className="text-xs ml-2 text-muted-foreground cursor-pointer"
                          >
                            {user.status === "active" ? "Activo" : "Inactivo"}
                          </label>
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <span className="sr-only">Eliminar</span>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No se encontraron usuarios con esos criterios
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
