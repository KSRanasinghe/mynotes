import { useFonts } from "expo-font";
import { Image, StyleSheet, Text, View } from "react-native";

export function Card({ title, description, uri, date }) {
  const [fontsLoaded] = useFonts({
    LatoBold: require("../../assets/fonts/Lato-Bold.ttf"),
    Lato: require("../../assets/fonts/Lato-Regular.ttf"),
  });

  const ui = (
    <View style={defaultStyles.card}>
      <View style={defaultStyles.cardBody}>
        <Image source={{ uri: `${uri}` }} style={defaultStyles.cardAvatar} />
        <View style={defaultStyles.cardDetail}>
          <Text style={[defaultStyles.title, { fontFamily: `LatoBold` }]}>
            {title}
          </Text>
          <Text style={[defaultStyles.description, { fontFamily: `Lato` }]}>
            {description}
          </Text>
          <Text style={[defaultStyles.date, { fontFamily: `Lato` }]}>
            {date}
          </Text>
        </View>
      </View>
    </View>
  );

  if (fontsLoaded) {
    return ui;
  }
}

const defaultStyles = StyleSheet.create({
  card: {
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomWidth: .8,
    borderColor: `#dfe1e4`,
    backgroundColor: `#fff`,
  },
  cardBody: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`,
  },
  cardDetail: {
    flex: 1,
    flexDirection: `column`,
    flexShrink: 1
  },
  cardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: .5,
    borderColor: `#b0b3bd`,
    marginRight: 12,
    resizeMode: `cover`
  },
  title: {
    fontSize: 22,
    color: `#61677a`,
    textTransform: `uppercase`,
  },
  description: {
    fontSize: 20,
    color: `#a0a4af`,
    marginTop: 5,
    textAlign: `left`
  },
  date: {
    fontSize: 16,
    color: `#818595`,
    marginTop: 20,
    textAlign: `right`
  }
});
