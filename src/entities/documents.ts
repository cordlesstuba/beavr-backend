import { getInjection } from "@/di/container";
import { DocumentVersion } from "./document-version";

export enum DocumentStatus {
  NOT_VALIDATED,
  VALIDATED,
}

export class Document {
  private dateTimeService = getInjection("IDateTimeService");

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public versions: DocumentVersion[]
  ) {}

  get status(): DocumentStatus {
    const latestVersion = this.getLatestVersion();
    if (
      latestVersion &&
      latestVersion.validation &&
      latestVersion.validation.validatedAt &&
      latestVersion.expiresAt > this.dateTimeService.getCurrentDateTime()
    ) {
      return DocumentStatus.VALIDATED;
    }
    return DocumentStatus.NOT_VALIDATED;
  }

  private getLatestVersion(): DocumentVersion | null {
    if (this.versions.length === 0) {
      return null;
    }
    return this.versions.reduce((latest, current) =>
      current.createdAt > latest.createdAt ? current : latest
    );
  }
}
