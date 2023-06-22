import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { defaultStyles } from "app/config";

const AppListHeaderComponent = ({ text, style, ...otherProps }) => {
  return (
    <View style={styles.listHeaderComponentContainer}>
      <Text style={[styles.listHeaderComponentText, style]} {...otherProps}>
        {text}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  listHeaderComponentContainer: {
    backgroundColor: defaultStyles.colors.lightGray,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 15,
  },
  listHeaderComponentText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AppListHeaderComponent;
