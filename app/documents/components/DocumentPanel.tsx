"use client";

import { deleteDocumentVersion } from "@/app/actions/documents/delete-document-version.action";
import { getDocumentById } from "@/app/actions/documents/get-document-by-id.action";
import { invalidateDocumentVersion } from "@/app/actions/documents/invalidate-document-version.action";
import { validateDocumentVersion } from "@/app/actions/documents/validate-document-version.action";
import { Document } from "@/app/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/store/global";
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function DocumentPanel() {
  const {
    isDocumentPanelOpen,
    isNewVersionDialogOpen,
    onDocumentPanelOpenChange,
    onNewVersionDialogOpen,
    selectedDocumentId,
  } = useGlobalStore();
  const [document, setDocument] = useState<Document | null>(null);

  const onValidateDocumentVersion = async (id: string) => {
    const formData = new FormData();
    formData.append("documentVersionId", id);
    await validateDocumentVersion(formData);
    fetchDocument();
    toast.success("Document version validated !");
  };

  const onInValidateDocumentVersion = async (id: string) => {
    const formData = new FormData();
    formData.append("documentVersionId", id);
    await invalidateDocumentVersion(formData);
    fetchDocument();
    toast.success("Document version invalidated !");
  };

  const onDeleteDocumentVersion = async (id: string) => {
    const formData = new FormData();
    formData.append("documentVersionId", id);
    await deleteDocumentVersion(formData);
    fetchDocument();
    toast.success("Document version deleted !");
  };

  const fetchDocument = async () => {
    if (!selectedDocumentId) {
      return;
    }
    try {
      const document = await getDocumentById(selectedDocumentId);
      setDocument(document as Document);
    } catch (error) {
      toast.error(`Error while fetching document: ${error}`);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [isDocumentPanelOpen, selectedDocumentId, isNewVersionDialogOpen]);

  if (!selectedDocumentId || !document) {
    return <div>Oups ! Something went wrong</div>;
  }

  return (
    <Sheet open={isDocumentPanelOpen} onOpenChange={onDocumentPanelOpenChange}>
      <SheetContent className="w-full sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-2">
              {document.name}
            </div>
          </SheetTitle>
          <SheetDescription className="p-2">
            {document.description}
          </SheetDescription>
        </SheetHeader>
        <div className="p-2">
          <Button onClick={() => onNewVersionDialogOpen(selectedDocumentId)}>
            Add new version
          </Button>
          <ScrollArea className="h-96 rounded-md mt-2">
            {document.versions.map((version) => (
              <div
                key={version.id}
                className={cn(
                  "p-2 border rounded-md my-2 flex flex-row justify-between gap-2",
                  version.validation ? "bg-green-400" : "bg-white"
                )}
              >
                <div className="flex flex-col">
                  <span>Version: {version.versionNumber}</span>
                  <span>File url: {version.fileUrl}</span>
                  <span>Expires at: {version.expiresAt}</span>
                </div>

                <div className="">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteDocumentVersion(version.id)}
                  >
                    <Trash2 />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onInValidateDocumentVersion(version.id)}
                  >
                    <ThumbsDown />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onValidateDocumentVersion(version.id)}
                  >
                    <ThumbsUp />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
