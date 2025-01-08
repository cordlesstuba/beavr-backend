import { DocumentVersion } from "@/src/entities/document-version";
import { IDocumentsRepository } from "../../repositories/documents.repository.interface";

export type IValidateDocumentVersionUseCase = ReturnType<
  typeof validateDocumentVersionUseCase
>;

export const validateDocumentVersionUseCase =
  (documentsRepository: IDocumentsRepository) =>
  async (documentVersionId: string): Promise<DocumentVersion> => {
    const documentVersion = await documentsRepository.validateDocumentVersion(
      documentVersionId
    );

    return documentVersion;
  };
