import { IDateTimeService } from "@/src/application/services/date-time.service.interface";
import { add, sub } from "date-fns";

export class MockDateTimeService implements IDateTimeService {
  getCurrentDateTime(): Date {
    return new Date(1995, 0, 27);
  }
  getCurrentDateTimetoISOString(): string {
    return new Date(1995, 0, 27).toISOString();
  }
  getCurrentDateTimePlusDays(days: number): Date {
    return add(new Date(1995, 0, 27), { days });
  }

  getCurrentDateTimeMinusDays(days: number): Date {
    return sub(new Date(1995, 0, 27), { days });
  }
}
