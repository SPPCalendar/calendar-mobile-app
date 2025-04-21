import ChevronRight from "@/components/icons/ChevronRight";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useCalendarStore } from "@/stores/calendar_store";
import api from "@/utils/api"; // adjust path if needed
import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import CheckBigIcon from "@/components/icons/CheckBigIcon";
import MoreVerticalIcon from "@/components/icons/MoreVerticalIcon";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Calendar } from "@/types/Calendar";

const ChooseCalendarModal = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const { calendarId, setCalendarId } = useCalendarStore();
  const router = useRouter();

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await api.get<Calendar[]>("/calendars/me");
        setCalendars(response.data);
      } catch (error: any) {
        console.error(
          "Failed to fetch calendars:",
          error?.response?.data || error.message
        );
      }
    };

    fetchCalendars();
  }, [calendars]);

  const chooseCalendar = (calendar: Calendar) => {
    setCalendarId(calendar.id);
    console.log("Selected calendar:", calendar);
  };

  const createCalendar = () => {
    console.log("create calendar button pressed");
    router.push("/calendars/create"); // or wherever you want
  };

  const goToEditForm = (calendar: Calendar) => {
    router.push({
      pathname: "/calendars/create",
      params: { calendar: JSON.stringify(calendar) },
    });
  };

  const handleDelete = (calendar: Calendar) => {
    Alert.alert(
      "Підтвердження",
      "Ви впевнені, що хочете видалити цей календар?",
      [
        {
          text: "Скасувати",
          style: "cancel",
        },
        {
          text: "Видалити",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/calendars/${calendar.id}`);
              Alert.alert("Успішно", "Календар видалено");
            } catch (error) {
              console.error("Failed to delete calendar:", error);
              Alert.alert("Помилка", "Не вдалося видалити календар");
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        padding: 24,
        gap: 16,
      }}
    >
      {calendars.map((calendar) => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
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

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {calendarId == calendar.id && <CheckBigIcon stroke="blue" />}

            <Menu>
              <MenuTrigger onPress={() => console.log("hi")}>
                <MoreVerticalIcon />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => goToEditForm(calendar)}>
                  <Text
                    style={{
                      fontFamily: "Montserrat_400Regular",
                      fontSize: 16,
                      color: "blue",
                    }}
                  >
                    Редагувати
                  </Text>
                </MenuOption>
                <MenuOption onSelect={() => handleDelete(calendar)}>
                  <Text
                    style={{
                      fontFamily: "Montserrat_400Regular",
                      fontSize: 16,
                      color: "red",
                    }}
                  >
                    Видалити
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={Styles.textInput} onPress={createCalendar}>
        <Text style={Styles.textInputText}>+ Створити календар</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseCalendarModal;
