import React, { useState, useEffect } from "react";
import { StyleSheet, ToastAndroid, View, FlatList } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import { AppScreen, AppMenuButton, AppTimePicker, AppListHeaderComponent, AppListEmptyComponent, ListItem} from "app/components";

import {useAbsenceCalendar} from "app/hooks";
import { defaultStyles } from "app/config";

import moment from "moment";
import {absencesApi} from "app/api";
import {authStorage} from "../../auth";
import i18n from "../../constants/i18n";
const _ = require("lodash");

function ApplyAbsenceCalendarScreen({ navigation }) {
  const [absenceListDataSource, setAbsenceListDataSource] = useState([]);
  const [customDateStyles, setCustomDateStyles] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [displayingMonthYear, setDisplayingMonthYear] = useState("");
  const getEmployeeLeaveRequestList = useApi(absencesApi.getEmployeeLeaveRequestList);
  const {
    //customDateStyles,
    displayingRosterDetails,
    //disabledDates,
    //displaySelectedMonthYear,
    //getShiftColor,
    //handleMonthChange
  } = useAbsenceCalendar();


  useEffect(() => {
    setDisplayingMonthYear(moment());
    loadEmployeeLeaveRequestList()
  }, [])
  const loadEmployeeLeaveRequestList = async () => {
    //TODO: done for demo purposes and should be removed at a later stage
    const response = await getEmployeeLeaveRequestList.request();
    if(response.status == 200){
      if(response?.data){
        let data = response.data;

        let displayingMonthYear = moment()
        const startOfDisplayingMonthYear = moment(displayingMonthYear).startOf("month");
        const endOfDisplayingMonthYear = moment(displayingMonthYear).endOf("month");
        let dD = [];
        let customDates = [];
        const tempRosterDetails = data.filter((a) => {
          const dateFrom = moment(a.dateFrom, "YYYY-MM-DD HH:mm:ss");
          //const dateTo = moment(a.dateTo, "DD/MM/YYYY");
          customDates.push({
            date: moment(a.dateFrom, "YYYY-MM-DD HH:mm:ss").clone(), //TODO: moment can be removed here if main datasource has already been formatted
            style: { backgroundColor: '#000', borderRadius: 20 },
            textStyle: { color: "white" },
            containerStyle: [],
            allowDisabled: true,
          });

          dD.push(moment(a.dateFrom, "YYYY-MM-DD HH:mm:ss"))
          return dateFrom.isBetween(startOfDisplayingMonthYear, endOfDisplayingMonthYear, "day");
        });
        setDisabledDates(dD)
        setCustomDateStyles(customDates);
        setAbsenceListDataSource(tempRosterDetails);
      }
    }
  };
  const showListEmptyComponent = () => {
    return <AppListEmptyComponent text={i18n.t('absence.noAbsenceFound')} />;
  };

  const showListHeaderComponent = () => {
    return <AppListHeaderComponent text={`${i18n.t('absence.absencesFor')} ${moment().format('MM/YYYY')}`} />;
  };

  const handleDateChange = (date) => {
    navigation.navigate("AttendanceVacationLeaveAddStep1")
  }
  const getShiftColor = (shiftType) => {
    switch (shiftType.toLowerCase()) {
      case "Standard":
        return defaultStyles.colors.warning;
      case "Emergency":
        return defaultStyles.colors.danger;
    }
  };

  const handleMonthChange = (date) => {
    setDisplayingMonthYear(date);
  };

  const displaySelectedMonthYear = () => {
    return moment(displayingMonthYear).format("MMMM, YYYY");
  };


  //TODO: Not closed dates should not be allowed to move forward
  return (
    <AppScreen style={styles.container}>
      <CalendarPicker
        allowRangeSelection={false}
        customDatesStyles={customDateStyles}
        disabledDates={disabledDates}
        onMonthChange={handleMonthChange}
        onDateChange={handleDateChange}
        previousTitle="<"
        nextTitle=">"
        nextTitleStyle={{ fontSize: 18 }}
        previousTitleStyle={{ fontSize: 18 }}
        selectedDayStyle={{ backgroundColor: 'white'}}
        todayBackgroundColor="white"
      />
      <View style={styles.listViewContainer}>
        {showListHeaderComponent()}
        <FlatList
          // ref={flatListRef}
          contentContainerStyle={{ flexGrow: 1 }}
          data={absenceListDataSource}
          keyExtractor={(item) => item.id}
          numColumns={1}
          ListEmptyComponent={showListEmptyComponent()}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              title={`${moment(item.dateFrom).format("DD/MM/YYYY")}~${moment(item.dateTo).format("DD/MM/YYYY")} (${item.reason})`}
              description={`${moment(item.dateFrom).format("DD/MM/YYYY") == moment(item.dateTo).format("DD/MM/YYYY") ? moment(item.startTime).format("HH:mm") + '-' + moment(item.endTime).format("HH:mm") : item.comments}`}
              leftBorderColor={getShiftColor(item.reason)}
            />
          )}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: defaultStyles.colors.white,
  },
  listViewContainer: {
    flex: 1,
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

export default ApplyAbsenceCalendarScreen;