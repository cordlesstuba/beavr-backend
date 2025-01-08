"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createDocumentVersion } from "@/app/actions/documents/create-document-version.action";
import { Input } from "@/components/ui/input";
import { useGlobalStore } from "@/store/global";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const NewVersionSchema = z.object({
  versionNumber: z.string(),
  fileUrl: z.string(),
});

export function DialogNewVersion() {
  const router = useRouter();

  const {
    isNewVersionDialogOpen,
    onNewVersionDialogClose,
    onNewVersionDialogOpenChange,
    selectedDocumentId,
  } = useGlobalStore();

  const form = useForm<z.infer<typeof NewVersionSchema>>({
    resolver: zodResolver(NewVersionSchema),
    defaultValues: {
      versionNumber: "",
      fileUrl: "",
    },
  });

  async function onSubmit(data: z.infer<typeof NewVersionSchema>) {
    if (!selectedDocumentId) {
      return;
    }

    const dataToSubmit = new FormData();
    dataToSubmit.append("documentId", selectedDocumentId);
    dataToSubmit.append("versionNumber", data.versionNumber);
    dataToSubmit.append("fileUrl", data.fileUrl);

    try {
      await createDocumentVersion(dataToSubmit);
      form.reset();
      onNewVersionDialogClose();
      router.refresh();
      toast.success(`New version ${data.versionNumber} created !`);
    } catch (error) {
      toast.error(`Error while creating document version: ${error}`);
    }
  }

  return (
    <Dialog
      open={isNewVersionDialogOpen}
      onOpenChange={onNewVersionDialogOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New document version</DialogTitle>
          <DialogDescription>
            Add new document version here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="versionNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File path</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
