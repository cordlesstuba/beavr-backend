import { DocumentVersion } from "@/src/entities/document-version";
import { IDocumentsRepository } from "../../repositories/documents.repository.interface";

export type ICreateDocumentVersionUseCase = ReturnType<
  typeof createDocumentVersionUseCase
>;

export const createDocumentVersionUseCase =
  (documentsRepository: IDocumentsRepository) =>
  async (
    documentId: string,
    versionNumber: string,
    fileUrl: string
  ): Promise<DocumentVersion> => {
    const documentVersion = await documentsRepository.createDocumentVersion(
      documentId,
      versionNumber,
      fileUrl
    );

    return documentVersion;
  };
