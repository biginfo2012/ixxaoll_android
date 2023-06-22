import React, { useRef, useEffect } from "react";
import { Alert, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { AppButtonIcon, AppText, AppListHeaderComponent, AppListEmptyComponent, ListItem, AppScreen } from "app/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTimesheetsApproval, useRosterShift } from "app/hooks";
import i18n from "../../constants/i18n";
import { defaultStyles } from "app/config";


const TimesheetsApprovalScreen = ({ route, navigation }) => {
  const flatListRef = useRef(null);
  const { params } = route;
  const {
    displayingTimesheetsDetails,
    isAllApproved,
    isAllRejected,
    isUndoPress,
    allApproveRejectIndex,
    onPressApprove,
    onPressApproveAll,
    onPressReject,
    onPressRejectAll,
    onPressReset,
    onPressUndo,
  } = useTimesheetsApproval(params?.employee);

  const { getShiftColor } = useRosterShift();

  const showListEmptyComponent = () => {
    return <AppListEmptyComponent text={i18n.t('timesheets.noShiftsFound')} />;
  };

  const showListHeaderComponent = () => {
    return <AppListHeaderComponent text={`${params?.employee.title} ${i18n.t('clocking.timesheets')}`} />;
  };
  
  const showFooterComponent = () => {
    return (
      <View style={styles.listFooter}>
        <View style={styles.footerButton}>
          <TouchableOpacity
            disabled={isAllApproved || isAllRejected}
            style={
              [styles.approveButton,
              isAllApproved || isAllRejected ?
              styles.disabledButton : {}
              ]}
            onPress={onPressApproveAll}
          ><AppText style={styles.buttonText}>{i18n.t('timesheets.approveAll')}</AppText></TouchableOpacity>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity
            disabled={isAllRejected || isAllApproved}
            style={
              [styles.rejectButton,
                isAllRejected || isAllApproved ?
              styles.disabledButton : {}
              ]}
            onPress={onPressRejectAll}
          ><AppText style={styles.buttonText}>{i18n.t('timesheets.rejectAll')}</AppText></TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listComponent}>
        <ListItem
          key={item.id}
          title={`${item.date.format("DD/MM/YYYY")} (${i18n.t(`timesheets.shifts.${item.shiftType.toLowerCase()}`)})`}
          description={`${item.hours}`}
          leftBorderColor={getShiftColor(item.shiftType)}
        />
        {
          item.status === null ?
          (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.listButton, {backgroundColor: defaultStyles.colors.alternatePrimary}]}
                onPress={() => onPressApprove(item)}
              >
                <AppText style={styles.text}>{i18n.t('timesheets.approve')}</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.listButton, { backgroundColor: defaultStyles.colors.danger }]}
                onPress={() => onPressReject(item)}
              >
                <AppText style={[styles.text]}>{i18n.t('timesheets.reject')}</AppText>
              </TouchableOpacity>
            </View>
          )
        :
        (
          <View style={styles.statusContainer}>
           <AppText style={
            item.status === 'Rejected' ?
            styles.statusRejected :
            styles.statusApproved}
            >
            {i18n.t(`timesheets.${item.status.toLowerCase()}`)}
            </AppText>
          </View>
        )
        }
      </View>
    )
  }

  const ButtonIcons = () => {
    return (
      <>
        <TouchableOpacity disabled={isUndoPress} style={[styles.undoButton]} onPress={onPressUndo}>
          <MaterialCommunityIcons
            name="arrow-u-left-top"
            size={25}
            color={defaultStyles.colors.white}
            style={isUndoPress ? {opacity: 0.4} : {}}
            />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.undoButton]} onPress={onPressReset}>
          <MaterialCommunityIcons name="refresh" size={25} color={defaultStyles.colors.white} />
        </TouchableOpacity>
      </>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <ButtonIcons />
        </>
      )
    })
    return () => {}
  }, [isUndoPress, isAllApproved, isAllRejected, allApproveRejectIndex, displayingTimesheetsDetails])

  return (
    <AppScreen style={styles.container}>
      <View style={styles.listViewContainer}>
        {showListHeaderComponent()}
        <FlatList
          ref={flatListRef}
          contentContainerStyle={{ flexGrow: 1 }}
          data={displayingTimesheetsDetails}
          keyExtractor={(item) => item.id}
          numColumns={1}
          ListEmptyComponent={showListEmptyComponent()}
          ListFooterComponent={showFooterComponent()}
          renderItem={renderItem}
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
  listFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  listComponent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerButton: {
    width: 140,
    borderRadius: 10,
  },
  approveButton: {
    backgroundColor: defaultStyles.colors.alternatePrimary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingRight: 10,
    paddingLeft: 10,
    width: "100%",
    marginVertical: 10,
    borderRadius: 5
  },
  rejectButton: {
    backgroundColor: defaultStyles.colors.danger,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: defaultStyles.colors.white,
  },
  disabledButton: {
    backgroundColor: defaultStyles.colors.secondary,
    borderRadius: 5,
    color: defaultStyles.colors.alternatePrimary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  listButton: {
    marginHorizontal: 5,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    color: defaultStyles.colors.white
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10
  },
  statusContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 50
  },
  statusRejected: {
    fontSize: 14,
    fontWeight: "700",
    color: defaultStyles.colors.danger
  },
  statusApproved: {
    fontSize: 14,
    fontWeight: "700",
    color: defaultStyles.colors.success
  },
  undoButton: {
    backgroundColor: defaultStyles.colors.alternatePrimary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  }
});

export default TimesheetsApprovalScreen;
