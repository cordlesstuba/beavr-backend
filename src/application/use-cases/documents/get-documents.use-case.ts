import { Document } from "@/src/entities/documents";
import { IDocumentsRepository } from "../../repositories/documents.repository.interface";

export type IGetDocumentsUseCase = ReturnType<typeof getDocumentsUseCase>;

export const getDocumentsUseCase =
  (documentsRepository: IDocumentsRepository) =>
  async (): Promise<Document[]> => {
    const documents = await documentsRepository.getDocuments();
    return documents;
  };
