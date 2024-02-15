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
import { DropDown } from "../components/DropDown";
import { useEffect, useState } from "react";

export function SignUp({ navigation }) {
  // Get details from text input
  const [getFname, setFname] = useState(``);
  const [getLname, setLname] = useState(``);
  const [getUtype, setUtype] = useState(0);
  const [getPhone, setPhone] = useState(``);
  const [getPassword, setPassword] = useState(``);
  // Get details from text input

  // Get user types from db and load
  const [getUserTypes, setUserTypes] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.8.166/mynotes_backend/model/GetUserDetails.php`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const userTypeOptions = data.map((item) => ({
          key: item.id,
          value: item.utype,
        }));
        setUserTypes(userTypeOptions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // Get user types from db and load

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`#fff`} barStyle={"dark-content"} />

      <ScrollView>
        {/* Greeting View */}
        <View style={styles.greeting}>
          <HeadText text={`Create Account,`} styles={styles.title} />
          <RegularText
            text={`Sign up to get started!`}
            styles={styles.textRegular}
          />
        </View>
        {/* Greeting View */}

        {/* Forem View */}
        <View style={styles.form}>
          <LabelText text={`First Name`} styles={styles.textLabel} />
          <TextInput
            style={styles.input}
            keyboardType="default"
            cursorColor={`#61677a`}
            onChangeText={(val) => setFname(val)}
            placeholder="first name"
          />
          <LabelText text={`Last Name`} styles={styles.textLabel} />
          <TextInput
            style={styles.input}
            keyboardType="default"
            cursorColor={`#61677a`}
            onChangeText={(val) => setLname(val)}
            placeholder="last name"
          />
          <LabelText text={`User Type`} styles={styles.textLabel} />
          <DropDown
            resultList={getUserTypes}
            placeholder={`select user type`}
            onSelected={(selectedValue) => {
              setUtype(selectedValue);
            }}
          />
          <LabelText text={`Phone Number`} styles={styles.textLabel} />
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            cursorColor={`#61677a`}
            onChangeText={(val) => setPhone(val)}
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
            onChangeText={(val) => setPassword(val)}
            placeholder="password"
          />
          <FlatButton
            title={`Sign up`}
            custom={styles.btn}
            onPress={() => {
              fetch(`http://192.168.8.166/mynotes_backend/model/SignUp.php`, {
                method: `POST`,
                body: JSON.stringify({
                  fname: getFname,
                  lname: getLname,
                  utype: getUtype,
                  phone: getPhone,
                  password: getPassword,
                }),
              })
                .then((response) => {
                  return response.json();
                })
                .then((user) => {
                  if (user.message == `success`) {
                    Alert.alert(
                      `Success`,
                      `Your account has been successfully created!`,
                      [
                        {
                          onPress: () => {
                            navigation.navigate(`SignIn`);
                          },
                        },
                      ]
                    );
                  } else if (user.message == `exist`) {
                    Alert.alert(
                      `Warning`,
                      `Entered phone number is already exists!`
                    );
                  } else if (user.message == `error`) {
                    Alert.alert(
                      `Error`,
                      `Something went wrong! Please try again later.`
                    );
                  } else if (user.message == `phone`) {
                    Alert.alert(`Warning`, `Invalid phone number!`);
                  } else if (user.message == `password`) {
                    Alert.alert(
                      `Warning`,
                      `Please make sure your password contains with uppercase, lowercase and number!`
                    );
                  } else {
                    Alert.alert(`Warning`, `Please fill all mandatory fields!`);
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
                navigation.navigate(`SignIn`);
              }}
            >
              <LabelText
                text={`I'm already a member.`}
                styles={styles.textLabel}
              />
              <LabelText text={`Sign In`} styles={styles.textLink} />
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
