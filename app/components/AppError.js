import React from "react";
import { StyleSheet, View } from "react-native";
import { AppStatusIcon, AppText } from "app/components";

import { defaultStyles } from "app/config";

function AppError({ text = "An error has occurred. Please try again later." }) {
  return (
    <View style={defaultStyles.centeredContainer}>
      <AppStatusIcon status={false}/>
      <AppText style={styles.paddingTop} >{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 25,
  },

 
});

export default AppError;
