import FormTopBar from "@/components/TopBars/FormTopBar";
import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const create = () => {
  const colors = ["#00F400", "#867759", "#098800", "#048921"];
  const [text, onChangeText] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [users, setUsers] = useState<string[]>([]);
  const [user, setUser] = useState("");

  const addUser = (user: string) => {
    setUsers([...users, user]);
  };

  const handleCreateCalendar = async () => {
    // if (!calendarId) {
    //   console.warn("No calendar selected");
    //   return;
    // }
    // try {
    //   const requestBody = {
    //     event_name: text,
    //     start_time: startDate.toISOString(),
    //     end_time: endDate.toISOString(),
    //     color: "#007AFF", // Static for now; could come from category later
    //     calendar_id: calendarId,
    //   };
    //   console.log("Creating event with data:", requestBody);
    //   const response = await api.post("/events", requestBody);
    //   console.log("Event successfully created:", response.data);
    //   // Navigate to another screen after creating the event
    //   router.push("/presentation/day_presentation");
    // } catch (error: any) {
    //   console.error(
    //     "Failed to create event:",
    //     error?.response?.data || error.message
    //   );
    //   alert("Не вдалося створити подію. Спробуйте ще раз.");
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <FormTopBar title="Нова подія" />
      <View
        style={{ flex: 1, backgroundColor: Colors.backgroundColor, gap: 10 }}
      >
        <TextInput
          style={[Styles.textInput, Styles.textInputText, { marginTop: 38 }]}
          placeholderTextColor={Colors.textInputPlaceholder}
          onChangeText={onChangeText}
          value={text}
          placeholder="Назва"
        />

        <Picker
          style={{
            backgroundColor: color,
            width: "50%",
            marginInline: "auto",
          }}
          selectedValue={color}
          onValueChange={(itemValue) => setColor(itemValue)}
        >
          {colors.map((color) => (
            <Picker.Item
              style={{ backgroundColor: color }}
              label={color}
              value={color}
            />
          ))}
        </Picker>

        <TextInput
          style={[Styles.textInput, Styles.textInputText, { marginTop: 38 }]}
          placeholderTextColor={Colors.textInputPlaceholder}
          onChangeText={setUser}
          value={user}
          placeholder="Додати користувач/ку"
        />
        <Button
          title="Додати"
          onPress={() => {
            addUser(user);
            setUser("");
          }}
        ></Button>

        {users.map((user) => (
          <Text>{user}</Text>
        ))}

        <TouchableOpacity
          style={{
            backgroundColor: Colors.formTopBarBg,
            paddingVertical: 16,
            borderRadius: 30,
            alignItems: "center",
          }}
          onPress={handleCreateCalendar}
        >
          <Text style={[Styles.textInputText, { color: "#fff" }]}>
            Створити календар
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default create;
