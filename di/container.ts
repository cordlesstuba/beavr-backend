import { createContainer } from "@evyweb/ioctopus";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/di/types";

import { registerDateTimeModule } from "./modules/date-time.module";
import { registerDocumentsModule } from "./modules/documents.module";
import { registerRequirementsModule } from "./modules/requirements.module";

const ApplicationContainer = createContainer();

registerDateTimeModule(ApplicationContainer);
registerRequirementsModule(ApplicationContainer);
registerDocumentsModule(ApplicationContainer);

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
