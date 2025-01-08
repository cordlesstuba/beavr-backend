import { Document, DocumentStatus } from "./documents";

export class Requirement {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public documents: Document[]
  ) {}

  get progress(): number {
    const total = this.documents.length;
    const validated = this.documents.filter(
      (doc) => doc.status === DocumentStatus.VALIDATED
    ).length;
    return total > 0 ? (validated / total) * 100 : 0;
  }
}
