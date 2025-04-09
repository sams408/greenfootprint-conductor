
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Emissions from "./pages/Emissions";
import Calculator from "./pages/Calculator";
import Users from "./pages/Users";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Inventory from "./pages/Inventory";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./hooks/useSupabaseAuth";
import { LanguageProvider } from "./hooks/useLanguage";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

const queryClient = new QueryClient();

// Componente protegido que redirige a la autenticación si no hay sesión
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Cargando...</div>;
  }

  return user ? <>{element}</> : <Navigate to="/auth" />;
};

// Router con AuthProvider
const AppRouter = () => {
  const { user } = useAuth();

  return (
    <LanguageProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {user && <AppSidebar />}
          <SidebarInset>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/emissions" element={<ProtectedRoute element={<Emissions />} />} />
              <Route path="/calculator" element={<ProtectedRoute element={<Calculator />} />} />
              <Route path="/inventory" element={<ProtectedRoute element={<Inventory />} />} />
              <Route path="/statistics" element={<ProtectedRoute element={<Statistics />} />} />
              <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
              <Route path="/settings" element={<Navigate to="/dashboard" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </LanguageProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
