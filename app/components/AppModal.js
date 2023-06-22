import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

import { defaultStyles } from "app/config";

function AppModal({ visible = false }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <ActivityIndicator size={"large"} color={defaultStyles.primary} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default AppModal;
