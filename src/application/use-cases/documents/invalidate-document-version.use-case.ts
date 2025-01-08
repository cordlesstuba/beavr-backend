import { DocumentVersion } from "@/src/entities/document-version";
import { IDocumentsRepository } from "../../repositories/documents.repository.interface";

export type IInvalidateDocumentVersionUseCase = ReturnType<
  typeof invalidateDocumentVersionUseCase
>;

export const invalidateDocumentVersionUseCase =
  (documentsRepository: IDocumentsRepository) =>
  async (documentVersionId: string): Promise<DocumentVersion> => {
    const documentVersion = await documentsRepository.invalidateDocumentVersion(
      documentVersionId
    );

    return documentVersion;
  };
