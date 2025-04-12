import ChevronRight from "@/components/icons/ChevronRight";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const choose_calendar_modal = () => {
  const calendars = ["1 calendar", "2 calendar", "3 calendar"];
  const router = useRouter();

  const chooseCalendar = (c: string) => {
    console.log("chose calendar " + c);
  };

  return (
    <View style={{ gap: 10, padding: 16 }}>
      <TouchableOpacity
        onPress={() => router.push("/presentation/day_presentation")}
      >
        <ChevronRight />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 20,
          textAlign: "center",
          paddingBottom: 16,
        }}
      >
        Choose a calendar
      </Text>
      {calendars.map((c, index) => (
        <TouchableOpacity onPress={() => chooseCalendar(c)} key={index}>
          <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 16 }}>
            {c}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default choose_calendar_modal;
