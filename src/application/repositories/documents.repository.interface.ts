import { DocumentVersion } from "@/src/entities/document-version";
import { Document } from "@/src/entities/documents";

export interface IDocumentsRepository {
  getDocuments(): Promise<Document[]>;
  getDocumentById(id: string): Promise<Document | null>;
  createDocumentVersion(
    documentId: string,
    versionNumber: string,
    fileUrl: string
  ): Promise<DocumentVersion>;
  deleteDocumentVersion(id: string): Promise<void>;
  validateDocumentVersion(id: string): Promise<DocumentVersion>;
  invalidateDocumentVersion(id: string): Promise<DocumentVersion>;
}
