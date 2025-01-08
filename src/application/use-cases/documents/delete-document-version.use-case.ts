import { IDocumentsRepository } from "../../repositories/documents.repository.interface";

export type IDeleteDocumentVersionUseCase = ReturnType<
  typeof deleteDocumentVersionUseCase
>;

export const deleteDocumentVersionUseCase =
  (documentsRepository: IDocumentsRepository) =>
  async (documentVersionId: string): Promise<void> => {
    await documentsRepository.deleteDocumentVersion(documentVersionId);
  };
