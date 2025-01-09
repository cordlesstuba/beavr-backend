"use server";

import { getInjection } from "@/di/container";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const invalidateVersionSchema = z.object({
  documentVersionId: z.string(),
});

export async function invalidateDocumentVersion(formData: FormData) {
  const invalidateDocumentVersionController = getInjection(
    "IInvalidateDocumentVersionController"
  );

  const validatedFields = invalidateVersionSchema.safeParse({
    documentVersionId: formData.get("documentVersionId"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { documentVersionId } = validatedFields.data;

    await invalidateDocumentVersionController(documentVersionId);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return { error: "Document Version not found" };
    }
    if (err instanceof InputParseError) {
      return { error: "Error in input data" };
    }
    return {
      error:
        "An error happened while invalidating a document version. The developers have been notified. Please try again later.",
    };
  }
  revalidatePath("/documents");
}
