import { Colors } from "@/contants/Colors";
import { Styles } from "@/contants/Styles";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import api from "@/utils/api";
import { useAuthStore } from "@/stores/auth_store";
import { useCalendarStore } from "@/stores/calendar_store";

const Profile = () => {
  const router = useRouter();
  const handleLogout = async () => {
    useAuthStore.getState().logout();
    useCalendarStore.getState().clearCalendarId();
    router.replace("/" as Href);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor, padding: 24, gap: 16 }}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.formTopBarBg,
          paddingVertical: 16,
          borderRadius: 30,
          alignItems: "center",
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Вийти з акаунту</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
