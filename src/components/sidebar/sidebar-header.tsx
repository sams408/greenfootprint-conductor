
import { Leaf, Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "@/components/ui/input";
import { SidebarHeader } from "@/components/ui/sidebar";

export function AppSidebarHeader() {
  const { t } = useLanguage();
  
  return (
    <SidebarHeader className="pb-0">
      <div className="flex items-center gap-2 px-4 py-4">
        <Leaf className="h-6 w-6 text-emerald-600" />
        <span className="text-xl font-bold text-gray-800">GreenFlow</span>
      </div>
      
      <div className="px-3 pb-4 relative">
        <Search className="h-4 w-4 absolute left-5 top-3 text-gray-400" />
        <Input 
          placeholder={t('goTo')} 
          className="pl-8 h-9 text-sm bg-gray-50 border-gray-200 rounded-md"
        />
      </div>
    </SidebarHeader>
  );
}
