import React, { useRef, useEffect } from "react";
import { Alert, StyleSheet, View, FlatList } from "react-native";
import { AppButtonIcon, AppListHeaderComponent, AppListEmptyComponent, ListItem, AppScreen } from "app/components";
import CalendarPicker from "react-native-calendar-picker";
import i18n from "../../constants/i18n";
import { useRosterDetail, useRosterShift } from "app/hooks";
import moment from "moment";
import { defaultStyles } from "app/config";

const RosterDetailScreen = ({ route, navigation }) => {
  const flatListRef = useRef(null);
  const { params } = route;

  const { customDateStyles, displayingRosterDetails, displaySelectedMonthYear, getItemIndex, handleMonthChange } = useRosterDetail(params?.employee);

  const { getShiftColor } = useRosterShift();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <AppButtonIcon icon="download" onPress={handleDownload}></AppButtonIcon>
          <AppButtonIcon icon="email" onPress={handleEmail}></AppButtonIcon>
        </>
      ),
    });
  }, []);

  const showListEmptyComponent = () => {
    return <AppListEmptyComponent text={i18n.t("timeAndAttendance.noShiftsFound")} />;
  };

  const showListHeaderComponent = () => {
    return <AppListHeaderComponent text={`${i18n.t('timeAndAttendance.rosterFor')} ${i18n.t(`timeAndAttendance.date.${displaySelectedMonthYear().toLowerCase()}`)} ${moment().format('YYYY')}`} />;
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
      i18n.t('roster.confirm'),
      i18n.t('roster.downloadConfirm'),
      [
        { text: i18n.t('roster.no'), onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: i18n.t('roster.yes'), onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  };

  const handleEmail = () => {
    Alert.alert(
      i18n.t('roster.confirm'),
      i18n.t('roster.emailConfirm'),
      [
        { text: i18n.t('roster.no'), onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: i18n.t('roster.yes'), onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.calendarContainer}>
        <CalendarPicker
          allowRangeSelection={false}
          customDatesStyles={customDateStyles}
          onMonthChange={handleMonthChange}
          previousTitle="<"
          nextTitle=">"
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
          data={displayingRosterDetails}
          keyExtractor={(item) => item.id}
          numColumns={1}
          ListEmptyComponent={showListEmptyComponent()}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              title={`${item.date.format("DD/MM/YYYY")} (${i18n.t(`timesheets.shifts.${item.shiftType.toLowerCase()}`)})`}
              description={`${item.hoursFrom} - ${item.hoursTo}`}
              leftBorderColor={getShiftColor(item.shiftType)}
            />
          )}
        />
      </View>
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
});

export default RosterDetailScreen;
