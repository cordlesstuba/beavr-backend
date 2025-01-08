import { Validation } from "./validation";

export class DocumentVersion {
  constructor(
    public id: string,
    public versionNumber: string,
    public fileUrl: string,
    public createdAt: Date,
    public expiresAt: Date,
    public validation: Validation | null
  ) {}
}
