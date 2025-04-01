
import { SidebarCategory as SidebarCategoryType } from "./sidebar-types";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarItemComponent } from "./sidebar-item";

interface SidebarCategoryProps {
  category: SidebarCategoryType;
  categoryIndex: number;
  isActiveRoute: (path: string) => boolean;
  toggleExpand: (categoryIndex: number, itemIndex: number) => void;
}

export function SidebarCategory({ 
  category, 
  categoryIndex, 
  isActiveRoute, 
  toggleExpand 
}: SidebarCategoryProps) {
  const { t } = useLanguage();
  
  return (
    <SidebarGroup key={category.labelKey} className="py-1">
      <SidebarGroupLabel className="px-4 py-1 text-xs font-semibold text-gray-500">
        {t(category.labelKey)}
      </SidebarGroupLabel>
      <SidebarGroupContent className="space-y-1">
        <SidebarMenu>
          {category.items.map((item, itemIndex) => (
            <SidebarItemComponent 
              key={item.labelKey} 
              item={item} 
              isActiveRoute={isActiveRoute}
              toggleExpand={() => toggleExpand(categoryIndex, itemIndex)}
              categoryIndex={categoryIndex}
              itemIndex={itemIndex}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
