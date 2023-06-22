import React from "react";
import { StyleSheet, View } from "react-native";

import { defaultStyles } from "app/config";

import { AppText } from "app/components";

function FormAlert({ error, visible }) {
  if (!visible || !error) return null;

  let color = defaultStyles.colors.danger;

  return (
    <View style={styles.container} backgroundColor={color}>
      <AppText style={styles.error}>{error}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: "row",
    padding: 15,
    marginBottom: 30,
  },
  error: { color: "white", fontSize: 12 },
});

export default FormAlert;
