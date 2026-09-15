import { useEffect, useState, type FormEvent } from "react";
import { Dialog } from "../common/Dialog";
import { Button } from "../common/Button";
import type { AdminService, ServiceFormValues } from "../../types/service";
import styles from "./ServiceFormDialog.module.css";

interface ServiceFormDialogProps {
  isOpen: boolean;
  /** null = "Add Service" mode; a service = "Edit Service" mode, pre-filled. */
  editingService: AdminService | null;
  onClose: () => void;
  onSubmit: (values: ServiceFormValues) => void;
}

const EMPTY_VALUES: ServiceFormValues = { name: "", category: "", description: "" };

export function ServiceFormDialog({ isOpen, editingService, onClose, onSubmit }: ServiceFormDialogProps) {
  const [values, setValues] = useState<ServiceFormValues>(EMPTY_VALUES);
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setValues(
        editingService
          ? {
              name: editingService.name,
              category: editingService.category,
              description: editingService.description ?? "",
            }
          : EMPTY_VALUES
      );
      setNameError(null);
    }
  }, [isOpen, editingService]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.name.trim()) {
      setNameError("Service name is required.");
      return;
    }
    onSubmit(values);
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={editingService ? "Edit Service" : "Add Service"}
      footer={
        <>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="service-form">
            {editingService ? "Save changes" : "Add Service"}
          </Button>
        </>
      }
    >
      <form id="service-form" className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="service-name" className={styles.label}>
            Service name
          </label>
          <input
            id="service-name"
            className={styles.input}
            value={values.name}
            onChange={(event) => {
              setValues((prev) => ({ ...prev, name: event.target.value }));
              if (nameError) setNameError(null);
            }}
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? "service-name-error" : undefined}
          />
          {nameError && (
            <p id="service-name-error" className={styles.error}>
              {nameError}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="service-category" className={styles.label}>
            Category (optional)
          </label>
          <input
            id="service-category"
            className={styles.input}
            value={values.category}
            onChange={(event) => setValues((prev) => ({ ...prev, category: event.target.value }))}
            placeholder="e.g. Home Repair"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="service-description" className={styles.label}>
            Description (optional)
          </label>
          <textarea
            id="service-description"
            className={styles.textarea}
            rows={3}
            value={values.description}
            onChange={(event) => setValues((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>
      </form>
    </Dialog>
  );
}
