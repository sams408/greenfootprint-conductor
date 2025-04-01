
import { ChevronDown, Leaf, Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "@/components/ui/input";
import { SidebarHeader } from "@/components/ui/sidebar";

export function AppSidebarHeader() {
  const { t } = useLanguage();
  
  return (
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
  );
}
