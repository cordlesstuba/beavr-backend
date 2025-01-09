"use server";

import { getInjection } from "@/di/container";
import { NotFoundError } from "@/src/entities/errors/common";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deleteVersionSchema = z.object({
  documentVersionId: z.string(),
});

export async function deleteDocumentVersion(formData: FormData) {
  const deleteDocumentVersionController = getInjection(
    "IDeleteDocumentVersionController"
  );

  const validatedFields = deleteVersionSchema.safeParse({
    documentVersionId: formData.get("documentVersionId"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { documentVersionId } = validatedFields.data;

    await deleteDocumentVersionController(documentVersionId);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return { error: "Document version not found" };
    }
    return {
      error:
        "An error happened while deleting a document version. The developers have been notified. Please try again later.",
    };
  }
  revalidatePath("/documents");
}
