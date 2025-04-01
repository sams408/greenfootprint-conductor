
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/hooks/useSupabaseAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Building, Globe2, MapPin, Phone, Briefcase } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  name: string;
  email: string;
  company?: string;
  location?: string;
  industry?: string;
  phoneNumber?: string;
  position?: string;
}

const Profile = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    company: "",
    location: "",
    industry: "",
    phoneNumber: "",
    position: "",
  });

  const [originalProfile, setOriginalProfile] = useState<UserProfile>({
    name: "",
    email: "",
    company: "",
    location: "",
    industry: "",
    phoneNumber: "",
    position: "",
  });

  useEffect(() => {
    if (user) {
      // Load initial data from user metadata
      const initialProfile = {
        name: user.user_metadata.name || "",
        email: user.email || "",
        company: user.user_metadata.company || "",
        location: user.user_metadata.location || "",
        industry: user.user_metadata.industry || "",
        phoneNumber: user.user_metadata.phoneNumber || "",
        position: user.user_metadata.position || "",
      };
      setProfile(initialProfile);
      setOriginalProfile(initialProfile);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Update user metadata in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        data: {
          name: profile.name,
          company: profile.company,
          location: profile.location,
          industry: profile.industry,
          phoneNumber: profile.phoneNumber,
          position: profile.position,
        }
      });

      if (error) {
        throw error;
      }

      setOriginalProfile({ ...profile });
      
      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido guardados correctamente.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: error.message || "No se pudo actualizar el perfil. Inténtalo más tarde.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile({ ...originalProfile });
  };

  // Check if form is dirty (has changes)
  const hasChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);

  const getUserInitials = () => {
    if (!profile.name) return "?";
    return profile.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container py-10 flex-1">
          <div className="flex flex-col items-center justify-center">
            <Skeleton className="h-12 w-1/3 mb-10" />
            <Skeleton className="h-64 w-full max-w-2xl rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container py-10 flex-1">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Acceso denegado</h1>
            <p className="text-muted-foreground mb-6">
              Por favor inicia sesión para ver esta página.
            </p>
            <Button onClick={() => window.location.href = "/auth"}>
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
            <p className="text-muted-foreground">
              Visualiza y actualiza tu información personal
            </p>
          </div>
        </div>
        <Separator className="mb-6" />

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Información Personal</TabsTrigger>
            <TabsTrigger value="company">Información de Empresa</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-eco-primary text-white text-xl">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{profile.name || "Usuario"}</CardTitle>
                    <CardDescription>{profile.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      value={profile.email}
                      disabled
                      placeholder="tu@ejemplo.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      El correo electrónico no se puede cambiar
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Teléfono
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={profile.phoneNumber || ""}
                      onChange={handleInputChange}
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Ubicación
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={profile.location || ""}
                      onChange={handleInputChange}
                      placeholder="Tu ciudad o país"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={!hasChanges || isSaving}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={!hasChanges || isSaving}
                    className="bg-eco-primary hover:bg-eco-primary/90"
                  >
                    {isSaving ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="company">
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Información de empresa</CardTitle>
                <CardDescription>
                  Información relacionada con tu empresa u organización
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      Nombre de la empresa
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={profile.company || ""}
                      onChange={handleInputChange}
                      placeholder="Nombre de tu empresa u organización"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      Cargo
                    </Label>
                    <Input
                      id="position"
                      name="position"
                      value={profile.position || ""}
                      onChange={handleInputChange}
                      placeholder="Tu cargo o puesto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="flex items-center gap-2">
                      <Globe2 className="h-4 w-4 text-muted-foreground" />
                      Industria
                    </Label>
                    <Input
                      id="industry"
                      name="industry"
                      value={profile.industry || ""}
                      onChange={handleInputChange}
                      placeholder="Sector o industria"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={!hasChanges || isSaving}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={!hasChanges || isSaving}
                    className="bg-eco-primary hover:bg-eco-primary/90"
                  >
                    {isSaving ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Configuración de cuenta</CardTitle>
                <CardDescription>
                  Gestiona la configuración de tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Cambiar contraseña</h4>
                      <p className="text-sm text-muted-foreground">
                        Actualiza tu contraseña para mayor seguridad
                      </p>
                    </div>
                    <Button variant="outline">Cambiar</Button>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Notificaciones</h4>
                      <p className="text-sm text-muted-foreground">
                        Gestiona tus preferencias de notificaciones
                      </p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
