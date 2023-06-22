import React from "react";
import { StyleSheet } from "react-native";

import { AppIcon } from "app/components";
import { defaultStyles } from "app/config";

function AppStatusIcon({ status }) {
  let color = status ? defaultStyles.colors.success : defaultStyles.colors.warning;
  let icon = status ? "check-circle" : "alert-circle";

  return <AppIcon icon={icon} color={color} size={75}></AppIcon>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultStyles.colors.primary,
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

export default AppStatusIcon;
