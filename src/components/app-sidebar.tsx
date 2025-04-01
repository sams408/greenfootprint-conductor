
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { getDefaultCategories } from "./sidebar/sidebar-data";
import { SidebarCategory as SidebarCategoryComponent } from "./sidebar/sidebar-category";
import { AppSidebarHeader } from "./sidebar/sidebar-header";
import { AppSidebarFooter } from "./sidebar/sidebar-footer";
import { SidebarCategory } from "./sidebar/sidebar-types";

export function AppSidebar() {
  const location = useLocation();
  const [categories, setCategories] = useState<SidebarCategory[]>(getDefaultCategories());

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
      <AppSidebarHeader />
      <SidebarContent className="p-0">
        {categories.map((category, catIndex) => (
          <SidebarCategoryComponent
            key={category.labelKey}
            category={category}
            categoryIndex={catIndex}
            isActiveRoute={isActiveRoute}
            toggleExpand={toggleExpand}
          />
        ))}
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}
