import { useState } from 'react';

interface UseDeleteDialogOptions {
  onConfirm: (itemId?: string | number) => Promise<void> | void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const useDeleteDialog = (options: UseDeleteDialogOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id?: string | number;
    name?: string;
  } | null>(null);

  const openDialog = (item?: { id?: string | number; name?: string }) => {
    setItemToDelete(item || null);
    setIsOpen(true);
  };

  const closeDialog = () => {
    if (!isLoading) {
      setIsOpen(false);
      setItemToDelete(null);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await options.onConfirm(itemToDelete?.id);
      closeDialog();
    } catch (error) {
      console.error('Delete operation failed:', error);
      // Keep dialog open on error so user can retry
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    isLoading,
    itemToDelete,
    openDialog,
    closeDialog,
    handleConfirm,
    title: options.title,
    description: options.description,
    confirmText: options.confirmText,
    cancelText: options.cancelText,
  };
};
