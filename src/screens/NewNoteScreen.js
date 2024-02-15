import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LabelText } from "../components/LabelText";
import { DropDown } from "../components/DropDown";
import { FlatButton } from "../components/FlatButton";
import { useEffect, useState } from "react";

export function NewNote({ navigation, route }) {
  const uid = route.params.uid;

  // uid for home
  const nuid = {uid:route.params.uid};
  // uid for home

  // Get details from text input
  const [getTitle, setTitle] = useState(``);
  const [getDescription, setDescription] = useState(``);
  const [getNtype, setNtype] = useState(0);
  // Get details from text input

  // Get note types from db and load
  const [getNoteTypes, setNoteTypes] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.8.166/mynotes_backend/model/GetNoteDetails.php`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const noteTypeOptions = data.map((item) => ({
          key: item.id,
          value: item.ntype,
        }));
        setNoteTypes(noteTypeOptions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // Get note types from db and load

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`#fff`} barStyle={"dark-content"} />

      <ScrollView>
        {/* Forem View */}
        <View style={styles.form}>
          <LabelText text={`Title`} styles={styles.textLabel} />
          <TextInput
            style={styles.input}
            keyboardType="default"
            cursorColor={`#61677a`}
            onChangeText={(val) => setTitle(val)}
            placeholder="title"
          />
          <LabelText text={`Description`} styles={styles.textLabel} />
          <TextInput
            style={styles.input}
            keyboardType="default"
            cursorColor={`#61677a`}
            onChangeText={(val) => setDescription(val)}
            multiline={true}
            placeholder="description"
          />
          <LabelText text={`Note Type`} styles={styles.textLabel} />
          <DropDown
            resultList={getNoteTypes}
            placeholder={`select note type`}
            onSelected={(selectedValue) => {
              setNtype(selectedValue);
            }}
          />
          <FlatButton
            title={`add new note`}
            custom={styles.btn}
            onPress={() => {
              fetch(`http://192.168.8.166/mynotes_backend/model/AddNote.php`, {
                method: `POST`,
                body: JSON.stringify({
                  title: getTitle,
                  description: getDescription,
                  ntype: getNtype,
                  uid: uid,
                }),
              })
                .then((response) => {
                  return response.json();
                })
                .then((note) => {
                  if (note.message == `success`) {
                    Alert.alert(`Success`, `Note been successfully added!`, [
                      {
                        onPress: () => {
                          navigation.navigate(`Home`, nuid);
                        },
                      },
                    ]);
                  } else if (note.message == `error`) {
                    Alert.alert(
                      `Error`,
                      `Something went wrong! Please try again later.`
                    );
                  } else {
                    Alert.alert(`Warning`, `Please fill all mandatory fields!`);
                  }
                })
                .catch((error) => {
                  console.error(error.message);
                });
            }}
          />
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
  textLabel: {
    color: `#444855`,
  },
  form: {
    flex: 1,
    paddingVertical: 25,
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
});
