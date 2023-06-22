import React from "react";
import { View, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";

import { AppText } from "app/components";
import { defaultStyles } from "app/config";
import i18n from "../constants/i18n";

function AbscenceListItem({ description, smartCode, year, consumed, booked, blocked, balance, onPressAbsenceType, selectedAbsenceType }) {
  return (
    <TouchableOpacity onPress={() => onPressAbsenceType(smartCode)}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
           <View style={styles.radioButton}>
             {selectedAbsenceType === smartCode && <View style={styles.raidioStyle} />} 
            </View>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.absenceType')}:</AppText>
            <AppText style={styles.label}>{description}</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>year:</AppText>
            <AppText style={styles.label}>{year}</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.consumed')}:</AppText>
            <AppText style={styles.label}>{consumed}</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.booked')}:</AppText>
            <AppText style={styles.label}>{booked}</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.blocked')}:</AppText>
            <AppText style={styles.label}>{blocked}</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.balance')}:</AppText>
            <AppText style={styles.label}>{balance}</AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  labelRight: {
    textAlign: "right",
    marginRight: 10,
    marginLeft: -10,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "column",
    padding: 15,
    backgroundColor: defaultStyles.colors.white,
    marginBottom: 10,
  },
  label: {
    flexDirection: "row",
    flex: 1,
    textAlign: 'left'
  },
  row: {
    marginLeft: 10,
    justifyContent: "center",
  },
  rowDetails: {
    flexDirection: "row",
    alignItems: 'center'
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -20
  },
  raidioStyle: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#98CFB6"
  }
  // image: {
  //     width: 70,
  //     height: 70,
  //     borderRadius: 35,
  // },
  // description: {
  //     color: defaultStyles.colors.medium,
  // },
  // title: {
  //     fontWeight: "500",
  // },
});

export default AbscenceListItem;
