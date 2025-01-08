"use server";

import { getInjection } from "@/di/container";
import { NotFoundError } from "@/src/entities/errors/common";
import { z } from "zod";

const createNewVersionSchema = z.object({
  documentId: z.string(),
  versionNumber: z.string(),
  fileUrl: z.string(),
});

export async function createDocumentVersion(formData: FormData) {
  const createDocumentVersionController = getInjection(
    "ICreateDocumentVersionController"
  );

  const validatedFields = createNewVersionSchema.safeParse({
    documentId: formData.get("documentId"),
    versionNumber: formData.get("versionNumber"),
    fileUrl: formData.get("fileUrl"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  let documentVersion;
  try {
    const { documentId, versionNumber, fileUrl } = validatedFields.data;

    documentVersion = await createDocumentVersionController(
      documentId,
      versionNumber,
      fileUrl
    );
    return documentVersion;
  } catch (err) {
    if (err instanceof NotFoundError) {
      return { error: "Document not found" };
    }
    return {
      error:
        "An error happened while creating a document version. The developers have been notified. Please try again later.",
    };
  }
}
