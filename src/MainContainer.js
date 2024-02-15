import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SignIn } from "./screens/SignInScreen";
import { SignUp } from "./screens/SignUpScreen";
import { Home } from "./screens/HomeScreen";
import { NewNote } from "./screens/NewNoteScreen";
import { FlatSignOut } from "./components/FlatSignOut";

const Stack = createNativeStackNavigator();

export function MainContainer() {
  const [fontsLoaded] = useFonts({
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });

  const ui = (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            headerBackVisible: false,
            title: `My Notes`,
            headerTitleStyle: {
              fontFamily: `LatoBold`,
              fontSize: 24,
            },
            headerRight: () => (
              <FlatSignOut onPress={true}/>
            ),
          }}
        />
        <Stack.Screen
          name="NewNote"
          component={NewNote}
          options={{
            headerShown: true,
            headerBackVisible: true,
            title: `Add New Note`,
            headerTitleStyle: {
              fontFamily: `LatoBold`,
              fontSize: 24,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  if (fontsLoaded) {
    return ui;
  }
}
