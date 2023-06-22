import React from "react";
import { StyleSheet } from "react-native";
import i18n from "../constants/i18n";
import { AppText, AppScreen } from "app/components";
import { defaultStyles } from "app/config";

const TrainingScreen = ({ navigation }) => {
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

export default TrainingScreen;
