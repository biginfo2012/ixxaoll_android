import React, { useEffect, useContext } from "react";
import { StyleSheet, View, Modal } from "react-native";

import { AppButtonIcon, AppModal } from "app/components";
import { defaultStyles } from "app/config";
import { useSync } from "app/hooks";

const AppSyncButton = ({ children, navigation, title, ...otherProps }) => {
  const { isSyncing, handlePressSync } = useSync();

  return (
    <View style={defaultStyles.text} {...otherProps}>
      <View style={styles.iconsRight}>
        <AppButtonIcon icon="sync" onPress={handlePressSync}></AppButtonIcon>
      </View>
      <View>
        <AppModal visible={isSyncing} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsLeft: {
    flex: 1,
  },
  iconsRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppSyncButton;
