import { IDocumentsRepository } from "@/src/application/repositories/documents.repository.interface";
import { IRequirementsRepository } from "@/src/application/repositories/requirements.repository.interface";
import { IDateTimeService } from "@/src/application/services/date-time.service.interface";
import { ICreateDocumentVersionUseCase } from "@/src/application/use-cases/documents/create-document-version.use-case";
import { IDeleteDocumentVersionUseCase } from "@/src/application/use-cases/documents/delete-document-version.use-case";
import { IGetDocumentByIdUseCase } from "@/src/application/use-cases/documents/get-document-by-id.use-case";
import { IGetDocumentsUseCase } from "@/src/application/use-cases/documents/get-documents.use-case";
import { IInvalidateDocumentVersionUseCase } from "@/src/application/use-cases/documents/invalidate-document-version.use-case";
import { IValidateDocumentVersionUseCase } from "@/src/application/use-cases/documents/validate-document-version.use-case";
import { IGetRequirementsUseCase } from "@/src/application/use-cases/requirements/get-requirements.use-case";
import { ICreateDocumentVersionController } from "@/src/interface-adapter/controllers/documents/create-document-version.controller";
import { IDeleteDocumentVersionController } from "@/src/interface-adapter/controllers/documents/delete-document-version.controller";
import { IGetDocumentByIdController } from "@/src/interface-adapter/controllers/documents/get-document-by-id.controller";
import { IGetDocumentsController } from "@/src/interface-adapter/controllers/documents/get-documents.controller";
import { IInvalidateDocumentVersionController } from "@/src/interface-adapter/controllers/documents/invalidate-document-version.controller";
import { IValidateDocumentVersionController } from "@/src/interface-adapter/controllers/documents/validate-document-version.controller";
import { IGetRequirementsController } from "@/src/interface-adapter/controllers/requirements/get-requirements.controller";

export const DI_SYMBOLS = {
  // Services
  IDateTimeService: Symbol.for("IDateTimeService"),

  // Repositories
  IRequirementsRepository: Symbol.for("IRequirementsRepository"),
  IDocumentsRepository: Symbol.for("IDocumentsRepository"),

  // Use Cases
  IGetRequirementsUseCase: Symbol.for("IGetRequirementsUseCase"),
  IGetDocumentsUseCase: Symbol.for("IGetDocumentsUseCase"),
  IGetDocumentByIdUseCase: Symbol.for("IGetDocumentByIdUseCase"),
  ICreateDocumentVersionUseCase: Symbol.for("ICreateDocumentVersionUseCase"),
  IDeleteDocumentVersionUseCase: Symbol.for("IDeleteDocumentVersionUseCase"),
  IValidateDocumentVersionUseCase: Symbol.for(
    "IValidateDocumentVersionUseCase"
  ),
  IInvalidateDocumentVersionUseCase: Symbol.for(
    "IInvalidateDocumentVersionUseCase"
  ),

  // Controllers
  IGetRequirementsController: Symbol.for("IGetRequirementsController"),
  IGetDocumentsController: Symbol.for("IGetDocumentsController"),
  IGetDocumentByIdController: Symbol.for("IGetDocumentByIdController"),
  ICreateDocumentVersionController: Symbol.for(
    "ICreateDocumentVersionController"
  ),
  IDeleteDocumentVersionController: Symbol.for(
    "IDeleteDocumentVersionController"
  ),
  IValidateDocumentVersionController: Symbol.for(
    "IValidateDocumentVersionController"
  ),
  IInvalidateDocumentVersionController: Symbol.for(
    "IInvalidateDocumentVersionController"
  ),
};

export interface DI_RETURN_TYPES {
  // Services
  IDateTimeService: IDateTimeService;

  // Repositories
  IRequirementsRepository: IRequirementsRepository;
  IDocumentsRepository: IDocumentsRepository;

  // Use Cases
  IGetRequirementsUseCase: IGetRequirementsUseCase;
  IGetDocumentsUseCase: IGetDocumentsUseCase;
  IGetDocumentByIdUseCase: IGetDocumentByIdUseCase;
  ICreateDocumentVersionUseCase: ICreateDocumentVersionUseCase;
  IDeleteDocumentVersionUseCase: IDeleteDocumentVersionUseCase;
  IValidateDocumentVersionUseCase: IValidateDocumentVersionUseCase;
  IInvalidateDocumentVersionUseCase: IInvalidateDocumentVersionUseCase;

  // Controllers
  IGetRequirementsController: IGetRequirementsController;
  IGetDocumentsController: IGetDocumentsController;
  IGetDocumentByIdController: IGetDocumentByIdController;
  ICreateDocumentVersionController: ICreateDocumentVersionController;
  IDeleteDocumentVersionController: IDeleteDocumentVersionController;
  IValidateDocumentVersionController: IValidateDocumentVersionController;
  IInvalidateDocumentVersionController: IInvalidateDocumentVersionController;
}
