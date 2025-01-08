import { DI_SYMBOLS } from "@/di/types";
import { getRequirementsUseCase } from "@/src/application/use-cases/requirements/get-requirements.use-case";
import { RequirementsRepository } from "@/src/infrastructure/repositories/requirements.repository";
import { MockRequirementsRepository } from "@/src/infrastructure/repositories/requirements.repository.mock";
import { getRequirementsController } from "@/src/interface-adapter/controllers/requirements/get-requirements.controller";
import { Container } from "@evyweb/ioctopus";

export function registerRequirementsModule(container: Container) {
  // repositories
  if (process.env.NODE_ENV === "test") {
    container
      .bind(DI_SYMBOLS.IRequirementsRepository)
      .toClass(MockRequirementsRepository);
  } else {
    container
      .bind(DI_SYMBOLS.IRequirementsRepository)
      .toClass(RequirementsRepository, []);
  }

  // use cases
  container
    .bind(DI_SYMBOLS.IGetRequirementsUseCase)
    .toHigherOrderFunction(getRequirementsUseCase, [
      DI_SYMBOLS.IRequirementsRepository,
    ]);

  // controllers
  container
    .bind(DI_SYMBOLS.IGetRequirementsController)
    .toHigherOrderFunction(getRequirementsController, [
      DI_SYMBOLS.IGetRequirementsUseCase,
    ]);
}
