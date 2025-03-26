import TopBar from "@/components/TopBar";
import { Colors } from "@/contants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <View style={{ flex: 1, marginInline: 20 }}>
        <TopBar />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </View>
    </SafeAreaView>
  );
}
