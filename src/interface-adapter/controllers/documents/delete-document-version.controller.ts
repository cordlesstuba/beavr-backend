import { IDeleteDocumentVersionUseCase } from "@/src/application/use-cases/documents/delete-document-version.use-case";

export type IDeleteDocumentVersionController = ReturnType<
  typeof deleteDocumentVersionController
>;

export const deleteDocumentVersionController =
  (deleteDocumentVersionUseCase: IDeleteDocumentVersionUseCase) =>
  async (documentVersionId: string): Promise<void> => {
    await deleteDocumentVersionUseCase(documentVersionId);
  };
