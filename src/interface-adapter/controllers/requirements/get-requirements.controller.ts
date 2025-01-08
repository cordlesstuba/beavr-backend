import { IGetRequirementsUseCase } from "@/src/application/use-cases/requirements/get-requirements.use-case";
import { Requirement } from "@/src/entities/requirements";

function presenter(requirements: Requirement[]) {
  return requirements.map((requirement) => {
    return {
      id: requirement.id,
      name: requirement.name,
      description: requirement.description,
      progress: requirement.progress,
    };
  });
}

export type IGetRequirementsController = ReturnType<
  typeof getRequirementsController
>;

export const getRequirementsController =
  (getRequirementsUseCase: IGetRequirementsUseCase) =>
  async (): Promise<ReturnType<typeof presenter>> => {
    const requirements = await getRequirementsUseCase();

    return presenter(requirements);
  };
