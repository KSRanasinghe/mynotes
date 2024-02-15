import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { HeadText } from "../components/HeadText";
import { RegularText } from "../components/RegularText";
import { LabelText } from "../components/LabelText";
import { FlatButton } from "../components/FlatButton";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SignIn({ navigation }) {
  // Get details from inputs
  const [getPhone, setPhone] = useState(``);
  const [getPassword, setPassword] = useState(``);
  // Get details from inputs

  const asyncSignIn = async () => {
    try {
      const token = await AsyncStorage.getItem(`token`);
      if (token != null) {
        const tokenData = JSON.parse(token);
        const uid = { uid: tokenData.id };
        navigation.navigate(`Home`, uid);
      }
    } catch (error) {
      console.error(error);
    }
  };

  asyncSignIn();

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`#fff`} barStyle={"dark-content"} />

      <ScrollView>
        {/* Greeting View */}
        <View style={styles.greeting}>
          <HeadText text={`Welcome,`} styles={styles.title} />
          <RegularText
            text={`Sign in to continue!`}
            styles={styles.textRegular}
          />
        </View>
        {/* Greeting View */}

        {/* Forem View */}
        <View style={styles.form}>
          <LabelText text={`Phone Number`} styles={styles.textLabel} />
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            autoFocus={false}
            cursorColor={`#61677a`}
            onChangeText={setPhone}
            placeholder="phone number"
          />
          <LabelText text={`Password`} styles={styles.textLabel} />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            cursorColor={`#61677a`}
            onChangeText={setPassword}
            placeholder="password"
          />
          <FlatButton
            title={`Sign in`}
            custom={styles.btn}
            onPress={() => {
              fetch(`http://192.168.8.166/mynotes_backend/model/SignIn.php`, {
                method: `POST`,
                body: JSON.stringify({
                  phone: getPhone,
                  password: getPassword,
                }),
              })
                .then((response) => {
                  return response.json();
                })
                .then((auth) => {
                  if (auth.message == `success`) {
                    (async () => {
                      try {
                        const token = JSON.stringify(auth.authData);
                        await AsyncStorage.setItem(`token`, token);
                        const uid = { uid: auth.authData.id };
                        navigation.navigate(`Home`, uid);
                      } catch (error) {
                        console.error(error);
                      }
                    })();
                    // navigation.navigate(`Home`);
                  } else if (auth.message == `invalid`) {
                    Alert.alert(`Warning`, `Invalid login credintials!`);
                  } else {
                    Alert.alert(
                      `Warning`,
                      `Please enter your login credintials!`
                    );
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          />
          <View style={styles.linkBox}>
            <Pressable
              style={styles.link}
              onPress={() => {
                navigation.navigate(`SignUp`);
              }}
            >
              <LabelText text={`I'm a new user.`} styles={styles.textLabel} />
              <LabelText text={`Sign Up`} styles={styles.textLink} />
            </Pressable>
          </View>
        </View>
        {/* Forem View */}
      </ScrollView>
    </SafeAreaView>
  );

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    marginVertical: 8,
  },
  textRegular: {
    fontSize: 24,
    color: `#b0b3bd`,
  },
  textLabel: {
    color: `#444855`,
  },
  greeting: {
    alignItems: `flex-start`,
    marginTop: 60,
    marginBottom: 90,
  },
  form: {
    flex: 1,
  },
  input: {
    width: `100%`,
    borderWidth: 1,
    borderColor: `#dfe1e4`,
    borderRadius: 8,
    marginVertical: 10,
    padding: 8,
    fontSize: 18,
    color: `#575a66`,
  },
  btn: {
    marginVertical: 32,
  },
  linkBox: {
    flex: 1,
    justifyContent: `flex-end`,
    alignItems: `center`,
  },
  link: {
    flexDirection: `row`,
  },
  textLink: {
    color: `#4ca18d`,
    marginStart: 5,
  },
});
