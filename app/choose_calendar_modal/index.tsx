import ChevronRight from "@/components/icons/ChevronRight";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCalendarStore } from "@/stores/calendar_store";
import api from "@/utils/api"; // adjust path if needed
import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";

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
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, padding: 24, gap: 16 }}>

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
              style={Styles.textInput}
              onPress={createCalendar}
            >
              <Text style={Styles.textInputText}>+ Створити календар</Text>
            </TouchableOpacity>
    </View>
  );
};

export default ChooseCalendarModal;
