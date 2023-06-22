import React from "react";
import { StyleSheet, View } from "react-native";

import { AppScreen } from "app/components";

import { defaultStyles } from "app/config";

const ProfileEmploymentScreen = ({ navigation }) => {
  return (
    <AppScreen style={styles.container}>
      <View style={styles.viewContainer}></View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
  },
  viewContainer: {
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    margin: 20,
  },
});

export default ProfileEmploymentScreen;
