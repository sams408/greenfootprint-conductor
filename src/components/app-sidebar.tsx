
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Leaf,
  BarChart3,
  Calculator,
  Database,
  UserCircle,
  FileText,
  Settings,
  Globe,
  Package,
  BarChart2,
  Search,
  ClipboardList,
  PieChart,
  Users,
  Award,
  Target,
  Lightbulb,
  BarChart,
  Handshake,
  FileCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useSupabaseAuth";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

type SidebarCategory = {
  label: string;
  items: SidebarItem[];
};

type SidebarItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: SidebarSubItem[];
  expanded?: boolean;
};

type SidebarSubItem = {
  label: string;
  path: string;
  icon?: React.ElementType;
};

export function AppSidebar() {
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [categories, setCategories] = useState<SidebarCategory[]>([
    {
      label: "MEDICIÓN",
      items: [
        {
          label: "Inicio",
          icon: Leaf,
          path: "/",
          expanded: false,
        },
        {
          label: "Mis tareas",
          icon: ClipboardList,
          path: "/tasks",
          expanded: false,
        },
        {
          label: t('dashboard'),
          icon: BarChart3,
          path: "/dashboard",
          expanded: false,
        },
        {
          label: "Recolección de datos",
          icon: Database,
          path: "/data-collection",
          expanded: true,
          children: [
            {
              label: t('emissions'),
              path: "/emissions",
              icon: Globe,
            },
            {
              label: t('calculator'),
              path: "/calculator",
              icon: Calculator,
            },
            {
              label: t('inventory'),
              path: "/inventory",
              icon: Package,
            }
          ]
        }
      ]
    },
    {
      label: "PLAN DE ACCIÓN",
      items: [
        {
          label: "Reducción",
          icon: Target,
          path: "/reduction",
          expanded: true,
          children: [
            {
              label: "Escenarios",
              path: "/scenarios",
              icon: PieChart,
            },
            {
              label: "Iniciativas",
              path: "/initiatives",
              icon: Lightbulb,
            },
            {
              label: "Proyección",
              path: "/projection",
              icon: BarChart,
            },
            {
              label: "Partners",
              path: "/partners",
              icon: Handshake,
            }
          ]
        },
        {
          label: "Certificaciones",
          icon: Award,
          path: "/certifications",
          expanded: false,
        },
        {
          label: "Subvenciones",
          icon: FileCheck,
          path: "/subsidies",
          expanded: false,
        }
      ]
    },
    {
      label: "COMUNICACIÓN",
      items: [
        {
          label: "Informes",
          icon: FileText,
          path: "/reports",
          expanded: false,
        },
        {
          label: "Perfil público",
          icon: UserCircle,
          path: "/public-profile",
          expanded: false,
        },
        {
          label: "Concientización",
          icon: Globe,
          path: "/awareness",
          expanded: false,
        }
      ]
    },
    {
      label: "CONFIGURACIÓN",
      items: [
        {
          label: t('users'),
          icon: Users,
          path: "/users",
          expanded: false,
        },
        {
          label: t('statistics'),
          icon: BarChart2,
          path: "/statistics",
          expanded: false,
        },
        {
          label: "Ajustes",
          icon: Settings,
          path: "/settings",
          expanded: false,
        }
      ]
    }
  ]);

  const toggleExpand = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items[itemIndex].expanded = !newCategories[categoryIndex].items[itemIndex].expanded;
    setCategories(newCategories);
  };
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar variant="inset" className="bg-eco-light border-r border-slate-200">
      <SidebarHeader className="pb-0">
        <div className="flex items-center gap-2 px-2 pb-2">
          <Leaf className="h-6 w-6 text-eco-primary" />
          <span className="text-xl font-bold text-eco-primary">GreenFlow</span>
        </div>
        <div className="px-2 pb-4">
          <div className="bg-white rounded-md p-2 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="h-4 w-4 text-eco-primary" />
              <span className="font-medium text-sm">Foods Harvest Bounty</span>
              <ChevronDown className="h-4 w-4 ml-auto text-gray-500" />
            </div>
            <div className="text-xs text-gray-500 pl-6">2024</div>
          </div>
        </div>
        <div className="px-2 pb-4 relative">
          <Search className="h-4 w-4 absolute left-5 top-3 text-gray-400" />
          <Input placeholder="Ir a..." className="pl-8 h-9 text-sm" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0">
        {categories.map((category, catIndex) => (
          <SidebarGroup key={category.label} className="py-1">
            <SidebarGroupLabel className="px-4 py-1 text-xs font-semibold text-gray-500">
              {category.label}
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1">
              <SidebarMenu>
                {category.items.map((item, itemIndex) => (
                  <div key={item.label}>
                    <SidebarMenuItem>
                      {item.children ? (
                        <div 
                          className={cn(
                            "flex w-full items-center gap-2 px-4 py-2 text-sm outline-none transition-colors",
                            isActiveRoute(item.path) ? "text-eco-primary font-medium" : "text-gray-700 hover:text-eco-primary"
                          )}
                          onClick={() => toggleExpand(catIndex, itemIndex)}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          <span className="flex-grow">{item.label}</span>
                          {item.expanded ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </div>
                      ) : (
                        <SidebarMenuButton asChild tooltip={item.label}>
                          <Link 
                            to={item.path}
                            className={cn(
                              isActiveRoute(item.path) ? "text-eco-primary font-medium" : "text-gray-700"
                            )}
                          >
                            <item.icon className="h-4 w-4 mr-2" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                    
                    {item.children && item.expanded && (
                      <div className="ml-6 pl-2 border-l border-slate-200">
                        {item.children.map((subItem) => (
                          <SidebarMenuItem key={subItem.label}>
                            <SidebarMenuButton asChild tooltip={subItem.label}>
                              <Link 
                                to={subItem.path}
                                className={cn(
                                  "py-1.5",
                                  isActiveRoute(subItem.path) ? "text-eco-primary font-medium" : "text-gray-700"
                                )}
                              >
                                {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                                <span>{subItem.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-2 text-sm">
          {user && (
            <>
              <UserCircle className="h-6 w-6 text-eco-primary" />
              <div className="flex flex-col">
                <span className="font-medium">{user.user_metadata.name || user.email}</span>
                <Link to="/profile" className="text-xs text-eco-primary hover:underline">
                  Ver perfil
                </Link>
              </div>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
