import { Text } from "react-native";
import { useFonts } from "expo-font";

export function RegularText({ text, styles }) {
  const [fontsLoaded] = useFonts({
    Lato: require("../../assets/fonts/Lato-Regular.ttf"),
  });

  const ui = <Text style={[styles, { fontFamily: `Lato` }]}>{text}</Text>;

  if (fontsLoaded) {
    return ui;
  }
}
