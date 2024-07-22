import {
  addYears,
  differenceInMonths,
} from "date-fns";

export function calculateTimeRemaining(dateString: string) {
  const inputDate = new Date(dateString);
  const nextYearDate = addYears(inputDate, 1);
  const currentDate = new Date();
  
  const monthsDifference = differenceInMonths(nextYearDate, currentDate);

  console.log(monthsDifference);

  return monthsDifference;
}
