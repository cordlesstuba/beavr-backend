import { Requirement } from "@/src/entities/requirements";

export interface IRequirementsRepository {
  getRequirements(): Promise<Requirement[]>;
}
