
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

interface EmissionsPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
}

export function EmissionsPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  setCurrentPage,
}: EmissionsPaginationProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-sm text-muted-foreground">
        {t('showing')} {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} - {Math.min(currentPage * itemsPerPage, totalItems)} {t('of')} {totalItems} {t('records')}
      </p>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        >
          {t('previous')}
        </Button>
        {[...Array(Math.min(3, totalPages))].map((_, i) => {
          let pageNumber = i + 1;
          if (totalPages > 3) {
            if (currentPage > totalPages - 2) {
              pageNumber = totalPages - 2 + i;
            } else if (currentPage > 2) {
              pageNumber = currentPage - 1 + i;
            }
          }
          
          return (
            <Button 
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"} 
              size="sm"
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        >
          {t('next')}
        </Button>
      </div>
    </div>
  );
}
