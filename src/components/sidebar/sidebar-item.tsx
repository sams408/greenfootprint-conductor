
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem as SidebarItemType } from "./sidebar-types";
import { useLanguage } from "@/hooks/useLanguage";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarSubItem } from "./sidebar-sub-item";

interface SidebarItemProps {
  item: SidebarItemType;
  isActiveRoute: (path: string) => boolean;
  toggleExpand: () => void;
  categoryIndex: number;
  itemIndex: number;
}

export function SidebarItemComponent({ 
  item, 
  isActiveRoute, 
  toggleExpand,
  categoryIndex,
  itemIndex
}: SidebarItemProps) {
  const { t } = useLanguage();
  
  return (
    <div key={item.labelKey}>
      <SidebarMenuItem>
        {item.children ? (
          <div 
            className={cn(
              "flex w-full items-center gap-2 px-4 py-2 text-sm outline-none transition-colors rounded-md",
              isActiveRoute(item.path) ? "text-gray-800 font-medium bg-gray-100 dark:bg-sidebar-accent dark:text-sidebar-accent-foreground" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-sidebar-foreground dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground"
            )}
            onClick={() => toggleExpand()}
          >
            <item.icon className="h-4 w-4 mr-2" />
            <span className="flex-grow">{t(item.labelKey)}</span>
            {item.expanded ? 
              <ChevronUp className="h-4 w-4 text-gray-400" /> : 
              <ChevronDown className="h-4 w-4 text-gray-400" />
            }
          </div>
        ) : (
          <SidebarMenuButton asChild tooltip={t(item.labelKey)}>
            <Link 
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm rounded-md",
                isActiveRoute(item.path) ? "text-gray-800 font-medium bg-gray-100 dark:bg-sidebar-accent dark:text-sidebar-accent-foreground" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-sidebar-foreground dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 mr-2" />
              <span>{t(item.labelKey)}</span>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
      
      {item.children && item.expanded && (
        <div className="ml-6 pl-2 border-l border-gray-200 dark:border-sidebar-border">
          {item.children.map((subItem) => (
            <SidebarSubItem 
              key={subItem.labelKey} 
              subItem={subItem} 
              isActiveRoute={isActiveRoute} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
