import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AppButtonIconText, AppText, AppScreen, ListItem, AppIcon } from "app/components";
import i18n from "../constants/i18n";

import { storage } from "app/auth";
import { useTimeAndAttendance } from "app/hooks";

import { defaultStyles } from "app/config";

const TimeAndAttendanceScreen = ({ navigation }) => {
  const [vacationLeave, setVacationLeave] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { items } = useTimeAndAttendance();

  useEffect(() => {
    loadVacationLeave();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  const loadVacationLeave = async () => {
    const vacationLeave = await storage.getVacationLeave();
    if (vacationLeave == null) {
      return;
    }

    let leave = vacationLeave.replace(/\\/g, "-").split("%");

    console.log('wew', leave);

    let leaveList = [];

    for (let i = 0; i < leave.length; i++) {
      let rawObj = leave[i].replace(/\\/g, "").replace(/"/g, "");

      if (!rawObj) {
        continue;
      }
      let rawDate = rawObj.split("|");

      let displayDate = rawDate[0];

      if (rawDate[1]) {
        displayDate += " - " + rawDate[1];
      }

      let obj = {
        displayDate: displayDate,
        duration: rawDate[2],
      };
      leaveList.push(obj);
    }

    setVacationLeave(leaveList);
  };

  return (
    <AppScreen style={styles.container}>
      <AppText style={defaultStyles.title}>{i18n.t("timeAndAttendance.title")}</AppText>
      {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", maxHeight: 100 }}>
        <View style={styles.item}>
          <AppButtonIconText
            text={i18n.t("timeAndAttendance.roster")}
            icon="calendar-multiselect"
            onPress={() => navigation.navigate("RosterScreen")}
          ></AppButtonIconText>
        </View>
        <View style={styles.item}>
          <AppButtonIconText
            text={i18n.t("timeAndAttendance.clocking")}
            icon="clock-outline"
            onPress={() => navigation.navigate("ClockingScreen")}
          ></AppButtonIconText>
        </View>
        <View style={styles.item}>
          <AppButtonIconText
            text={i18n.t("timeAndAttendance.absence")}
            icon="calendar-month"
            onPress={() => navigation.navigate("AbsenceScreen")}
          ></AppButtonIconText>
        </View>
        <View style={styles.item}>
          <AppButtonIconText text={i18n.t("timeAndAttendance.request")} icon="calendar-arrow-right"></AppButtonIconText>
        </View>
      </View> */}
      <FlatList
          data={items}
          keyExtractor={(menuItem) => menuItem.title}

          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
              <AppIcon
                icon={item.icon}
                size={20}
                margin={20}
                color={defaultStyles.colors.medium}
              />
              }
              onPress={() => {
                navigation.navigate(item.link);
              }}
            />
          )}
        />
      {/* <AppButton
                title="Book Vacation Leave"
                onPress={() => navigation.navigate("AttendanceVacationLeaveAdd")}
            ></AppButton> */}
      {/* <FlatList
                data={vacationLeave}
                keyExtractor={(item) => item.id}
                numColumns={1}
                renderItem={({ item }) => <ListItem title={item.displayDate} description={item.duration} />}
                refreshing={refreshing}
                onRefresh={loadVacationLeave}
            /> */}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
    // margin: 10,
  },
  title: {
    margin: 15
  }
});

export default TimeAndAttendanceScreen;
