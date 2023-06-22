import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { defaultStyles } from "app/config";

const AppButtonIcon = ({ icon, count, onPress, color = "primary" }) => {
  const showCountLabel = () => {
    if (!count) {
      return;
    }

    return (
      <View style={[styles.notification]}>
        <Text style={styles.notificationLabel}>{count}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={25} color={defaultStyles.colors.white} />
      {showCountLabel()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultStyles.colors.alternatePrimary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  notification: {
    position: "absolute",
    backgroundColor: defaultStyles.colors.danger,
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    right: -10,
    top: -10,
  },
  notificationLabel: {
    top: 0,
    color: "white",
    fontSize: 10,
  },
});

export default AppButtonIcon;
