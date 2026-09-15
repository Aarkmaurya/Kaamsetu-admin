import { useEffect, useState, type FormEvent } from "react";
import { Dialog } from "../common/Dialog";
import { Button } from "../common/Button";
import styles from "./AddNodeDialog.module.css";

interface AddNodeDialogProps {
  isOpen: boolean;
  title: string;
  fieldLabel: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export function AddNodeDialog({ isOpen, title, fieldLabel, onClose, onSubmit }: AddNodeDialogProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setError(null);
    }
  }, [isOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      setError("This field is required.");
      return;
    }
    onSubmit(name.trim());
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="add-node-form">
            Add
          </Button>
        </>
      }
    >
      <form id="add-node-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="add-node-name" className={styles.label}>
          {fieldLabel}
        </label>
        <input
          id="add-node-name"
          className={styles.input}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error) setError(null);
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "add-node-error" : undefined}
          autoFocus
        />
        {error && (
          <p id="add-node-error" className={styles.error}>
            {error}
          </p>
        )}
      </form>
    </Dialog>
  );
}
