import ChevronRight from "@/components/icons/ChevronRight";
import { Colors } from "@/contants/Colors";
import { CalendarEvent } from "@/types/CalendarEvent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const event_details = () => {
  const { event } = useLocalSearchParams();
  const parsedEvent: CalendarEvent = JSON.parse(event as string);
  const router = useRouter();

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
      <Text style={styles.text}>Початок: {parsedEvent.start_time}</Text>
      <Text style={styles.text}>Кінець: {parsedEvent.end_time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { fontFamily: "Montserrat_400Regular", fontSize: 16 },
});

export default event_details;
