import React, { useRef, useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View, FlatList } from "react-native";
import { AppButtonIcon, AppListHeaderComponent, AppListEmptyComponent, AppModal, ListItem, AppScreen, AppText } from "app/components";
import CalendarPicker from "react-native-calendar-picker";
import { useTimeSheets, useTimesheetsShift } from "app/hooks";
import i18n from "../../constants/i18n";
import { defaultStyles } from "app/config";
import moment from "moment";

const TimesheetsScreen = ({ route, navigation }) => {
  const flatListRef = useRef(null);
  // const { params } = route;

  const {
    customDateStyles,
    displayingTimesheetsDetails,
    showDownloadModal,
    displaySelectedMonthYear,
    monthIndex,
    getItemIndex,
    handleMonthChange,
    download,
    sendEmail,
    getTimeSheetApi,
    downloadEmailTimesheetApi
  } = useTimeSheets();

  const { getShiftColor } = useTimesheetsShift();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <AppButtonIcon icon="download" onPress={handleDownload}></AppButtonIcon>
          <AppButtonIcon icon="email" onPress={handleEmail}></AppButtonIcon>
        </>
      ),
    });
  }, [monthIndex]);

  const showListEmptyComponent = () => {
    return <AppListEmptyComponent text={i18n.t('timesheets.noShiftsFound')} />;
  };

  const showListHeaderComponent = () => {
    return <AppListHeaderComponent text={`${i18n.t('timesheets.timesheetFor')} ${i18n.t(`timeAndAttendance.date.${displaySelectedMonthYear().toLowerCase()}`)} ${moment().format('YYYY')}`} />;
  };

  const handleOnDateChange = (date) => {
    const index = getItemIndex(date);
    if (index < 0) {
      return;
    }

    flatListRef.current.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const handleDownload = () => {
    Alert.alert(
        i18n.t('timesheets.confirm'),
        i18n.t('timesheets.downloadConfirm'),
      [
        { text:  i18n.t('timesheets.no'), style: "cancel" },
        { text: i18n.t('timesheets.yes'), onPress: () => download(monthIndex) },
      ],
      { cancelable: false }
    );
  };

  const handleEmail = () => {
    Alert.alert(
      i18n.t('timesheets.confirm'),
      i18n.t('timesheets.emailConfirm'),
      [
        { text:  i18n.t('timesheets.no'), style: "cancel" },
        { text: i18n.t('timesheets.yes'), onPress: () => sendEmail(monthIndex) },
      ],
      { cancelable: false }
    );
  };
  
  return (
    <AppScreen style={styles.container}>
      {/* {isLoading ? (
        <View style={defaultStyles.loadingContainer}>
          <ActivityIndicator size={"large"} color={defaultStyles.primary} />
        </View>
      ) : ( */}
      <View style={styles.viewContainer}>
        <View style={styles.calendarContainer}>
          <CalendarPicker
            allowRangeSelection={false}
            customDatesStyles={customDateStyles}
            onMonthChange={handleMonthChange}
            previousTitle="<"
            nextTitle=">"
            restrictMonthNavigation={true}
            maxDate={moment().endOf("months")}
            showDayStragglers={true}
            nextTitleStyle={{ fontSize: 18 }}
            previousTitleStyle={{ fontSize: 18 }}
            enableDateChange={true}
            onDateChange={handleOnDateChange}
            selectedDayColor={{ backgroundColor: "transparent" }}
            selectedDayTextColor={{ backgroundColor: "transparent" }}
          />
        </View>

        <View style={styles.listViewContainer}>
          {showListHeaderComponent()}
          <FlatList
            ref={flatListRef}
            contentContainerStyle={{ flexGrow: 1 }}
            data={displayingTimesheetsDetails}
            keyExtractor={(item) => item.id}
            numColumns={1}
            ListEmptyComponent={showListEmptyComponent()}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
                title={`${item.date.format("DD/MM/YYYY")} (${item.shiftType})`}
                description={`${item.hours}`}
                leftBorderColor={getShiftColor(item.shiftType)}
              />
            )}
          />
        </View>
      </View>
      {/* )} */}

      <AppModal visible={showDownloadModal || getTimeSheetApi.loading || downloadEmailTimesheetApi.loading} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: defaultStyles.colors.white,
    flexDirection: "column",
  },
  calendarContainer: {
    flex: 1,
  },
  listViewContainer: {
    flex: 1,
  },
  dateStyle: {
    backgroundColor: "red",
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    top: "25%",
    height: "50%",
    backgroundColor: "white",
  },
  viewContainer: {
    flex: 1,
  },
});

export default TimesheetsScreen;
