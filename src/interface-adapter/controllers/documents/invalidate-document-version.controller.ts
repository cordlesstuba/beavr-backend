import { IInvalidateDocumentVersionUseCase } from "@/src/application/use-cases/documents/invalidate-document-version.use-case";
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

export type IInvalidateDocumentVersionController = ReturnType<
  typeof invalidateDocumentVersionController
>;

export const invalidateDocumentVersionController =
  (invalidateDocumentVersionUseCase: IInvalidateDocumentVersionUseCase) =>
  async (documentVersionId: string): Promise<ReturnType<typeof presenter>> => {
    const documentVersion = await invalidateDocumentVersionUseCase(
      documentVersionId
    );

    return presenter(documentVersion);
  };
