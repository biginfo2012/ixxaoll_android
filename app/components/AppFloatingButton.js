import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { defaultStyles } from "app/config";

function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: defaultStyles.colors.alternatePrimary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: defaultStyles.colors.white,
    fontSize: 25,
  },
});

export default AppButton;
