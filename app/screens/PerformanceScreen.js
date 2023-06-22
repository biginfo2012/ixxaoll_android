import React from "react";
import { StyleSheet } from "react-native";

import { AppText, AppScreen } from "app/components";
import i18n from "../constants/i18n";
import { defaultStyles } from "app/config";

const PerformanceScreen = ({ navigation }) => {
  return (
    <AppScreen style={styles.container}>
      <AppText style={defaultStyles.title}>{i18n.t("more.module_not_loaded")}</AppText>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default PerformanceScreen;
