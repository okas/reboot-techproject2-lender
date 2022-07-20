export function getISODateAddDays(
  days: number = 30,
  startDate: Date | string | number = Date.now()
): string {
  const date = new Date(startDate);

  date.setDate(date.getDate() + days);

  return extractDateOnly(date);
}

export function getDayDiff(
  endDate: Date | string | number,
  startDate: Date | string | number
): number {
  const end = getDateDayPrecision(new Date(endDate));
  const start = getDateDayPrecision(new Date(startDate));
  const diffMs = end.getTime() - start.getTime();

  return Math.abs(diffMs / (1000 * 3600 * 24));
}

function getDateDayPrecision(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function extractDateOnly(date: Date) {
  return date.toISOString().split("T")[0];
}
