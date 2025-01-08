import { DI_SYMBOLS } from "@/di/types";
import { createDocumentVersionUseCase } from "@/src/application/use-cases/documents/create-document-version.use-case";
import { deleteDocumentVersionUseCase } from "@/src/application/use-cases/documents/delete-document-version.use-case";
import { getDocumentByIdUseCase } from "@/src/application/use-cases/documents/get-document-by-id.use-case";
import { getDocumentsUseCase } from "@/src/application/use-cases/documents/get-documents.use-case";
import { invalidateDocumentVersionUseCase } from "@/src/application/use-cases/documents/invalidate-document-version.use-case";
import { validateDocumentVersionUseCase } from "@/src/application/use-cases/documents/validate-document-version.use-case";
import { DocumentsRepository } from "@/src/infrastructure/repositories/documents.repository";
import { MockDocumentsRepository } from "@/src/infrastructure/repositories/documents.repository.mock";
import { createDocumentVersionController } from "@/src/interface-adapter/controllers/documents/create-document-version.controller";
import { deleteDocumentVersionController } from "@/src/interface-adapter/controllers/documents/delete-document-version.controller";
import { getDocumentByIdController } from "@/src/interface-adapter/controllers/documents/get-document-by-id.controller";
import { getDocumentsController } from "@/src/interface-adapter/controllers/documents/get-documents.controller";
import { invalidateDocumentVersionController } from "@/src/interface-adapter/controllers/documents/invalidate-document-version.controller";
import { validateDocumentVersionController } from "@/src/interface-adapter/controllers/documents/validate-document-version.controller";
import { Container } from "@evyweb/ioctopus";

export function registerDocumentsModule(container: Container) {
  // repositories
  if (process.env.NODE_ENV === "test") {
    container
      .bind(DI_SYMBOLS.IDocumentsRepository)
      .toClass(MockDocumentsRepository);
  } else {
    container
      .bind(DI_SYMBOLS.IDocumentsRepository)
      .toClass(DocumentsRepository, []);
  }

  // use cases
  container
    .bind(DI_SYMBOLS.IGetDocumentsUseCase)
    .toHigherOrderFunction(getDocumentsUseCase, [
      DI_SYMBOLS.IDocumentsRepository,
    ]);
  container
    .bind(DI_SYMBOLS.IGetDocumentByIdUseCase)
    .toHigherOrderFunction(getDocumentByIdUseCase, [
      DI_SYMBOLS.IDocumentsRepository,
    ]);
  container
    .bind(DI_SYMBOLS.ICreateDocumentVersionUseCase)
    .toHigherOrderFunction(createDocumentVersionUseCase, [
      DI_SYMBOLS.IDocumentsRepository,
    ]);
  container
    .bind(DI_SYMBOLS.IDeleteDocumentVersionUseCase)
    .toHigherOrderFunction(deleteDocumentVersionUseCase, [
      DI_SYMBOLS.IDocumentsRepository,
    ]);
  container
    .bind(DI_SYMBOLS.IValidateDocumentVersionUseCase)
    .toHigherOrderFunction(validateDocumentVersionUseCase, [
      DI_SYMBOLS.IDocumentsRepository,
    ]);
  container
    .bind(DI_SYMBOLS.IInvalidateDocumentVersionUseCase)
    .toHigherOrderFunction(invalidateDocumentVersionUseCase, [
      DI_SYMBOLS.IDocumentsRepository,
    ]);

  // controllers
  container
    .bind(DI_SYMBOLS.IGetDocumentsController)
    .toHigherOrderFunction(getDocumentsController, [
      DI_SYMBOLS.IGetDocumentsUseCase,
    ]);
  container
    .bind(DI_SYMBOLS.IGetDocumentByIdController)
    .toHigherOrderFunction(getDocumentByIdController, [
      DI_SYMBOLS.IGetDocumentByIdUseCase,
    ]);
  container
    .bind(DI_SYMBOLS.ICreateDocumentVersionController)
    .toHigherOrderFunction(createDocumentVersionController, [
      DI_SYMBOLS.ICreateDocumentVersionUseCase,
    ]);
  container
    .bind(DI_SYMBOLS.IDeleteDocumentVersionController)
    .toHigherOrderFunction(deleteDocumentVersionController, [
      DI_SYMBOLS.IDeleteDocumentVersionUseCase,
    ]);
  container
    .bind(DI_SYMBOLS.IValidateDocumentVersionController)
    .toHigherOrderFunction(validateDocumentVersionController, [
      DI_SYMBOLS.IValidateDocumentVersionUseCase,
    ]);
  container
    .bind(DI_SYMBOLS.IInvalidateDocumentVersionController)
    .toHigherOrderFunction(invalidateDocumentVersionController, [
      DI_SYMBOLS.IInvalidateDocumentVersionUseCase,
    ]);
}
