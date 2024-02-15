import { StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

export function LabelText({ text, styles }) {
  const [fontsLoaded] = useFonts({
    Lato: require("../../assets/fonts/Lato-Regular.ttf"),
  });

  const ui = (
    <Text style={[defaultStyle.label, {fontFamily: `Lato` }, styles]}>{text}</Text>
  );

  if (fontsLoaded) {
    return ui;
  }
}

const defaultStyle = StyleSheet.create({
  label: {
    fontSize: 20,
  }
});
