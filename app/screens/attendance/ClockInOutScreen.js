import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import { AppScreen, AppText, AppError } from "app/components";
import { useClockInOut } from "app/hooks";
import { defaultStyles } from "app/config";
import i18n from "../../constants/i18n";

import moment from "moment";

const ClockInOutScreen = ({ navigation }) => {
  // const { userShiftDetails, isStart, isStop, handleStartButton, handleStopButton } = useClockInOut();
  // return (
  //   <AppScreen style={styles.container}>
  //    <View style={styles.container}>
  //       <AppText style={styles.title}>{i18n.t('clockInOut.roster')}+</AppText>
  //       <View style={styles.detailsContainer}>
  //         <AppText>{i18n.t('clockInOut.name')}: {userShiftDetails.name}</AppText>
  //         <AppText>{i18n.t('clockInOut.time')}: {userShiftDetails.time}</AppText>
  //         <AppText>{i18n.t('clockInOut.break')}: {userShiftDetails.break}</AppText>
  //         <AppText>{i18n.t('clockInOut.date')}: {userShiftDetails.date}</AppText>
  //       </View>
  //       <AppText style={styles.title}>{i18n.t('clockInOut.calendar')}+</AppText>
  //       <View style={styles.detailsContainer}>
  //         <AppText>{userShiftDetails.calendar}</AppText>
  //       </View>
  //       <AppText style={styles.title}>{i18n.t('clockInOut.absence')}+</AppText>
  //       <View style={styles.detailsContainer}>
  //         <AppText>{userShiftDetails.absence}</AppText>
  //       </View>
  //       <View style={styles.buttonContainer}>
  //        <View style={styles.button}>
  //         <TouchableOpacity
  //           onPress={handleStartButton}
  //           style={[styles.startButton, isStart ? styles.disabledButton: {}]}
  //           disabled={isStart}
  //         >
  //          <Text style={styles.buttonText}>{i18n.t('clockInOut.start')}</Text>
  //         </TouchableOpacity>
  //        </View>
  //        <View style={styles.button}>
  //        <TouchableOpacity
  //         onPress={handleStopButton}
  //         style={[styles.stopButton, isStop ? styles.disabledButton : {}]}
  //         disabled={isStop}
  //        >
  //         <Text style={styles.buttonText}>{i18n.t('clockInOut.stop')}</Text>
  //        </TouchableOpacity>
  //        </View>
  //       </View>
  //    </View>

  const { userShiftDetails, isStart, isStop, isLoading, hasError, handleActionButton } = useClockInOut();

  return (
    <AppScreen style={styles.container}>
      {isLoading ? (
        <View style={defaultStyles.loadingContainer}>
          <ActivityIndicator size={"large"} color={defaultStyles.primary} />
        </View>
      ) : (
        <>
          {hasError ? (
            <AppError></AppError>
          ) : (
            <View style={styles.container}>
              <AppText style={styles.title}>Roster+</AppText>
              <View style={styles.detailsContainer}>
                <AppText>Name: {userShiftDetails.name}</AppText>
                <AppText>Time: {`${userShiftDetails.timeIn} - ${userShiftDetails.timeOut}`}</AppText>
                <AppText>Hours: {userShiftDetails.hours} hrs</AppText>
                <AppText>Break: {userShiftDetails.break} hrs</AppText>
                <AppText>Date: {moment(userShiftDetails.date).format("DD/MM/YYYY")}</AppText>
              </View>
              <AppText style={styles.title}>Calendar+</AppText>
              <View style={styles.detailsContainer}>
                <AppText>{userShiftDetails.calendar}</AppText>
              </View>
              <AppText style={styles.title}>Absence+</AppText>
              <View style={styles.detailsContainer}>
                <AppText>{userShiftDetails.absence}</AppText>
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={handleActionButton}
                    style={[styles.startButton, isStart ? {} : styles.disabledButton]}
                    disabled={!isStart}
                  >
                    <Text style={styles.buttonText}>Start</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity onPress={handleActionButton} style={[styles.stopButton, isStop ? {} : styles.disabledButton]} disabled={!isStop}>
                    <Text style={styles.buttonText}>Stop</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </>
      )}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  segmentedControlContainer: {
    marginBottom: 10,
  },
  detailsContainer: {
    // flex: 1
    padding: 10,
    alignItems: 'flex-start'
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 140,
  },
  startButton: {
    backgroundColor: defaultStyles.colors.success,
    // borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    borderRadius: 10,
  },
  stopButton: {
    backgroundColor: defaultStyles.colors.danger,
    // borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: defaultStyles.colors.secondary,
    borderRadius: 5,
    color: defaultStyles.colors.alternatePrimary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: defaultStyles.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ClockInOutScreen;
