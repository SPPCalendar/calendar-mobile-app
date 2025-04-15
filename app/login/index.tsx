import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import api from "@/utils/api";
import { useAuthStore } from "@/stores/auth_store";
import { useCalendarStore } from "@/stores/calendar_store";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      
      const response = await api.post("/auth/login", {
        email,
        password,
      });
  
      const { accessToken } = response.data;
  
      useAuthStore.getState().setAccessToken(accessToken);

      // Fetch user's calendars
      const calendarsResponse = await api.get('/calendars/me');

      const calendars = calendarsResponse.data;

      // Find "Default calendar"
      const defaultCalendar = calendars.find(
        (calendar: any) => calendar.calendar_name === "Default Calendar"
      );

      if (defaultCalendar) {
        useCalendarStore.getState().setCalendarId(defaultCalendar.id);
      } else {
        console.warn("Default Calendar for user not found");
      }
  
      console.log("Login successful");
      router.replace("/" as Href);
    } catch (error: any) {
      console.error("Login failed:", error?.response?.data || error.message);
      alert("Невірний логін або пароль. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, padding: 24, gap: 16 }}>
      <TextInput
        placeholder="Електронна пошта"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={Styles.textInput}
        placeholderTextColor={Colors.textInputPlaceholder}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.textInput}
        placeholderTextColor={Colors.textInputPlaceholder}
      />

      <TouchableOpacity
        style={{
          backgroundColor: Colors.formTopBarBg,
          paddingVertical: 16,
          borderRadius: 30,
          alignItems: "center",
          opacity: loading ? 0.6 : 1,
        }}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
        <Text style={{ color: "#fff", fontSize: 18 }}>Увійти</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("./register")}>
        <Text style={{ textAlign: "center", color: Colors.formTopBarBg }}>
          Не маєте акаунт? Реєстрація
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
