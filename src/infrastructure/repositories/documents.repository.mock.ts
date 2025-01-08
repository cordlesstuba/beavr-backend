import { getInjection } from "@/di/container";
import { DocumentMapper } from "@/src/application/mappers/DocumentMapper";
import { DocumentVersionMapper } from "@/src/application/mappers/DocumentVersionMapper";
import { IDocumentsRepository } from "@/src/application/repositories/documents.repository.interface";
import { DocumentVersion } from "@/src/entities/document-version";
import { Document } from "@/src/entities/documents";
import { NotFoundError } from "@/src/entities/errors/common";

export class MockDocumentsRepository implements IDocumentsRepository {
  private dateTimeService = getInjection("IDateTimeService");

  private documents = [
    {
      id: "1",
      name: "Doc1",
      description: "Description 1",
      versions: [
        {
          id: "v1",
          versionNumber: "1.0",
          fileUrl: "http://example.com/file1",
          expiresAt: this.dateTimeService.getCurrentDateTimePlusDays(365),
          validation: {
            id: "val1",
            validatedAt: this.dateTimeService.getCurrentDateTime(),
            remarks: "Valid",
          },
        },
        {
          id: "v2",
          versionNumber: "1.1",
          fileUrl: "http://example.com/file2",
          expiresAt: this.dateTimeService.getCurrentDateTimeMinusDays(365),
          validation: null,
        },
      ],
    },
    {
      id: "2",
      name: "Doc2",
      description: "Description 2",
      versions: [
        {
          id: "v3",
          versionNumber: "2.0",
          fileUrl: "http://example.com/file3",
          expiresAt: this.dateTimeService.getCurrentDateTimePlusDays(365),
          validation: null,
        },
      ],
    },
  ];

  async getDocuments(): Promise<Document[]> {
    return this.documents.map(DocumentMapper.toDomain);
  }

  async getDocumentById(id: string): Promise<Document | null> {
    const document = this.documents.find((document) => (document.id = id));
    if (!document) {
      return null;
    }
    return DocumentMapper.toDomain(document);
  }

  async createDocumentVersion(
    documentId: string,
    versionNumber: string,
    fileUrl: string
  ): Promise<DocumentVersion> {
    const document = this.documents.find((doc) => doc.id === documentId);

    if (!document) {
      throw new NotFoundError(`Document Not found - ID: ${documentId}`);
    }

    const newVersion = {
      id: "",
      versionNumber,
      fileUrl,
      expiresAt: this.dateTimeService.getCurrentDateTimePlusDays(365),
      validation: null,
    };

    document.versions.push(newVersion);

    return DocumentVersionMapper.toDomain(newVersion);
  }

  async deleteDocumentVersion(id: string): Promise<void> {
    throw new Error(`Method not implemented. ->${id}`);
  }

  validateDocumentVersion(id: string): Promise<DocumentVersion> {
    throw new Error(`Method not implemented. ->${id}`);
  }
  invalidateDocumentVersion(id: string): Promise<DocumentVersion> {
    throw new Error(`Method not implemented. ->${id}`);
  }
}
