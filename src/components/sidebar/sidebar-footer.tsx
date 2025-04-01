
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useSupabaseAuth";
import { SidebarFooter } from "@/components/ui/sidebar";

export function AppSidebarFooter() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  return (
    <SidebarFooter className="border-t border-gray-200 p-4">
      <div className="flex items-center gap-2 text-sm">
        {user && (
          <>
            <UserCircle className="h-6 w-6 text-gray-600" />
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">{user.user_metadata.name || user.email}</span>
              <Link to="/profile" className="text-xs text-gray-500 hover:text-gray-800 hover:underline">
                {t('viewProfile')}
              </Link>
            </div>
          </>
        )}
      </div>
    </SidebarFooter>
  );
}
