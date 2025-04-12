import React from "react";
import { View } from "react-native";
import MonthTypeDayCell from "./MonthTypeDayCell";

interface Props {
  dates: number[];
  anotherMonthDates?: number[];
  anotherMonthIsNext?: boolean;
}

const SevenDaysRow: React.FC<Props> = ({
  dates,
  anotherMonthDates,
  anotherMonthIsNext,
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {anotherMonthIsNext === false &&
        anotherMonthDates?.map((date, index) => (
          <MonthTypeDayCell date={date} isActive={false} key={index} />
        ))}
      {dates.map((date, index) => (
        <MonthTypeDayCell date={date} isActive={true} key={index} />
      ))}
      {anotherMonthIsNext === true &&
        anotherMonthDates?.map((date, index) => (
          <MonthTypeDayCell date={date} isActive={false} key={index} />
        ))}
    </View>
  );
};

export default SevenDaysRow;
