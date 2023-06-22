import React from "react";
import { View, StyleSheet } from "react-native";

import { AppIcon, AppText } from "app/components";

import { defaultStyles } from "app/config";

export function TimesheetListItem({ timesheet }) {
  return (
    <View style={styles.container}>
      <View style={styles.dateDetails}>
        <AppIcon icon={"calendar"} size={20} margin={20} color={defaultStyles.colors.medium} />
        <AppText style={styles.contentDate}>{timesheet.date}</AppText>
        <AppText style={styles.contentCalendar}>{timesheet.cal}</AppText>
        <AppText style={styles.contentRoster}>{timesheet.ros}</AppText>
      </View>
      <View style={styles.timeDetails}>
        <AppIcon icon={"clock-in"} size={20} color={defaultStyles.colors.medium} />
        <AppText style={styles.contentTimeIn}>{timesheet.ti}</AppText>
        <AppIcon icon={"clock-out"} size={20} color={defaultStyles.colors.medium} />
        <AppText style={styles.contentTimeOut}>{timesheet.to}</AppText>
        <AppIcon icon={"silverware-fork-knife"} size={20} color={defaultStyles.colors.medium} />
        <AppText style={styles.contentBreak}>{timesheet.brk}</AppText>
      </View>
      <View style={styles.otherTimeDetails}>
        <AppIcon icon={"clock-start"} size={20} color={defaultStyles.colors.medium} />
        <AppText style={styles.contentHours}>{timesheet.hrs}</AppText>
        <AppIcon icon={"airplane"} size={20} color={defaultStyles.colors.medium} />
        <AppText style={styles.contentAbsence}>{timesheet.abs}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // padding: 15,
    backgroundColor: defaultStyles.colors.white,
    marginBottom: 10,
  },
  contentAbsence: {
    color: defaultStyles.colors.medium,
    marginRight: 20,
  },
  contentDate: {
    color: defaultStyles.colors.medium,
    flex: 4,
  },
  contentCalendar: {
    color: defaultStyles.colors.veryLightGray,
    flex: 1,
    textAlign: "right",
  },
  contentHours: {
    color: defaultStyles.colors.medium,
    marginRight: 20,
  },
  contentRoster: {
    color: defaultStyles.colors.veryLightGray,
    flex: 1,
    textAlign: "right",
  },
  contentTimeIn: {
    color: defaultStyles.colors.medium,
    marginRight: 20,
  },
  contentTimeOut: {
    color: defaultStyles.colors.medium,
    marginRight: 20,
  },
  contentBreak: {
    color: defaultStyles.colors.medium,
  },
  dateDetails: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: defaultStyles.colors.white,
    // marginBottom: 10
  },
  timeDetails: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: defaultStyles.colors.white,
    // marginBottom: 10
  },
  otherTimeDetails: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: defaultStyles.colors.white,
    // marginBottom: 10
  },
  // },
  // label: {
  //     flexDirection: "row",
  //     flex: 1,
  // },
  // row: {
  //     marginLeft: 10,
  //     justifyContent: "center",
  // },
  // rowDetails: { flexDirection: "row" },
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
