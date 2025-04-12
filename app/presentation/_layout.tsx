import AddEventButton from "@/components/AddEventButton";
import TopBar from "@/components/TopBars/TopBar";
import { Colors } from "@/contants/Colors";
import { Href, router, Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { useAuthStore } from "@/stores/auth_store";

export default function RootLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const handleAddEventButtonPress = () => {
    if (!accessToken) {
      router.push("/login" as Href);
      return;
    }

    router.push("/event_forms/new_event_form" as Href);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <TopBar />
      <Stack screenOptions={{ headerShown: false }} />
      <AddEventButton onPress={handleAddEventButtonPress} />
    </SafeAreaView>
  );
}
