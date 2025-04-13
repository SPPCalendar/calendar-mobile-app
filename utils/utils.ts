// import { Month } from "@/enums/Month";

import dayjs from "dayjs";

import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
import isLeapYear from "dayjs/plugin/isLeapYear";

dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

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

export const getMonthStartEndWeeks = (
  month: Month, // 1-indexed
  year: number
) => {
  const dayjsMonth = dayjs()
    .year(year)
    .month(month - 1); // month - 1 because dayjs is 0 indexed

  const startOfMonth = dayjsMonth.startOf("month");
  const endOfMonth = dayjsMonth.endOf("month");

  let startWeekNumber = startOfMonth.isoWeek();
  let endWeekNumber = endOfMonth.isoWeek();

  return { startWeekNumber, endWeekNumber };
};

export const getWeekDates = (weekNumber: number, year: number) => {
  const startOfWeek = dayjs().year(year).isoWeek(weekNumber).startOf("isoWeek");

  // Generate all 7 days (Mon–Sun)
  const days: dayjs.Dayjs[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(startOfWeek.add(i, "day"));
  }

  return days;
};

export const getMonthDates = (month: Month, year: number): dayjs.Dayjs[][] => {
  const { startWeekNumber, endWeekNumber } = getMonthStartEndWeeks(month, year);

  const weeks: dayjs.Dayjs[][] = [];

  const totalWeeksThisYear = dayjs().year(year).isoWeeksInYear();
  const crossingToNextYear = endWeekNumber === 1 && month === Month.December;

  const finalWeek = crossingToNextYear ? totalWeeksThisYear : endWeekNumber;

  // Weeks of current year
  for (let week = startWeekNumber; week <= finalWeek; week++) {
    const weekDays = getWeekDates(week, year);
    weeks.push(weekDays);
  }

  // Week 1 of next year
  if (crossingToNextYear) {
    const firstWeekNextYear = getWeekDates(1, year + 1);
    weeks.push(firstWeekNextYear);
  }

  return weeks;
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

export const getUkrainianMonthName = (monthIndex: number): string => {
  const date = new Date(2025, monthIndex - 1, 1);
  const formatter = new Intl.DateTimeFormat("uk-UA", { month: "long" });
  return capitalize(formatter.format(date));
};


export const getMonthNameFromWeek = (weekNumber: number): string => {
  // get first day of the week
  const firstDayOfWeek = dayjs().isoWeek(weekNumber).startOf("isoWeek");
  const formatter = new Intl.DateTimeFormat("uk-UA", { month: "long" });
  return capitalize(formatter.format(firstDayOfWeek.toDate()));
}