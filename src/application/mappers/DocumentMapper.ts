import { DocumentVersion } from "@/src/entities/document-version";
import { Document } from "@/src/entities/documents";
import { Validation } from "@/src/entities/validation";

export class DocumentMapper {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  static toDomain(raw: any): Document {
    const versions = raw.versions.map(
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      (version: any) =>
        new DocumentVersion(
          version.id,
          version.versionNumber,
          version.fileUrl,
          version.createdAt,
          version.expiresAt,
          version.validation
            ? new Validation(
                version.validation.id,
                version.validation.validatedAt,
                version.validation.remarks
              )
            : null
        )
    );

    return new Document(raw.id, raw.name, raw.description, versions);
  }
}
