import { IGetDocumentByIdUseCase } from "@/src/application/use-cases/documents/get-document-by-id.use-case";
import { Document, DocumentStatus } from "@/src/entities/documents";
import { format } from "date-fns";

function presenter(document: Document) {
  return {
    id: document.id,
    name: document.name,
    description: document.description,
    status:
      document.status === DocumentStatus.VALIDATED
        ? "Validated"
        : "Not validated",
    versions: document.versions.map((version) => {
      const { validation } = version;

      return {
        id: version.id,
        versionNumber: version.versionNumber,
        fileUrl: version.fileUrl,
        expiresAt: version.expiresAt
          ? format(version.expiresAt, "dd-MM-yyyy")
          : "",
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
    }),
  };
}

export type IGetDocumentByIdController = ReturnType<
  typeof getDocumentByIdController
>;

export const getDocumentByIdController =
  (getDocumentByIdUseCase: IGetDocumentByIdUseCase) =>
  async (id: string): Promise<ReturnType<typeof presenter>> => {
    const document = await getDocumentByIdUseCase(id);
    return presenter(document);
  };
