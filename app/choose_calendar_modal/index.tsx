import ChevronRight from "@/components/icons/ChevronRight";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCalendarStore } from "@/stores/calendar_store";
import api from "@/utils/api"; // adjust path if needed

interface Calendar {
  id: number;
  calendar_name: string;
}

const ChooseCalendarModal = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const { setCalendarId } = useCalendarStore();
  const router = useRouter();

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await api.get<Calendar[]>("/calendars/me");
        setCalendars(response.data);
      } catch (error: any) {
        console.error("Failed to fetch calendars:", error?.response?.data || error.message);
      }
    };

    fetchCalendars();
  }, []);

  const chooseCalendar = (calendar: Calendar) => {
    setCalendarId(calendar.id);
    console.log("Selected calendar:", calendar);
    router.push("/presentation/day_presentation");
  };

  const createCalendar = () => {
    console.log('create calendar button pressed')
    //router.push("/calendars/create"); // or wherever you want
  };

  return (
    <View style={{ gap: 10, padding: 16 }}>
      <TouchableOpacity onPress={() => router.back()}>
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

      {calendars.map((calendar) => (
        <TouchableOpacity
          onPress={() => chooseCalendar(calendar)}
          key={calendar.id}
        >
          <Text
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 16,
              paddingVertical: 8,
            }}
          >
            {calendar.calendar_name}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={createCalendar}
        style={{
          marginTop: 24,
          backgroundColor: "#007AFF",
          borderRadius: 10,
          padding: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 16, color: "#fff" }}>
          + Create New Calendar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseCalendarModal;
