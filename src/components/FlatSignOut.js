import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Pressable } from "react-native";

export function FlatSignOut({ onPress }) {
  const navigation = useNavigation();
  const [getConfirmation, setConfirmation] = useState(false);

  const signOut = () => {
    if (getConfirmation) {
      Alert.alert(`Confirmation`, `Are you sure you want to sign out?`, [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(`token`);
              navigation.navigate(`SignIn`);
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]);
    }
  };

  const ui = (
    <Pressable
      onPress={() => {
        setConfirmation(onPress);
        signOut();
      }}
    >
      <Ionicons
        name="log-out-outline"
        size={24}
        color={`#61677a`}
        style={{ marginRight: 3 }}
      />
    </Pressable>
  );

  return ui;
}
