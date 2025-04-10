import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ email, password });
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
