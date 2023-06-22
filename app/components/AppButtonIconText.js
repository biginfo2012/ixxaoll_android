import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { defaultStyles } from "app/config";

function AppButtonIconText({ icon, text, onPress, color = "primary" }) {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <MaterialCommunityIcons style={styles.icon} name={icon} size={50} color={defaultStyles.colors.white} />
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultStyles.colors.alternatePrimary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  icon: {
    marginTop: 15,
  },
  label: {
    top: 0,
    color: "white",
    fontSize: 16,
    marginBottom: 15,
    marginTop: 10,
  },
});

export default AppButtonIconText;
