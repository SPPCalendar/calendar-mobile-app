import FormTopBar from "@/components/TopBars/FormTopBar";
import { calendarColors, Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "@/utils/api";
import { router, useLocalSearchParams } from "expo-router";
import { getCurrentUsername } from "@/utils/authTokenHelper";
import { Calendar } from "@/types/Calendar";

const create = () => {
  const { calendar } = useLocalSearchParams();
  const parsedCalendar: Calendar | null = calendar
    ? JSON.parse(calendar as string)
    : null;

  const [text, onChangeText] = useState("");
  const [color, setColor] = useState(calendarColors[0]);
  const [users, setUsers] = useState<string[]>([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (parsedCalendar) {
      onChangeText(parsedCalendar.calendar_name);
      setColor(parsedCalendar.color);

      // Extracting usernames from the parsed calendar's users
      // Omit the current user from the list
      const currentUsername = getCurrentUsername();
      const filteredUsers = parsedCalendar.users
        .filter((u) => u.user.username !== currentUsername)
        .map((u) => u.user.username);

      setUsers(filteredUsers);
    }
  }, []);

  const addUser = (user: string) => {
    setUsers([...users, user]);
  };

  const handleCreateCalendar = async () => {
    const currentUsername = getCurrentUsername();
    if (!currentUsername) {
      alert("Користувач/ку не знайдено.");
      return;
    }

    try {
      const requestBody = {
        calendar_name: text,
        color,
        users: [
          { username: currentUsername, access_level: "owner" },
          ...users.map((username) => ({
            username,
            access_level: "owner",
          })),
        ],
      };

      console.log("Submitting calendar with data:", requestBody);

      const response = parsedCalendar
        ? await api.put(`/calendars/${parsedCalendar.id}`, requestBody)
        : await api.post("/calendars", requestBody);

      console.log(
        parsedCalendar
          ? "Calendar successfully updated:"
          : "Calendar successfully created:",
        response.data
      );

      // Navigate back or forward after successful creation
      router.back();
    } catch (error: any) {
      console.error(
        "Error creating calendar:",
        error?.response?.data || error.message
      );
      alert("Не вдалося створити календар. Спробуйте ще раз.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <FormTopBar
        title={parsedCalendar ? "Зміна календарю" : "Новий календар"}
      />
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
          {calendarColors.map((color) => (
            <Picker.Item
              key={color}
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

        {users.map((user, i) => (
          <Text key={i}>{user}</Text>
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
            {parsedCalendar ? "Зберегти зміни" : "Створити календар"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default create;
