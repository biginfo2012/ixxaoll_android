import React, { useRef, useEffect } from "react";
import { Alert, StyleSheet, View, FlatList } from "react-native";
import { AppButtonIcon, AppListHeaderComponent, AppListEmptyComponent, AppText, ListItem, AppScreen } from "app/components";
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { useExtraWork, useRosterShift } from "app/hooks";

import { defaultStyles } from "app/config";
import i18n from "../../constants/i18n";

const ExtraWorkScreen = ({ route, navigation }) => {
  const flatListRef = useRef(null);
  const { params } = route;

  const {
    customDateStyles,
    shiftsPerDay,
    displaySelectedMonthYear,
    getShiftsPerDay,
    handleMonthChange,
    extraWorkShift
  } = useExtraWork();

  const { getShiftColor } = extraWorkShift();


  const showListEmptyComponent = () => {
    return <AppListEmptyComponent text={i18n.t('timeAndAttendance.noShiftsFound')} />;
  };

  const showListHeaderComponent = () => {
    return <AppListHeaderComponent text={`${i18n.t('timeAndAttendance.shiftsFor')} ${i18n.t(`timeAndAttendance.date.${displaySelectedMonthYear().toLowerCase()}`)} ${moment().format('DD YYYY')}`} />;
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
          minDate={moment().add(1, 'days')}
          maxDate={moment().add(1, 'months').endOf('months')}
          restrictMonthNavigation={true}
          nextTitleStyle={{ fontSize: 18 }}
          previousTitleStyle={{ fontSize: 18 }}
          enableDateChange={true}
          onDateChange={getShiftsPerDay}
          selectedDayColor={{ backgroundColor: "transparent" }}
          selectedDayTextColor={{ backgroundColor: "transparent" }}
        />
      </View>
      <View style={styles.listViewContainer}>
        {showListHeaderComponent()}
        <FlatList
          ref={flatListRef}
          contentContainerStyle={{ flexGrow: 1 }}
          data={shiftsPerDay}
          keyExtractor={(item) => item}
          numColumns={1}
          ListEmptyComponent={showListEmptyComponent()}
          renderItem={({ item }) => (
            <ListItem
              key={item}
              title={`${item}`}
              // description={`${item.hours}`}
              leftBorderColor={getShiftColor(item)}
              onPress={() => {
                navigation.navigate("ExtraWorkConfirmationScreen", { shift: item, employeeName: params.employee.title });
              }}
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
  }
});

export default ExtraWorkScreen;
