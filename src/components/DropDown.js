import { useFonts } from "expo-font";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export function DropDown({ resultList, styles, placeholder, onSelected }) {
  const [fontsLoaded] = useFonts({
    Lato: require("../../assets/fonts/Lato-Regular.ttf"),
  });

  const [selected, setSelected] = useState("");

  const handleSelect = (selectedValue) => {
    setSelected(selectedValue);
    if (onSelected) {
      onSelected(selected);
    }
  };

  const ui = (
    <SelectList
      onSelect={handleSelect}
      setSelected={setSelected}
      data={resultList}
      search={false}
      boxStyles={defaultStyle.box}
      dropdownStyles={defaultStyle.dropDown}
      fontFamily="Lato"
      inputStyles={defaultStyle.dropDownText}
      dropdownTextStyles={[defaultStyle.dropDownText, styles]}
      placeholder={placeholder}
    />
  );

  if (fontsLoaded) {
    return ui;
  }
}

const defaultStyle = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: `#dfe1e4`,
    borderRadius: 8,
    marginVertical: 10,
  },
  dropDown: {
    borderWidth: 1,
    borderColor: `#dfe1e4`,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropDownText: {
    fontSize: 18,
    textTransform: `capitalize`,
    color: `#575a66`,
  },
});
