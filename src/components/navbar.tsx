
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown, Leaf, Globe, User, BarChart3, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { Skeleton } from '@/components/ui/skeleton';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.user_metadata?.name) return '?';
    return user.user_metadata.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { name: 'Emisiones', path: '/emissions', icon: <Globe className="h-4 w-4 mr-2" /> },
    { name: 'Calculadora', path: '/calculator', icon: <Calculator className="h-4 w-4 mr-2" /> },
    { name: 'Usuarios', path: '/users', icon: <User className="h-4 w-4 mr-2" /> },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-foreground">GreenFlow</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-200 text-green-800">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">
                    {user.user_metadata.name || 'Usuario'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/users')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleLogin} variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
              Iniciar sesión
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-background p-6 pb-32 shadow-md animate-in md:hidden",
          isOpen ? "slide-in-from-top-2" : "hidden"
        )}
      >
        <div className="grid gap-4">
          <nav className="grid grid-flow-row auto-rows-max text-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 gap-1" 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="mt-4 gap-1 bg-green-600 hover:bg-green-700" 
                onClick={() => {
                  handleLogin();
                  setIsOpen(false);
                }}
              >
                <User className="h-4 w-4" />
                <span>Iniciar sesión</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
