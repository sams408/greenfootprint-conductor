
import { StatsCards } from "@/components/dashboard/stats-cards";
import { EmissionsSummary } from "@/components/dashboard/emissions-summary";
import { ScopeBreakdown } from "@/components/dashboard/scope-breakdown";

export function SummaryTab() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <EmissionsSummary />
        <ScopeBreakdown />
      </div>
    </>
  );
}
