import ChevronRight from "@/components/icons/ChevronRight";
import { Colors } from "@/contants/Colors";
import { CalendarEvent } from "@/types/CalendarEvent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import dayjs from "dayjs"

const EventDetails = () => {
  const { event } = useLocalSearchParams();
  const parsedEvent: CalendarEvent = JSON.parse(event as string);
  const router = useRouter();

  const handleEdit = () => {
    console.log("Edit event:", parsedEvent);
    // TODO: Navigate to edit form or open edit modal
    alert("Редагування ще не реалізовано");
  };

  const handleDelete = () => {
    console.log("Delete event:", parsedEvent);
    // TODO: Implement deletion logic
    Alert.alert("Видалення події", "Цю функцію ще не реалізовано");
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
