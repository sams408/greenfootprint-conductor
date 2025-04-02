
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Leaf, User, Languages } from 'lucide-react';
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
import { useLanguage } from '@/hooks/useLanguage';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
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

  const displayName = user?.user_metadata?.name || user?.email || t('user');

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
        
        {/* Removed the navigation menu */}

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="mr-2"
              >
                <Languages className="h-5 w-5" />
                <span className="sr-only">{t('chooseLanguage')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t('chooseLanguage')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={language === 'es' ? 'bg-accent' : ''}
                onClick={() => setLanguage('es')}
              >
                <span className="mr-2">🇪🇸</span>
                {t('spanish')}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={language === 'en' ? 'bg-accent' : ''}
                onClick={() => setLanguage('en')}
              >
                <span className="mr-2">🇬🇧</span>
                {t('english')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {loading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ) : user ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="h-9 w-9 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-green-200 text-green-800">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <Button onClick={handleLogin} variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
              {t('signIn')}
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
      
      {/* Mobile menu - simplified with no navigation items */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-background p-6 pb-32 shadow-md animate-in md:hidden",
          isOpen ? "slide-in-from-top-2" : "hidden"
        )}
      >
        <div className="grid gap-4">
          <nav className="grid grid-flow-row auto-rows-max text-lg">
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
                <span>{t('signOut')}</span>
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
                <span>{t('signIn')}</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
