import React, { useState, useEffect } from "react";
import { StyleSheet, ToastAndroid, Text, View, FlatList } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { ProgressBar } from 'react-native-paper';
import { AppScreen, AppMenuButton, AppText, AppListHeaderComponent, AppListEmptyComponent, ListItem} from "app/components";

import {useAbsenceApproval} from "app/hooks";
import { defaultStyles } from "app/config";

import moment from "moment";

const _ = require("lodash");

function AbsenceApprovalScreen({ navigation }) {
  const {
    customDateStyles,
    displayingApprovalDetails,
    disabledDates,
    handleMonthChange,
    displaySelectedMonthYear,
    getShiftColor,
  } = useAbsenceApproval();

  const showListEmptyComponent = () => {
    return <AppListEmptyComponent text="No Approval found" />;
  };

  const showListHeaderComponent = () => {
    return <AppListHeaderComponent text={`Approval for ${displaySelectedMonthYear()}`} />;
  };

  const handleDateChange = (date) => {
    navigation.navigate("AttendanceVacationLeaveAddStep1")
  }

  const renderItem = ({ item }) => {
    const totalEmployee = 100;
    const employeePercentage = item.totalEmployeeBooked/totalEmployee;
    return (
      <View>
        <View style={styles.textContainer}>
          <AppText style={styles.title}>{item.date.format("DD/MM/YYYY")} ({item.absenceType})</AppText>
          <AppText style={styles.description}>{`${item.hoursFrom} - ${item.hoursTo}`}</AppText>
        </View>
        <View>
          <AppText style={styles.percentageText}>{employeePercentage*totalEmployee}%</AppText>
          <ProgressBar style={styles.progress} progress={employeePercentage} color="#20baad" />
        </View>
      </View>
    )
  }



  //TODO: Not closed dates should not be allowed to move forward
  return (
    <AppScreen style={styles.container}>
      <CalendarPicker
        allowRangeSelection={false}
        customDatesStyles={customDateStyles}
        disabledDates={disabledDates}
        onDateChange={handleDateChange}
        onMonthChange={handleMonthChange}
        minDate={moment()}
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
          data={displayingApprovalDetails}
          keyExtractor={(item) => item.id}
          numColumns={1}
          ListEmptyComponent={showListEmptyComponent()}
          renderItem={renderItem}
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
  progress: {
    height: 5,
    marginRight: 5,
  },
  title: {
    fontWeight: "500"
  },
  description: {
    color: defaultStyles.colors.medium,
    flexShrink: 1,
  },
  textContainer: {
    marginTop: 20
  },
  percentageText: {
    fontSize: 10,
    color: '#000'
  }
});

export default AbsenceApprovalScreen;