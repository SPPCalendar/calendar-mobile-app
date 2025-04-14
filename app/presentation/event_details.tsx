import ChevronRight from "@/components/icons/ChevronRight";
import { Colors } from "@/contants/Colors";
import { CalendarEvent } from "@/types/CalendarEvent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import dayjs from "dayjs"
import api from "@/utils/api";

const EventDetails = () => {
  const { event } = useLocalSearchParams();
  const parsedEvent: CalendarEvent = JSON.parse(event as string);
  const router = useRouter();

  const handleEdit = () => {
    console.log("Edit event:", parsedEvent);
    // TODO: Navigate to edit form or open edit modal
    router.push({
      pathname: "/event_forms/new_event_form",
      params: { event: event }
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Підтвердження",
      "Ви впевнені, що хочете видалити цю подію?",
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
              await api.delete(`/events/${parsedEvent.id}`);
              Alert.alert("Успішно", "Подію видалено");
              router.back(); // Go back after deletion
            } catch (error) {
              console.error("Failed to delete event:", error);
              Alert.alert("Помилка", "Не вдалося видалити подію");
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        gap: 10,
        padding: 10,
        backgroundColor: Colors.backgroundColor,
        flex: 1,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <ChevronRight />
      </TouchableOpacity>

      <Text style={[styles.text, { fontWeight: "bold" }]}>
        {parsedEvent.event_name}
      </Text>

      {parsedEvent.description && (
        <Text style={styles.text}>{parsedEvent.description}</Text>
      )}

      <Text style={styles.text}>
        Початок: {dayjs(parsedEvent.start_time).format("DD.MM.YYYY HH:mm")}
      </Text>
      <Text style={styles.text}>
        Кінець: {dayjs(parsedEvent.end_time).format("DD.MM.YYYY HH:mm")}
      </Text>

      <View style={{ gap: 10, marginTop: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Редагувати</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF4D4F" }]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Видалити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { fontFamily: "Montserrat_400Regular", fontSize: 16 },
  button: {
    backgroundColor: Colors.formTopBarBg,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
});

export default EventDetails;
