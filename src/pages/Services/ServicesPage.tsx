import { useMemo, useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { SearchInput } from "../../components/common/SearchInput";
import { Button } from "../../components/common/Button";
import { ServiceTable } from "../../components/services/ServiceTable";
import { ServiceFormDialog } from "../../components/services/ServiceFormDialog";
import { useServices } from "../../hooks/useServices";
import type { AdminService, ServiceFormValues } from "../../types/service";
import styles from "../../components/common/FilterRow.module.css";

export function ServicesPage() {
  const { services, addService, updateService, setStatus } = useServices();
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<AdminService | null>(null);

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (query.length === 0) return services;
    return services.filter((service) => service.name.toLowerCase().includes(query));
  }, [services, search]);

  function handleOpenAdd() {
    setEditingService(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(service: AdminService) {
    setEditingService(service);
    setIsFormOpen(true);
  }

  function handleSubmit(values: ServiceFormValues) {
    if (editingService) {
      updateService(editingService.id, values);
    } else {
      addService(values);
    }
    setIsFormOpen(false);
    setEditingService(null);
  }

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Manage the KaamSetu service catalog."
        actions={
          <Button variant="primary" onClick={handleOpenAdd}>
            + Add Service
          </Button>
        }
      />

      <div className={styles.row}>
        <SearchInput
          id="service-search"
          label="Search services"
          placeholder="Search services by name..."
          value={search}
          onChange={setSearch}
        />
      </div>

      <ServiceTable
        services={filteredServices}
        onEdit={handleOpenEdit}
        onToggleStatus={(service) =>
          setStatus(service.id, service.status === "ACTIVE" ? "DISABLED" : "ACTIVE")
        }
      />

      <ServiceFormDialog
        isOpen={isFormOpen}
        editingService={editingService}
        onClose={() => {
          setIsFormOpen(false);
          setEditingService(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
      }
      
