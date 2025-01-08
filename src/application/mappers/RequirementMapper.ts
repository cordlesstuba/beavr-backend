import { DocumentVersion } from "@/src/entities/document-version";
import { Document } from "@/src/entities/documents";
import { Requirement } from "@/src/entities/requirements";
import { Validation } from "@/src/entities/validation";

export class RequirementMapper {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  static toDomain(raw: any): Requirement {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const documents = raw.documents.map((doc: any) => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const versions = doc.versions.map((version: any) => {
        const validation = version.validation
          ? new Validation(
              version.validation.id,
              new Date(version.validation.validatedAt),
              version.validation.remarks
            )
          : null;

        return new DocumentVersion(
          version.id,
          version.versionNumber,
          version.fileUrl,
          version.createdAt,
          version.expiresAt,
          validation
        );
      });

      return new Document(doc.id, doc.name, doc.description, versions);
    });

    return new Requirement(raw.id, raw.name, raw.description, documents);
  }
}
