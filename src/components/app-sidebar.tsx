
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent,
  useSidebar,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/sidebar";
import { getDefaultCategories } from "./sidebar/sidebar-data";
import { SidebarCategory as SidebarCategoryComponent } from "./sidebar/sidebar-category";
import { AppSidebarHeader } from "./sidebar/sidebar-header";
import { AppSidebarFooter } from "./sidebar/sidebar-footer";
import { SidebarCategory } from "./sidebar/sidebar-types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function AppSidebar() {
  const location = useLocation();
  const [categories, setCategories] = useState<SidebarCategory[]>(getDefaultCategories());
  const { isMobile, openMobile, setOpenMobile } = useSidebar();
  const isMobileDevice = useIsMobile();
  const [open, setOpen] = useState(false);
  
  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
    if (isMobileDevice && open) {
      setOpen(false);
    }
  }, [location.pathname, isMobile, openMobile, setOpenMobile, isMobileDevice, open]);

  const toggleExpand = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items[itemIndex].expanded = !newCategories[categoryIndex].items[itemIndex].expanded;
    setCategories(newCategories);
  };
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Use Drawer component for mobile view
  if (isMobileDevice) {
    return (
      <div className="md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-[85%] h-full p-0">
            <div className="flex h-full flex-col">
              <div className="flex justify-end p-4">
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Cerrar menú</span>
                  </Button>
                </DrawerClose>
              </div>
              <AppSidebarHeader />
              <SidebarContent className="p-0 overflow-y-auto flex-1">
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
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  // Return original sidebar for desktop
  return (
    <Sidebar 
      variant="inset" 
      className="bg-white dark:bg-sidebar border-r border-gray-200 shadow-sm hidden md:flex"
    >
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
