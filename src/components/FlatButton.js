import { Pressable, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

export function FlatButton({ title, onPress, custom }) {
  const [fontsLoaded] = useFonts({
    LatoBold: require("../../assets/fonts/Lato-Bold.ttf"),
  });

  const ui = (
    <Pressable onPress={onPress} 
    style={({pressed}) => [custom, styles.button, pressed && {opacity: 0.8}]}>
      <Text style={[styles.text, {fontFamily: `LatoBold` }]}>{title}</Text>
    </Pressable>
  );

  if (fontsLoaded) {
    return ui;
  }
}

const styles = StyleSheet.create({
    button:{
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: `#62ad9b`
    },
    text: {
        fontSize: 22,
        textTransform: `uppercase`,
        textAlign: `center`,
        color: `#fff`
    }
});