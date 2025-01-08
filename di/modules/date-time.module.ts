import { DI_SYMBOLS } from "@/di/types";
import { DateTimeService } from "@/src/infrastructure/services/date-time.service";
import { MockDateTimeService } from "@/src/infrastructure/services/date-time.service.mock";
import { Container } from "@evyweb/ioctopus";

export function registerDateTimeModule(container: Container) {
  if (process.env.NODE_ENV === "test") {
    container.bind(DI_SYMBOLS.IDateTimeService).toClass(MockDateTimeService);
  } else {
    container.bind(DI_SYMBOLS.IDateTimeService).toClass(DateTimeService, []);
  }
}
