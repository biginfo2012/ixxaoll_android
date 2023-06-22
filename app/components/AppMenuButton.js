import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { defaultStyles } from "app/config";

function AppButton({ title, onPress, disabled = false }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultStyles.colors.alternatePrimary,
    borderRadius: 5,
    justifyContent: "center",
  },

  disabledButton: {
    backgroundColor: defaultStyles.colors.secondary,
    borderRadius: 5,
    color: defaultStyles.colors.alternatePrimary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  text: {
    color: defaultStyles.colors.white,
    fontSize: 16,
    textTransform: "uppercase",
  },
});

export default AppButton;
