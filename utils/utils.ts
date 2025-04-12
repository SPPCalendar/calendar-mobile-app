// import { Month } from "@/types/Month";

export type MonthNumbers = {
  lastMonth: number[];
  thisMonth: number[][];
  nextMonth: number[];
};

export const getMonthNumbers = (month: Month, year: number): MonthNumbers => {
  const result: MonthNumbers = { lastMonth: [], thisMonth: [], nextMonth: [] };
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const currentDateLastMonth = new Date(firstDay);

  if (firstDay.getDay() != 1) {
    currentDateLastMonth.setDate(currentDateLastMonth.getDate() - 1);
    result.lastMonth.push(currentDateLastMonth.getDate());

    while (currentDateLastMonth.getDay() != 1) {
      currentDateLastMonth.setDate(currentDateLastMonth.getDate() - 1);
      result.lastMonth.push(currentDateLastMonth.getDate());
    }
  }
  result.lastMonth.sort();
  console.log("we have done last month");

  const currentDateThisMonth = new Date(firstDay);

  if (firstDay.getDay() != 1) {
    const firstWeek = [];
    firstWeek.push(firstDay.getDate());

    while (currentDateThisMonth.getDay() != 1) {
      currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
      firstWeek.push(currentDateThisMonth.getDate());
    }
    // currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
    // firstWeek.push(currentDateThisMonth.getDate());
    result.thisMonth.push(firstWeek);
  }
  console.log("we have done this month");

  for (let i = 0; i < 4; i++) {
    const currentWeek = [];
    while (currentDateThisMonth.getDay() != 0) {
      currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
      currentWeek.push(currentDateThisMonth.getDate());
    }
    currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
    currentWeek.push(currentDateThisMonth.getDate());
    result.thisMonth.push(currentWeek);
  }
  console.log("we have done next month");

  const lastWeek = [];
  while (lastDay.getTime() != currentDateThisMonth.getTime()) {
    console.log(
      formatUkrainianDate(lastDay) +
        " and " +
        formatUkrainianDate(currentDateThisMonth)
    );

    currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
    lastWeek.push(currentDateThisMonth.getDate());
  }
  result.thisMonth.push(lastWeek);

  const left = 7 - lastWeek.length;

  for (let i = 1; i < left + 1; i++) {
    result.nextMonth.push(i);
  }

  return result;
};

export const formatUkrainianDate = (date: Date): string => {
  const monthFormatter = new Intl.DateTimeFormat("uk-UA", { month: "long" });
  const weekdayFormatter = new Intl.DateTimeFormat("uk-UA", {
    weekday: "short",
  });
  const day = date.getDate();

  const month = capitalize(monthFormatter.format(date));
  const weekday = weekdayFormatter.format(date);

  return `${month} ${day}(${weekday})`;
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getUkrainianMonthName = (monthIndex: number): string => {
  const date = new Date(2025, monthIndex - 1, 1);
  const formatter = new Intl.DateTimeFormat("uk-UA", { month: "long" });
  return capitalize(formatter.format(date));
};

export enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

console.log(getMonthNumbers(Month.April, 2025));
