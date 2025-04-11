import AddEventButton from "@/components/AddEventButton";
import TopBar from "@/components/TopBars/TopBar";
import { Colors } from "@/contants/Colors";
import { Href, router, Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <TopBar />
      <Stack screenOptions={{ headerShown: false }} />
      <AddEventButton onPress={() => router.push('/event_forms/new_event_form' as Href)} />
      
    </SafeAreaView>
  );
}
