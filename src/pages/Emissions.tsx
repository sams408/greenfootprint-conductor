
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { EmissionForm } from "@/components/dashboard/emission-form";
import { EmissionDetailDialog } from "@/components/dashboard/EmissionDetailDialog";
import { EmissionsHeader } from "@/components/emissions/EmissionsHeader";
import { EmissionsFilter } from "@/components/emissions/EmissionsFilter";
import { EmissionsTable } from "@/components/emissions/EmissionsTable";
import { EmissionsPagination } from "@/components/emissions/EmissionsPagination";
import { useEmissionsData } from "@/hooks/useEmissionsData";
import { Emission } from "@/components/emissions/emissionsData";

const Emissions = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmission, setSelectedEmission] = useState<Emission | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  
  // Use our custom hook to handle emissions data, filtering and pagination
  const {
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
  } = useEmissionsData();
  
  const handleOpenDetail = (emission: Emission) => {
    setSelectedEmission(emission);
    setDetailDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <EmissionsHeader 
          showForm={showForm} 
          setShowForm={setShowForm} 
        />
        <Separator className="mb-6" />

        {showForm && (
          <div className="mb-6">
            <EmissionForm />
          </div>
        )}

        <div className="mb-6">
          <EmissionsFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            scopeFilter={scopeFilter}
            setScopeFilter={setScopeFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            setCurrentPage={setCurrentPage}
          />
          
          <EmissionsTable 
            emissions={paginatedEmissions} 
            onOpenDetail={handleOpenDetail} 
          />
          
          <EmissionsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredEmissions.length}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* Emission Detail Dialog */}
        <EmissionDetailDialog
          isOpen={detailDialogOpen}
          onClose={() => setDetailDialogOpen(false)}
          emission={selectedEmission}
        />
      </div>
    </div>
  );
};

export default Emissions;
