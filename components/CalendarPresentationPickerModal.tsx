import React from "react";
import { View } from "react-native";
import RadioButtonItem from "./RadioButtonItem";
import { Colors } from "@/contants/Colors";
import { useCalendarPresentationStore } from "@/stores/calendar_presentation_store";
import { CalendarPresentation } from "@/types/CalendarPresentation";
import { useOpacityStore } from "@/stores/opacity_store";
import { useModalStore } from "@/stores/modal_store";
import { useRouter } from "expo-router";

const CalendarPresentationPickerModal = () => {
  const router = useRouter();
  const makeOpaque = useOpacityStore((state) => state.makeOpaque);
  const presentation = useCalendarPresentationStore(
    (state) => state.presentation
  );
  const changePresentation = useCalendarPresentationStore(
    (state) => state.changePresentation
  );
  const changeModalShown = useModalStore((state) => state.changeModalShown);
  const shown = useModalStore((state) => state.shown);

  const onPress = (presentation: CalendarPresentation) => {
    changePresentation(presentation);
    makeOpaque();
    changeModalShown(false);

    switch (presentation) {
      case CalendarPresentation.Day:
        router.replace("/presentation/day_presentation");
        break;
      case CalendarPresentation.Week:
        router.replace("/presentation/week_presentation");
        break;
      case CalendarPresentation.Month:
        router.replace("/presentation/month_presentation");
        break;
      case CalendarPresentation.Year:
        router.replace("/presentation/year_respresentation");
        break;
    }
  };

  return (
    <View style={{ position: "absolute", width: "100%", height: "100%" }}>
      {shown && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: Colors.textInputBg,
              marginInline: 33,
              padding: 24,
              borderRadius: 20,
              gap: 18,
            }}
          >
            <View style={{ gap: 18 }}>
              <RadioButtonItem
                label="День"
                selected={presentation == CalendarPresentation.Day}
                onPress={() => onPress(CalendarPresentation.Day)}
              />
              <RadioButtonItem
                label="Тиждень"
                selected={presentation == CalendarPresentation.Week}
                onPress={() => onPress(CalendarPresentation.Week)}
              />
              <RadioButtonItem
                label="Місяць"
                selected={presentation == CalendarPresentation.Month}
                onPress={() => onPress(CalendarPresentation.Month)}
              />
              <RadioButtonItem
                label="Рік"
                selected={presentation == CalendarPresentation.Year}
                onPress={() => onPress(CalendarPresentation.Year)}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CalendarPresentationPickerModal;
