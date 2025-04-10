// import { Month } from "@/enums/Month";

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

type MonthNumbers = {
  lastMonth: number[];
  thisMonth: number[][];
  nextMonth: number[];
};

const getMonthNumbers = (month: Month, year: number) => {
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

  const currentDateThisMonth = new Date(firstDay);

  if (firstDay.getDay() != 7) {
    const firstWeek = [];
    firstWeek.push(firstDay.getDate());

    while (currentDateThisMonth.getDay() != 6) {
      currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
      firstWeek.push(currentDateThisMonth.getDate());
    }
    currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
    firstWeek.push(currentDateThisMonth.getDate());
    result.thisMonth.push(firstWeek);
  }

  for (let i = 0; i < 4; i++) {
    const currentWeek = [];
    while (currentDateThisMonth.getDay() != 6) {
      currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
      currentWeek.push(currentDateThisMonth.getDate());
    }
    currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
    currentWeek.push(currentDateThisMonth.getDate());
    result.thisMonth.push(currentWeek);
  }

  const lastWeek = [];
  while (lastDay.getTime() != currentDateThisMonth.getTime()) {
    currentDateThisMonth.setDate(currentDateThisMonth.getDate() + 1);
    lastWeek.push(currentDateThisMonth.getDate());
  }
  result.thisMonth.push(lastWeek);

  const left = 7 - lastWeek.length;

  for (let i = 1; i < left + 1; i++) {
    result.nextMonth.push(i);
  }

  console.log(result.lastMonth);
  console.log(result.thisMonth);
  console.log(result.nextMonth);
};

// getMonthNumbers(Month.March, 2025);

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
