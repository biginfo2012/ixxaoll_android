import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import {defaultStyles} from "app/config";

function AppButton({title, onPress, style, disabled = false, isNormalStyle = true }) {
  return (
    <TouchableOpacity
      style={[style, disabled ? styles.disabledButton : isNormalStyle ? styles.button : styles.alternateButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, isNormalStyle ? styles.textNormal : styles.textAlternate]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultStyles.colors.alternatePrimary,
    // borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },

  alternateButton: {
    borderColor: defaultStyles.colors.alternatePrimary,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },

  disabledButton: {
    backgroundColor: defaultStyles.colors.secondary,
    borderRadius: 5,
    color: defaultStyles.colors.alternatePrimary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    width: "100%",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textNormal: {
    color: defaultStyles.colors.white,
  },
  textAlternate: {
    color: defaultStyles.colors.alternatePrimary,
  },
});

export default AppButton;
