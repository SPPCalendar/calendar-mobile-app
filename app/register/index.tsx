import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";

const RegisterForm = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log({ displayName, username, email, password });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, padding: 24, gap: 16 }}>
      <TextInput
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        style={Styles.textInput}
        placeholderTextColor={Colors.textInputPlaceholder}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={Styles.textInput}
        placeholderTextColor={Colors.textInputPlaceholder}
      />
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
        onPress={handleRegister}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("./login")}>
        <Text style={{ textAlign: "center", color: Colors.formTopBarBg }}>
          Already have an account? Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
