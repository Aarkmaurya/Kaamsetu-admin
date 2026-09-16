import { useMemo, useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { TechnicianSummaryCards } from "../../components/technicians/TechnicianSummaryCards";
import { TechnicianFilters, type TechnicianFilterState } from "../../components/technicians/TechnicianFilters";
import { TechnicianTable } from "../../components/technicians/TechnicianTable";
import { TechnicianDetailsDrawer } from "../../components/technicians/TechnicianDetailsDrawer";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { useTechnicians } from "../../hooks/useTechnicians";
import type { Technician } from "../../types/technician";

const INITIAL_FILTERS: TechnicianFilterState = {
  search: "",
  status: "ALL",
  skill: "ALL",
  area: "ALL",
};

type PendingAction = { type: "reject" | "suspend"; technician: Technician } | null;

export function TechniciansPage() {
  const { technicians, counts, approve, reject, suspend } = useTechnicians();
  const [filters, setFilters] = useState<TechnicianFilterState>(INITIAL_FILTERS);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const filteredTechnicians = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return technicians.filter((technician) => {
      const matchesSearch =
        query.length === 0 ||
        technician.name.toLowerCase().includes(query) ||
        technician.skills.some((skill) => skill.toLowerCase().includes(query)) ||
        technician.serviceAreas.some((area) => area.toLowerCase().includes(query));

      const matchesStatus = filters.status === "ALL" || technician.status === filters.status;
      const matchesSkill = filters.skill === "ALL" || technician.skills.includes(filters.skill);
      const matchesArea = filters.area === "ALL" || technician.serviceAreas.includes(filters.area);

      return matchesSearch && matchesStatus && matchesSkill && matchesArea;
    });
  }, [technicians, filters]);

  function handleConfirmPendingAction() {
    if (!pendingAction) return;
    if (pendingAction.type === "reject") reject(pendingAction.technician.id);
    if (pendingAction.type === "suspend") suspend(pendingAction.technician.id);
    setPendingAction(null);
    setSelectedTechnician(null);
  }

  return (
    <div>
      <PageHeader
        title="Technicians"
        subtitle="Review applications and manage partner accounts across KaamSetu."
      />

      <TechnicianSummaryCards counts={counts} />

      <TechnicianFilters technicians={technicians} filters={filters} onChange={setFilters} />

      <TechnicianTable
        technicians={filteredTechnicians}
        onView={setSelectedTechnician}
        onApprove={(technician) => approve(technician.id)}
        onReject={(technician) => setPendingAction({ type: "reject", technician })}
        onSuspend={(technician) => setPendingAction({ type: "suspend", technician })}
      />

      <TechnicianDetailsDrawer
        technician={selectedTechnician}
        onClose={() => setSelectedTechnician(null)}
        onApprove={(technician) => approve(technician.id)}
        onReject={(technician) => setPendingAction({ type: "reject", technician })}
        onSuspend={(technician) => setPendingAction({ type: "suspend", technician })}
      />

      <ConfirmDialog
        isOpen={pendingAction !== null}
        title={pendingAction?.type === "reject" ? "Reject technician" : "Suspend technician"}
        message={
          pendingAction
            ? `Are you sure you want to ${pendingAction.type} ${pendingAction.technician.name}?`
            : ""
        }
        confirmLabel={pendingAction?.type === "reject" ? "Reject" : "Suspend"}
        tone="danger"
        onConfirm={handleConfirmPendingAction}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
}

