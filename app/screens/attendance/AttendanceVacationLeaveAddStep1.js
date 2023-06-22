import React, { useState, useEffect } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import { AppScreen, AppMenuButton, AppTimePicker } from "app/components";
import i18n from "../../constants/i18n";
import { defaultStyles } from "app/config";

import moment from "moment";

const _ = require("lodash");

function AttendanceVacationLeaveAddStep1({ navigation }) {
  const [selectedStartDate, setSelectedStartDate] = useState({});
  const [selectedEndDate, setSelectedEndDate] = useState({});
  const [selectedStartTime, setSelectedStartTime] = useState({});
  const [selectedEndTime, setSelectedEndTime] = useState({});

  useEffect(() => {
    let now = new Date();

    //TODO: utilitify date init here and in apptimepicker
    setSelectedStartDate(now);
    setSelectedStartTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0));
    setSelectedEndTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0));

    return () => {}; //this handles unmounted component memory leak
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AppMenuButton onPress={() => handleNext()} title={i18n.t('absence.next')} />,
    });
  }, [selectedStartDate, selectedEndDate, selectedStartTime, selectedEndTime]);

  const handleDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
      console.log("enddate" + date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      console.log("startdate" + date);
    }
  };

  const handleTimeChange = (time, type) => {
    if (type === "START_TIME") {
      setSelectedStartTime(time);
    }

    if (type === "END_TIME") {
      setSelectedEndTime(time);
    }
  };

  const handleNext = () => {
    if (_.isEmpty(selectedEndDate)) {
      ToastAndroid.show("Select an end date", ToastAndroid.LONG);
      return;
    }

    //TODO: merge the dates and times

    navigation.navigate("AttendanceVacationLeaveAddStep2", {
      startDate: moment(selectedStartDate).toString(),
      endDate: moment(selectedEndDate).toString(),
      startTime: moment(selectedStartTime).toString(),
      endTime: moment(selectedEndTime).toString(),
    });
  };

  //TODO: Not closed dates should not be allowed to move forward

  return (
    <AppScreen style={styles.container}>
      <CalendarPicker
        allowRangeSelection={true}
        selectedDayColor={defaultStyles.colors.alternateSecondary}
        onDateChange={handleDateChange}
        minDate={moment()}
        previousTitle="<"
        nextTitle=">"
        nextTitleStyle={{ fontSize: 18 }}
        previousTitleStyle={{ fontSize: 18 }}
      />
      {moment(selectedStartDate).format("X") === moment(selectedEndDate).format("X") && (
        <View style={styles.timeContainer}>
          <AppTimePicker label={i18n.t('absence.startTime')} type="START_TIME" style={styles.timePicker} onTimeChange={handleTimeChange} />
          <AppTimePicker label={i18n.t('absence.endTime')} type="END_TIME" style={styles.timePicker} onTimeChange={handleTimeChange} />
        </View>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: defaultStyles.colors.white,
  },
  callToActionContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  leaveOptionContainer: { flexDirection: "row", paddingTop: 60 },
  leaveOption: { flex: 1, flexDirection: "row" },
  leaveOptionText: { paddingHorizontal: 10 },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: "row",
    flex: 1,
    marginTop: 45,
  },
});

export default AttendanceVacationLeaveAddStep1;
