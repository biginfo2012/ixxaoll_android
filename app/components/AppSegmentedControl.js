import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";

import { AppText } from "app/components";
import { defaultStyles } from "app/config";

function AppSegmentedControl({ isInputType = true, source, currentIndex = 0, onChange }) {
  return (
    <View style={[styles.container, isInputType ? styles.inputType : styles.segmentMenuType]}>
      {source.map((key, index) => {
        return (
          <TouchableHighlight
            onPress={() => onChange(index)}
            key={key}
            style={[styles.item, currentIndex === index && styles.selected]}
            underlayColor={defaultStyles.colors.veryLightGray}
          >
            <AppText
              style={[
                styles.text,
                // currentIndex === index && styles.selected,
                isInputType ? styles.inputTypeText : styles.segmentMenuTypeText,
              ]}
            >
              {source[index]}
            </AppText>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  inputType: { backgroundColor: defaultStyles.colors.light },
  inputTypeText: { color: defaultStyles.colors.dark },
  segmentMenuType: {
    backgroundColor: "#eaeaea",
  },
  segmentMenuTypeText: { color: defaultStyles.colors.dark, fontWeight: "bold" },
  container: {
    flexDirection: "row",
    height: 45,
    borderRadius: 5,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selected: {
    backgroundColor: defaultStyles.colors.veryLightGray,
    color: defaultStyles.colors.alternatePrimary,
  },
  text: {
    fontSize: 16,
  },
});

export default AppSegmentedControl;
