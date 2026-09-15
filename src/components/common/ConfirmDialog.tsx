import { Dialog } from "./Dialog";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "primary";
  isSubmitting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  isSubmitting = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : confirmLabel}
          </Button>
        </>
      }
    >
      <p>{message}</p>
    </Dialog>
  );
}
