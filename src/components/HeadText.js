import { Text } from "react-native";
import { useFonts } from "expo-font";

export function HeadText({ text, styles }) {
  const [fontsLoaded] = useFonts({
    LatoBold: require("../../assets/fonts/Lato-Bold.ttf"),
  });

  const ui = (
    <Text style={[{ fontSize: 40, fontFamily: `LatoBold`}, styles]}>
      {text}
    </Text>
  );

  if (fontsLoaded) {
    return ui;
  }
}
