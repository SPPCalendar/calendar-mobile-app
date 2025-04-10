import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import api from "@/utils/api";
import { useAuthStore } from "@/stores/auth_store";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
  
      const { accessToken } = response.data;
  
      useAuthStore.getState().setAccessToken(accessToken);
  
      console.log("Login successful");
      router.replace("/" as Href);
    } catch (error: any) {
      console.error("Login failed:", error?.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, padding: 24, gap: 16 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={Styles.textInput}
        placeholderTextColor={Colors.textInputPlaceholder}
      />
      <TextInput
        placeholder="Password"
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
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("./register")}>
        <Text style={{ textAlign: "center", color: Colors.formTopBarBg }}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
