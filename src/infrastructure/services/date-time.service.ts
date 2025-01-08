import { IDateTimeService } from "@/src/application/services/date-time.service.interface";
import { add, sub } from "date-fns";

export class DateTimeService implements IDateTimeService {
  getCurrentDateTime(): Date {
    return new Date();
  }
  getCurrentDateTimetoISOString(): string {
    return new Date().toISOString();
  }
  getCurrentDateTimePlusDays(days: number): Date {
    return add(new Date(), { days });
  }

  getCurrentDateTimeMinusDays(days: number): Date {
    return sub(new Date(), { days });
  }
}
