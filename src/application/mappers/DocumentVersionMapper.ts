import { DocumentVersion } from "@/src/entities/document-version";
import { Validation } from "@/src/entities/validation";

export class DocumentVersionMapper {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  static toDomain(raw: any): DocumentVersion {
    return new DocumentVersion(
      raw.id,
      raw.versionNumber,
      raw.fileUrl,
      raw.createdAt,
      raw.expiresAt,
      raw.validation
        ? new Validation(
            raw.validation.id,
            raw.validation.validatedAt,
            raw.validation.remarks
          )
        : null
    );
  }
}
