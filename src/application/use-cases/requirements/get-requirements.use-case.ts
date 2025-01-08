import { Requirement } from "@/src/entities/requirements";
import { IRequirementsRepository } from "../../repositories/requirements.repository.interface";

export type IGetRequirementsUseCase = ReturnType<typeof getRequirementsUseCase>;

export const getRequirementsUseCase =
  (requirementsRepository: IRequirementsRepository) =>
  async (): Promise<Requirement[]> => {
    const requirements = await requirementsRepository.getRequirements();
    return requirements;
  };
