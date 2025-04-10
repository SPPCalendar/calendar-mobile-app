import RegisterTopBar from "@/components/TopBars/RegisterTopBar";
import { Colors } from "@/contants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";


export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <RegisterTopBar />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
  