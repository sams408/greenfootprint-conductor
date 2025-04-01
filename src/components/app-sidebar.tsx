
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
  labelKey: string;
  items: SidebarItem[];
};

type SidebarItem = {
  labelKey: string;
  icon: React.ElementType;
  path: string;
  children?: SidebarSubItem[];
  expanded?: boolean;
};

type SidebarSubItem = {
  labelKey: string;
  path: string;
  icon?: React.ElementType;
};

export function AppSidebar() {
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [categories, setCategories] = useState<SidebarCategory[]>([
    {
      labelKey: "measurementTitle",
      items: [
        {
          labelKey: "home",
          icon: Leaf,
          path: "/",
          expanded: false,
        },
        {
          labelKey: "tasks",
          icon: ClipboardList,
          path: "/tasks",
          expanded: false,
        },
        {
          labelKey: "dashboard",
          icon: BarChart3,
          path: "/dashboard",
          expanded: false,
        },
        {
          labelKey: "dataCollection",
          icon: Database,
          path: "/data-collection",
          expanded: true,
          children: [
            {
              labelKey: "emissions",
              path: "/emissions",
              icon: Globe,
            },
            {
              labelKey: "calculator",
              path: "/calculator",
              icon: Calculator,
            },
            {
              labelKey: "inventory",
              path: "/inventory",
              icon: Package,
            }
          ]
        }
      ]
    },
    {
      labelKey: "actionPlanTitle",
      items: [
        {
          labelKey: "reduction",
          icon: Target,
          path: "/reduction",
          expanded: true,
          children: [
            {
              labelKey: "scenarios",
              path: "/scenarios",
              icon: PieChart,
            },
            {
              labelKey: "initiatives",
              path: "/initiatives",
              icon: Lightbulb,
            },
            {
              labelKey: "projection",
              path: "/projection",
              icon: BarChart,
            },
            {
              labelKey: "partners",
              path: "/partners",
              icon: Handshake,
            }
          ]
        },
        {
          labelKey: "certifications",
          icon: Award,
          path: "/certifications",
          expanded: false,
        },
        {
          labelKey: "subsidies",
          icon: FileCheck,
          path: "/subsidies",
          expanded: false,
        }
      ]
    },
    {
      labelKey: "communicationTitle",
      items: [
        {
          labelKey: "reports",
          icon: FileText,
          path: "/reports",
          expanded: false,
        },
        {
          labelKey: "publicProfile",
          icon: UserCircle,
          path: "/public-profile",
          expanded: false,
        },
        {
          labelKey: "awareness",
          icon: Globe,
          path: "/awareness",
          expanded: false,
        }
      ]
    },
    {
      labelKey: "configurationTitle",
      items: [
        {
          labelKey: "users",
          icon: Users,
          path: "/users",
          expanded: false,
        },
        {
          labelKey: "statistics",
          icon: BarChart2,
          path: "/statistics",
          expanded: false,
        },
        {
          labelKey: "settings",
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
    <Sidebar variant="inset" className="bg-white border-r border-gray-200 shadow-sm">
      <SidebarHeader className="pb-0">
        <div className="flex items-center gap-2 px-3 pb-3">
          <Leaf className="h-6 w-6 text-gray-700" />
          <span className="text-xl font-bold text-gray-800">GreenFlow</span>
        </div>
        <div className="px-2 pb-4">
          <div className="bg-gray-50 rounded-md p-2 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-sm text-gray-700">Foods Harvest Bounty</span>
              <ChevronDown className="h-4 w-4 ml-auto text-gray-500" />
            </div>
            <div className="text-xs text-gray-500 pl-6">2024</div>
          </div>
        </div>
        <div className="px-2 pb-4 relative">
          <Search className="h-4 w-4 absolute left-5 top-3 text-gray-400" />
          <Input placeholder={t('goTo')} className="pl-8 h-9 text-sm bg-gray-50 border-gray-200" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0">
        {categories.map((category, catIndex) => (
          <SidebarGroup key={category.labelKey} className="py-1">
            <SidebarGroupLabel className="px-4 py-1 text-xs font-semibold text-gray-500">
              {t(category.labelKey)}
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1">
              <SidebarMenu>
                {category.items.map((item, itemIndex) => (
                  <div key={item.labelKey}>
                    <SidebarMenuItem>
                      {item.children ? (
                        <div 
                          className={cn(
                            "flex w-full items-center gap-2 px-4 py-2 text-sm outline-none transition-colors rounded-md",
                            isActiveRoute(item.path) ? "text-gray-800 font-medium bg-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                          )}
                          onClick={() => toggleExpand(catIndex, itemIndex)}
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
                              isActiveRoute(item.path) ? "text-gray-800 font-medium bg-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                            )}
                          >
                            <item.icon className="h-4 w-4 mr-2" />
                            <span>{t(item.labelKey)}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                    
                    {item.children && item.expanded && (
                      <div className="ml-6 pl-2 border-l border-gray-200">
                        {item.children.map((subItem) => (
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
    </Sidebar>
  );
}
