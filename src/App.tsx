
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
import { AuthProvider, useAuth } from "./hooks/useSupabaseAuth";
import { LanguageProvider } from "./hooks/useLanguage";

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
  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/emissions" element={<ProtectedRoute element={<Emissions />} />} />
          <Route path="/calculator" element={<ProtectedRoute element={<Calculator />} />} />
          <Route path="/inventory" element={<ProtectedRoute element={<Inventory />} />} />
          <Route path="/statistics" element={<ProtectedRoute element={<Statistics />} />} />
          <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </AuthProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
