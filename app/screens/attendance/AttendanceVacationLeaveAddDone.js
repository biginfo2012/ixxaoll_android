import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { AppScreen, AppStatusIcon, AppText } from "app/components";
import i18n from "../../constants/i18n";
import { defaultStyles } from "app/config";

function AttendanceVacationLeaveAddDone({ route, navigation }) {
  useEffect(() => {
    // navigation.popToTop();
    return () => {}; //this handles unmounted component memory leak
  }, []);

  return (
    <AppScreen style={styles.container}>
      <View style={styles.horizontalCenter}>
        <AppStatusIcon status={true} />
        <AppText>{i18n.t('absence.booked')}</AppText>
      </View>
      <View style={styles.balance}>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.balance')}:</AppText>
            <AppText style={[styles.label, styles.labelLeft]}>3</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.booked')}:</AppText>
            <AppText style={[styles.label, styles.labelLeft]}>8</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.remaining')}:</AppText>
            <AppText style={[styles.label, styles.labelLeft]}>7</AppText>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  balance: {
    marginTop: 50,
  },
  container: {
    padding: 10,
    backgroundColor: defaultStyles.colors.white,
  },
  horizontalCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flexDirection: "row",
    flex: 1,
  },
  labelRight: {
    textAlign: "right",
    marginRight: 10,
    fontWeight: "bold",
  },
  labelLeft: {
    textAlign: 'left'
  },
  row: {
    marginLeft: 10,
    justifyContent: "center",
  },
  rowDetails: { flexDirection: "row" },
});

export default AttendanceVacationLeaveAddDone;
