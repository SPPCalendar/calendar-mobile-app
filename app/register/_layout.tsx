import FormTopBar from "@/components/TopBars/FormTopBar";
import { Colors } from "@/contants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";


export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <FormTopBar title="Реєстрація" />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
  