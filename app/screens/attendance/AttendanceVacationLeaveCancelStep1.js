import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { AppListEmptyComponent, AppListHeaderComponent, ListItem, AppScreen } from "app/components";
import i18n from "../../constants/i18n";
import { defaultStyles } from "app/config";

import { useAbsence } from "app/hooks";

const AttendanceVacationLeaveCancelStep1 = ({ navigation }) => {
  const { displayingAbsences, handleMonthChange, displaySelectedMonthYear, customDateStyles } = useAbsence();

  const showListEmptyComponent = () => {
    return <AppListEmptyComponent text={i18n.t('absence.noAbsenceFound')} />;
  };

  const showListHeaderComponent = () => {
    return <AppListHeaderComponent text={`${i18n.t('absence.absencesFor')} ${i18n.t(`timeAndAttendance.date.${displaySelectedMonthYear().toLowerCase()}`)} ${moment().format('YYYY')}`} />;
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
          enableDateChange={false}
        />
      </View>

      <View style={styles.listViewContainer}>
        {showListHeaderComponent()}
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={displayingAbsences}
          keyExtractor={(item) => item.id}
          numColumns={1}
          ListEmptyComponent={showListEmptyComponent()}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.dateStart} - ${item.dateEnd}`}
              description={`${item.timeStart} - ${item.timeEnd}`}
              onPress={() => {
                navigation.navigate("AttendanceVacationLeaveCancelStep2", {
                  absence: item,
                });
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
    padding: 10,
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

export default AttendanceVacationLeaveCancelStep1;
