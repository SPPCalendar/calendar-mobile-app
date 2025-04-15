import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import api from "@/utils/api";
import { useAuthStore } from "@/stores/auth_store";
import { useCalendarStore } from "@/stores/calendar_store";
import { getCurrentUsername } from "@/utils/authTokenHelper";
import { ActivityIndicator } from "react-native";

const RegisterForm = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Неправильний формат електронної пошти");
      return false;
    }
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (password != confirmPassword) {
      alert("Пароль не підтверджено, спробуйте ще раз");
      return false;
    }

    if (password.length < 6) {
      alert("Пароль має бути не менше 6 символів");
      return false;
    }

    if (!/[a-zA-Z]/.test(password)) {
      alert("Пароль має містити хоча б одну букву");
      return false;
    }

    if (!/\d/.test(password)) {
      alert("Пароль має містити хоча б одну цифру");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    try {
      if (!validateEmail(email) || !validatePassword(password)) {
        return;
      }

      setLoading(true);
      const response = await api.post("/auth/register", {
        display_name: displayName,
        username,
        email,
        password,
      });

      const { accessToken, userId } = response.data;

      useAuthStore.getState().setAccessToken(accessToken);
      const calendarRes = await api.post(
        "/calendars",
        {
          calendar_name: "Default Calendar",
          color: "#123456",
          users: [
            {
              username: getCurrentUsername(),
              access_level: "owner",
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const newCalendarId = calendarRes.data.id;
      useCalendarStore.getState().setCalendarId(newCalendarId);

      router.replace("/" as Href);
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error?.response?.data || error.message
      );
      alert("Не вдалося зареєструватися. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
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
      <TextInput
        placeholder="Ім'я для відображення"
        value={displayName}
        onChangeText={setDisplayName}
        style={Styles.textInput}
        placeholderTextColor={Colors.textInputPlaceholder}
      />
      <TextInput
        placeholder="Ім'я користувача"
        value={username}
        onChangeText={setUsername}
        style={Styles.textInput}
        placeholderTextColor={Colors.textInputPlaceholder}
        autoCapitalize="none"
      />
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
      <TextInput
        placeholder="Підтвердити пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={Styles.textInput}
        placeholderTextColor={Colors.textInputPlaceholder}
      />

      <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 14 }}>
        Пароль має бути не менше 6 символів, містити хоча б одну букву та хоча б
        одну цифру
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.formTopBarBg,
          paddingVertical: 16,
          borderRadius: 30,
          alignItems: "center",
          opacity: loading ? 0.6 : 1,
        }}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 18 }}>Зареєструватись</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("./login")}>
        <Text style={{ textAlign: "center", color: Colors.formTopBarBg }}>
          Вже маєте акаунт? Увійти
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
