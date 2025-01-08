export interface IDateTimeService {
  getCurrentDateTime(): Date;
  getCurrentDateTimePlusDays(days: number): Date;
  getCurrentDateTimeMinusDays(days: number): Date;
}
