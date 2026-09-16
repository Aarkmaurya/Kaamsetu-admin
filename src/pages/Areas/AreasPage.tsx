import { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { Button } from "../../components/common/Button";
import { AreaTree } from "../../components/areas/AreaTree";
import { AddNodeDialog } from "../../components/areas/AddNodeDialog";
import { StatusBadge } from "../../components/common/StatusBadge";
import { EmptyState } from "../../components/common/EmptyState";
import { useAreas } from "../../hooks/useAreas";
import styles from "./AreasPage.module.css";

type AddDialogState =
  | { type: "city" }
  | { type: "area"; cityId: string }
  | { type: "locality"; cityId: string; areaId: string }
  | null;

export function AreasPage() {
  const { cities, availability, addCity, addArea, addLocality, toggleCityActive, toggleAreaActive, toggleLocalityActive } =
    useAreas();
  const [addDialog, setAddDialog] = useState<AddDialogState>(null);

  function handleAddSubmit(name: string) {
    if (!addDialog) return;
    if (addDialog.type === "city") addCity(name);
    if (addDialog.type === "area") addArea(addDialog.cityId, name);
    if (addDialog.type === "locality") addLocality(addDialog.cityId, addDialog.areaId, name);
    setAddDialog(null);
  }

  const dialogCopy = (() => {
    if (!addDialog) return { title: "", fieldLabel: "" };
    if (addDialog.type === "city") return { title: "Add City", fieldLabel: "City name" };
    if (addDialog.type === "area") return { title: "Add Area", fieldLabel: "Area name" };
    return { title: "Add Locality", fieldLabel: "Locality name" };
  })();

  return (
    <div>
      <PageHeader
        title="Areas"
        subtitle="Manage the City → Area → Locality coverage hierarchy."
        actions={
          <Button variant="primary" onClick={() => setAddDialog({ type: "city" })}>
            + Add City
          </Button>
        }
      />

      <div className={styles.grid}>
        <section className={styles.treeSection} aria-label="Area hierarchy">
          <AreaTree
            cities={cities}
            onToggleCity={toggleCityActive}
            onToggleArea={toggleAreaActive}
            onToggleLocality={toggleLocalityActive}
            onAddArea={(cityId) => setAddDialog({ type: "area", cityId })}
            onAddLocality={(cityId, areaId) => setAddDialog({ type: "locality", cityId, areaId })}
          />
        </section>

        <section className={styles.availabilitySection} aria-label="Service availability">
          <h2 className={styles.sectionTitle}>Service Availability</h2>
          <p className={styles.sectionSubtitle}>
            A preview of which services are mapped to which areas — mock relationships only, meant
            to show the shape of data future technician/job matching will use.
          </p>

          {availability.length === 0 ? (
            <EmptyState title="No availability data" description="Nothing configured yet." />
          ) : (
            <ul className={styles.availabilityList}>
              {availability.map((entry) => (
                <li key={entry.id} className={styles.availabilityRow}>
                  <div>
                    <p className={styles.serviceName}>{entry.serviceName}</p>
                    <p className={styles.areaName}>Available in {entry.areaName}</p>
                  </div>
                  <StatusBadge
                    label={entry.isAvailable ? "Available" : "Unavailable"}
                    tone={entry.isAvailable ? "success" : "neutral"}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <AddNodeDialog
        isOpen={addDialog !== null}
        title={dialogCopy.title}
        fieldLabel={dialogCopy.fieldLabel}
        onClose={() => setAddDialog(null)}
        onSubmit={handleAddSubmit}
      />
    </div>
  );
}
