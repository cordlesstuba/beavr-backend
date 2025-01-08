import { IGetDocumentsUseCase } from "@/src/application/use-cases/documents/get-documents.use-case";
import { Document, DocumentStatus } from "@/src/entities/documents";

function presenter(documents: Document[]) {
  return documents.map((document) => {
    return {
      id: document.id,
      name: document.name,
      description: document.description,
      status:
        document.status === DocumentStatus.VALIDATED
          ? "Validated"
          : "Not validated",
    };
  });
}

export type IGetDocumentsController = ReturnType<typeof getDocumentsController>;

export const getDocumentsController =
  (getDocumentsUseCase: IGetDocumentsUseCase) =>
  async (): Promise<ReturnType<typeof presenter>> => {
    const documents = await getDocumentsUseCase();

    return presenter(documents);
  };
