import dayjs from "dayjs";

export function isPastDate(date: Date): boolean {
  const now = dayjs();
  const dateToCheck = dayjs(date);
  return dateToCheck.isBefore(now);
}
