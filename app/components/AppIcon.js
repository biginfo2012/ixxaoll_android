import React from "react";
import { View, StyleSheet } from "react-native";

import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { defaultStyles } from "app/config";


export function AppIcon({ icon, size = 20, color = "primary", ...otherProps }) {
  let familyIconGroup = icon.split(".");

  if (familyIconGroup.length == 1) {
    //no family included. defaulting to MaterialCommunityIcons
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name={icon} size={size} color={color} {...otherProps} />
      </View>
    );
  } else {
    //family included
    switch (familyIconGroup[0]) {
      case "AntDesign":
        return (
          <View>
            <AntDesign name={familyIconGroup[1]} size={size} color={color} {...otherProps} />
          </View>
        );
      case "FontAwesome5":
        return (
          <View>
            <FontAwesome5 name={familyIconGroup[1]} size={size} color={color} {...otherProps} />
          </View>
        );
        case "Entypo":
          return (
            <View>
              <Entypo name={familyIconGroup[1]} size={size} color={color} {...otherProps} />
            </View>
          );
      case "MaterialIcons":
        return (
          <View>
            <MaterialIcons name={familyIconGroup[1]} size={size} color={color} {...otherProps} />
          </View>
        );
      case "MaterialCommunityIcons":
        return (
          <View>
            <MaterialCommunityIcons name={familyIconGroup[1]} size={size} color={color} {...otherProps} />
          </View>
        );
      case "MaterialIcons":
        return (
          <View>
            <MaterialIcons name={familyIconGroup[1]} size={size} color={color} {...otherProps} />
          </View>
        );
      default:
        return (
          <View>
            <MaterialCommunityIcons name={familyIconGroup[1]} size={size} color={color} {...otherProps} />
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultStyles.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  container: {
    marginRight: 5,
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
