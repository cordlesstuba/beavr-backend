import { getInjection } from "@/di/container";
import prisma from "@/lib/prisma";
import { DocumentMapper } from "@/src/application/mappers/DocumentMapper";
import { DocumentVersionMapper } from "@/src/application/mappers/DocumentVersionMapper";
import { IDocumentsRepository } from "@/src/application/repositories/documents.repository.interface";
import { DocumentVersion } from "@/src/entities/document-version";
import { Document } from "@/src/entities/documents";
import { NotFoundError } from "@/src/entities/errors/common";

export class DocumentsRepository implements IDocumentsRepository {
  private dateTimeService = getInjection("IDateTimeService");

  async getDocuments(): Promise<Document[]> {
    const documents = await prisma.document.findMany({
      include: {
        versions: {
          where: {
            deletedAt: null,
          },
          include: {
            validation: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return documents.map(DocumentMapper.toDomain);
  }

  async getDocumentById(id: string): Promise<Document | null> {
    const document = await prisma.document.findFirst({
      where: {
        id,
      },
      include: {
        versions: {
          where: {
            deletedAt: null,
          },
          include: {
            validation: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return DocumentMapper.toDomain(document);
  }

  async createDocumentVersion(
    documentId: string,
    versionNumber: string,
    fileUrl: string
  ): Promise<DocumentVersion> {
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
      },
    });

    if (!document) {
      throw new NotFoundError(`Document Not found - ID: ${documentId}`);
    }

    const version = await prisma.documentVersion.create({
      data: {
        documentId,
        versionNumber,
        fileUrl,
        expiresAt: this.dateTimeService.getCurrentDateTimePlusDays(365),
      },
    });

    return DocumentVersionMapper.toDomain(version);
  }

  async deleteDocumentVersion(id: string): Promise<void> {
    await prisma.documentVersion.update({
      where: {
        id,
      },
      data: {
        deletedAt: this.dateTimeService.getCurrentDateTime(),
      },
    });
  }

  async validateDocumentVersion(id: string): Promise<DocumentVersion> {
    await prisma.validation.create({
      data: {
        documentVersionId: id,
        validatedAt: this.dateTimeService.getCurrentDateTime(),
      },
    });

    const documentVersion = await prisma.documentVersion.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        validation: true,
      },
    });

    if (!document) {
      throw new NotFoundError(`Document Version Not found - ID: ${id}`);
    }

    return DocumentVersionMapper.toDomain(documentVersion);
  }

  async invalidateDocumentVersion(id: string): Promise<DocumentVersion> {
    const documentVersion = await prisma.documentVersion.findFirst({
      where: {
        id,
      },
    });

    if (!documentVersion) {
      throw new NotFoundError(`Document Version Not found - ID: ${id}`);
    }

    await prisma.validation.deleteMany({
      where: {
        documentVersionId: id,
      },
    });
    return DocumentVersionMapper.toDomain(documentVersion);
  }
}
