import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import { AppIcon, AppText } from "app/components";
import { defaultStyles } from "app/config";

function AppPickerItem({ item, onPress, selected }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppText style={styles.text}>{item.label}</AppText>
      {selected && <AppIcon icon={"check-bold"} size={20} color={defaultStyles.colors.medium}></AppIcon>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    textAlign: "left",
  },
});

export default AppPickerItem;
