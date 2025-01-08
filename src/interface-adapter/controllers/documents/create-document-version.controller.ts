import { ICreateDocumentVersionUseCase } from "@/src/application/use-cases/documents/create-document-version.use-case";
import { DocumentVersion } from "@/src/entities/document-version";
import { format } from "date-fns";

function presenter(version: DocumentVersion) {
  const { validation } = version;
  return {
    id: version.id,
    versionNumber: version.versionNumber,
    fileUrl: version.fileUrl,
    expiresAt: version.expiresAt ? format(version.expiresAt, "dd-MM-yyyy") : "",
    validation: validation
      ? {
          id: validation.id,
          remarks: validation.remarks,
          validatedAt: validation?.validatedAt
            ? format(validation.validatedAt, "dd-MM-yyyy")
            : "",
        }
      : null,
  };
}

export type ICreateDocumentVersionController = ReturnType<
  typeof createDocumentVersionController
>;

export const createDocumentVersionController =
  (createDocumentVersionUseCase: ICreateDocumentVersionUseCase) =>
  async (
    documentId: string,
    versionNumber: string,
    fileUrl: string
  ): Promise<ReturnType<typeof presenter>> => {
    const documentVersion = await createDocumentVersionUseCase(
      documentId,
      versionNumber,
      fileUrl
    );

    return presenter(documentVersion);
  };
