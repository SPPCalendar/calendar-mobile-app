import FormTopBar from "@/components/TopBars/FormTopBar";
import { Colors } from "@/contants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function RootLayout() {
  const { event } = useLocalSearchParams();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundColor,
      }}
    >
      <FormTopBar
        title={event != undefined ? "Редагувати подію" : "Нова подія"}
      />
      <View style={{ flex: 1, marginInline: 16 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaView>
  );
}
