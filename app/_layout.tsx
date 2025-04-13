import { Colors } from "@/contants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import AppLoading from "@/components/AppLoading";
import { useOpacityStore } from "@/stores/opacity_store";
import CalendarPresentationPickerModal from "@/components/CalendarPresentationPickerModal";
import { MenuProvider } from "react-native-popup-menu";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function RootLayout() {
  const opacity = useOpacityStore((state) => state.opacity);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <MenuProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.backgroundColor }}
      >
        <View style={{ flex: 1, marginInline: 20, opacity: opacity }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="login"
              options={{
                presentation: "modal",
              }}
            />
          </Stack>
        </View>
        <CalendarPresentationPickerModal />
      </SafeAreaView>
    </MenuProvider>
  );
}
