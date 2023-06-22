import React from "react";
import { View, StyleSheet } from "react-native";

import { AppText } from "app/components";
import { defaultStyles } from "app/config";

function RosterListItem({ roster }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>Name:</AppText>
        <AppText style={styles.propertyValue}>{roster.name}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>Shift:</AppText>
        <AppText style={styles.propertyValue}>{roster.shift}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>Time:</AppText>
        <AppText style={styles.propertyValue}>{roster.time}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>Hours:</AppText>
        <AppText style={styles.propertyValue}>{roster.hours}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>Break:</AppText>
        <AppText style={styles.propertyValue}>{roster.break}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>OT:</AppText>
        <AppText style={styles.propertyValue}>{roster.ot}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>LT:</AppText>
        <AppText style={styles.propertyValue}>{roster.lt}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>FLX:</AppText>
        <AppText style={styles.propertyValue}>{roster.flx}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>WE:</AppText>
        <AppText style={styles.propertyValue}>{roster.we}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>HL:</AppText>
        <AppText style={styles.propertyValue}>{roster.hl}</AppText>
      </View>
      <View style={styles.containerRow}>
        <AppText style={styles.propertyName}>TRN:</AppText>
        <AppText style={styles.propertyValue}>{roster.trn}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 15,
    backgroundColor: defaultStyles.colors.white,
    marginBottom: 10,
  },
  containerRow: {
    flexDirection: "row",
  },
  propertyName: {
    flex: 1,
    marginRight: 5,
    textAlign: "right",
  },
  propertyValue: {
    flex: 1,
    marginLeft: 5,
    textAlign: "left",
  },
});

export default RosterListItem;
