import { Document } from "@/src/entities/documents";
import { NotFoundError } from "@/src/entities/errors/common";
import { IDocumentsRepository } from "../../repositories/documents.repository.interface";

export type IGetDocumentByIdUseCase = ReturnType<typeof getDocumentByIdUseCase>;

export const getDocumentByIdUseCase =
  (documentsRepository: IDocumentsRepository) =>
  async (id: string): Promise<Document> => {
    const document = await documentsRepository.getDocumentById(id);
    if (!document) {
      throw new NotFoundError(`Document Not found - ID: ${id}`);
    }
    return document;
  };
