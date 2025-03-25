import TopBar from "@/components/TopBar";
import { Stack } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ marginInline: 20 }}>
      <TopBar />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
