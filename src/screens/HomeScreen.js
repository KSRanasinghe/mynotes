import {
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { FlatButton } from "../components/FlatButton";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import { LabelText } from "../components/LabelText";

export function Home({ navigation, route }) {
  const uid = { uid: route.params.uid };
  const user = route.params.uid;

  const [getNoteCount, setNoteCount] = useState(0);
  const [getNoteList, setNoteList] = useState([]);
  useEffect(() => {
    /* Retrieve notes data */
    navigation.addListener(`focus`, () => {
      fetch(`http://192.168.8.166/mynotes_backend/model/GetNoteList.php`, {
        method: `POST`,
        body: JSON.stringify({
          uid: user,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((list) => {
          setNoteCount(list.count);
          if (parseInt(list.count) > 0) {
            const noteLists = JSON.stringify(list.listData.notes);
            const notes = JSON.parse(noteLists);
            setNoteList(notes);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
    /* Retrieve notes data */

    /*Prevent Go Back*/
    const beforeRemoveListener = navigation.addListener(`beforeRemove`, (e) => {
      e.preventDefault();
      BackHandler.exitApp();
    });

    return () => beforeRemoveListener();
    /*Prevent Go Back*/
  }, [navigation]);

  const ui =
    getNoteCount >= 1 ? (
      <SafeAreaView style={defaultStyles.container}>
        <StatusBar backgroundColor={`#fff`} barStyle={"dark-content"} />

        {/* Button Box */}
        <View style={defaultStyles.btnBox}>
          <FlatButton
            title={`New Note`}
            onPress={() => navigation.navigate(`NewNote`, uid)}
          />
        </View>
        {/* Button Box */}

        {/* Notes */}
        <FlatList
          style={defaultStyles.listView}
          keyExtractor={(item) => item.id}
          refreshing={true}
          data={getNoteList}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              description={item.description}
              uri={item.uri}
              date={item.date}
            />
          )}
        />
        {/* Notes */}
      </SafeAreaView>
    ) : (
      <SafeAreaView style={defaultStyles.container}>
        <StatusBar backgroundColor={`#fff`} barStyle={"dark-content"} />

        {/* Button Box */}
        <View style={defaultStyles.btnBox}>
          <FlatButton
            title={`New Note`}
            onPress={() => navigation.navigate(`NewNote`, uid)}
          />
        </View>
        {/* Button Box */}

        {/* No note view */}
        <View style={defaultStyles.emptyBox}>
          <Image
            source={{
              uri: `https://cdn-icons-png.flaticon.com/128/2959/2959016.png`,
            }}
            style={defaultStyles.icon}
          />
          <LabelText
            text={`You don't have added any note yet.`}
            styles={defaultStyles.labelText}
          />
        </View>
        {/* No note view */}
      </SafeAreaView>
    );

  return ui;
}

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 16,
  },
  btnBox: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 80,
  },
  emptyBox: {
    flex: 1,
    paddingTop: 150,
    alignItems: `center`,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    marginRight: 12,
    resizeMode: `cover`,
    marginBottom: 15,
  },
  labelText: {
    color: `#b0b3bd`,
  },
  listView: {
    marginVertical: 12,
    borderTopWidth: 0.8,
    borderColor: `#dfe1e4`,
  },
});
