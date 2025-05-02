
import { useState, useMemo } from "react";
import { Emission, initialEmissionsData } from "@/components/emissions/emissionsData";

export function useEmissionsData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scopeFilter, setScopeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter emissions based on search and filter criteria
  const filteredEmissions = useMemo(() => {
    return initialEmissionsData.filter(emission => {
      const matchesSearch = 
        emission.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
        emission.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesScope = scopeFilter === "all" || emission.scope === scopeFilter;
      
      const matchesCategory = 
        categoryFilter === "all" || 
        (categoryFilter === "fuel" && (emission.category.includes("Combustible") || emission.category.includes("Flota"))) ||
        (categoryFilter === "electricity" && emission.category.includes("Eléctrico")) ||
        (categoryFilter === "travel" && emission.category.includes("Viajes")) ||
        (categoryFilter === "waste" && (emission.category.includes("Residuos") || emission.category.includes("Subcontratados")));
      
      return matchesSearch && matchesScope && matchesCategory;
    });
  }, [searchQuery, scopeFilter, categoryFilter]);

  // Calculate total pages and paginated data
  const totalPages = Math.ceil(filteredEmissions.length / itemsPerPage);
  
  const paginatedEmissions = useMemo(() => {
    return filteredEmissions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredEmissions, currentPage]);

  return {
    searchQuery,
    setSearchQuery,
    scopeFilter,
    setScopeFilter,
    categoryFilter,
    setCategoryFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    filteredEmissions,
    paginatedEmissions
  };
}
