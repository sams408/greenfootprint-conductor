
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";

interface EmissionsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scopeFilter: string;
  setScopeFilter: (scope: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

export function EmissionsFilter({
  searchQuery,
  setSearchQuery,
  scopeFilter,
  setScopeFilter,
  categoryFilter,
  setCategoryFilter,
  setCurrentPage,
}: EmissionsFilterProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('search')}
          className="pl-8"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>
      <div className="flex gap-2">
        <Select 
          value={scopeFilter} 
          onValueChange={(value) => {
            setScopeFilter(value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
        >
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>{t('scope')}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allScopes')}</SelectItem>
            <SelectItem value="1">{t('scope1')}</SelectItem>
            <SelectItem value="2">{t('scope2')}</SelectItem>
            <SelectItem value="3">{t('scope3')}</SelectItem>
          </SelectContent>
        </Select>
        <Select 
          value={categoryFilter} 
          onValueChange={(value) => {
            setCategoryFilter(value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
        >
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>{t('category')}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allCategories')}</SelectItem>
            <SelectItem value="fuel">{t('fuels')}</SelectItem>
            <SelectItem value="electricity">{t('electricity')}</SelectItem>
            <SelectItem value="travel">{t('travel')}</SelectItem>
            <SelectItem value="waste">{t('waste')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
