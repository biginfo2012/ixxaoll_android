import React from "react";
import { StyleSheet,Text, View } from "react-native";

const AppListEmptyComponent = ({ text, style, ...otherProps }) => {
  return (
    <View style={styles.emptyListComponentContainer}>
      <Text style={[styles.emptyListComponentText, style]} {...otherProps}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyListComponentContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    padding:15
  },
  emptyListComponentText: {
    fontSize: 18,
  },
});

export default AppListEmptyComponent;
