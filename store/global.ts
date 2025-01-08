import { create } from "zustand";

interface GlobalStoreProps {
  isDocumentPanelOpen: boolean;
  isNewVersionDialogOpen: boolean;

  selectedDocumentId: string | null;

  onDocumentPanelOpen: (documentId: string) => void;
  onDocumentPanelClose: () => void;
  onDocumentPanelOpenChange: (open: boolean) => void;

  onNewVersionDialogOpen: (documentId: string) => void;
  onNewVersionDialogClose: () => void;
  onNewVersionDialogOpenChange: (open: boolean) => void;
}

export const useGlobalStore = create<GlobalStoreProps>((set) => ({
  isDocumentPanelOpen: false,
  isNewVersionDialogOpen: false,
  selectedDocumentId: null,

  onDocumentPanelOpen: (documentId: string) =>
    set({ isDocumentPanelOpen: true, selectedDocumentId: documentId }),
  onDocumentPanelClose: () =>
    set({ isDocumentPanelOpen: false, selectedDocumentId: null }),
  onDocumentPanelOpenChange: (open: boolean) =>
    set({ isDocumentPanelOpen: open, selectedDocumentId: null }),

  onNewVersionDialogOpen: (documentId: string) =>
    set({ isNewVersionDialogOpen: true, selectedDocumentId: documentId }),
  onNewVersionDialogClose: () => set({ isNewVersionDialogOpen: false }),
  onNewVersionDialogOpenChange: (open: boolean) =>
    set({ isNewVersionDialogOpen: open, selectedDocumentId: null }),
}));
