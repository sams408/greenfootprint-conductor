
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useSupabaseAuth";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebarFooter() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const displayName = user?.user_metadata?.name || user?.email || t('user');
  
  return (
    <SidebarFooter className="border-t border-gray-200 p-4">
      {user && (
        <Link to="/profile" className="w-full block">
          <Button 
            variant="default" 
            className="w-full flex items-center gap-2 bg-teal-500 hover:bg-teal-600"
          >
            <User className="h-5 w-5" />
            <span>{displayName}</span>
          </Button>
        </Link>
      )}
    </SidebarFooter>
  );
}
