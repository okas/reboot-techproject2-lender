export function getISODateAddDays(
  days: number = 30,
  startDate: Date | string | number = Date.now()
) {
  const date = new Date(startDate);

  date.setDate(date.getDate() + days);

  return date.toISOString().split("T")[0];
}
