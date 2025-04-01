
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarSubItem as SidebarSubItemType } from "./sidebar-types";
import { useLanguage } from "@/hooks/useLanguage";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

interface SidebarSubItemProps {
  subItem: SidebarSubItemType;
  isActiveRoute: (path: string) => boolean;
}

export function SidebarSubItem({ subItem, isActiveRoute }: SidebarSubItemProps) {
  const { t } = useLanguage();
  
  return (
    <SidebarMenuItem key={subItem.labelKey}>
      <SidebarMenuButton asChild tooltip={t(subItem.labelKey)}>
        <Link 
          to={subItem.path}
          className={cn(
            "py-1.5 flex items-center gap-2",
            isActiveRoute(subItem.path) ? "text-gray-800 font-medium" : "text-gray-600 hover:text-gray-800"
          )}
        >
          {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
          <span>{t(subItem.labelKey)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
