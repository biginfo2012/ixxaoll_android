import React, { useState, useEffect } from "react";
import {StyleSheet, ToastAndroid, View} from "react-native";

import moment from "moment";

import { AppScreen, AppText, AppSegmentedControl, AppMenuButton, AppTextInput, AppFileUploadForm } from "app/components";

import { defaultStyles } from "app/config";

import {authStorage, storage} from "app/auth";
import {absencesApi} from "app/api";
import i18n from "../../constants/i18n";

function AttendanceVacationLeaveAddStep2({ route, navigation }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [calculatedTime, setCalculatedTime] = useState("");
  const [uri, setUri] = useState("");
  const [name, setName] = useState("");
  const [mimeType, setMimeType] = useState("");
  const saveEmployeeLeave = useApi(absencesApi.saveEmployeeLeave);

  const controller = new AbortController();

  const { params } = route;

  useEffect(() => {
    //TODO: done for demo purposes and should be cleaned at a later stage. There is a function inside useDate hook
    const startDate = moment(params.startDate);
    const endDate = moment(params.endDate);
    const startTime = moment(params.startTime);
    const endTime = moment(params.endTime);

    if (startDate.isBefore(endDate, "day")) {
      const numOfDays = endDate.diff(startDate, "days");
      setCalculatedTime((numOfDays + 1) * 8);
    } else {
      const numOfHours = endTime.diff(startTime, "hours", true);
      setCalculatedTime(numOfHours);
    }
    //TODO: done for demo purposes and should be cleaned at a later stage. There is a function inside useDate hook

    return () => {}; //this handles unmounted component memory leak
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AppMenuButton onPress={() => handleBook()} title={i18n.t('absence.book')} />,
    });
  }, [tabIndex, comment, uri, name, mimeType]);

  const handleBook = async () => {

    //TODO: done for demo purposes and should be cleaned at a later stage
    // let fullAbsenceLeave = (await storage.getAbsenceLeave()) ?? '{ "count": 0 }';
    // let count = JSON.parse(fullAbsenceLeave);

    const dateFrom = moment(params.startDate).format();
    const dateTo = moment(params.endDate).format();
    const startTime = moment(params.startTime).format();
    const endTime = moment(params.endTime).format();
    // const numOfDays = endDate.diff(startDate, "days");
    let source = ["Standard", "Emergency", "Extra Shift"]
    const reason = source[tabIndex];
    let hour = 0;
    if (moment(params.startDate).isBefore(moment(params.endDate), "day")) {
      const numOfDays = moment(params.endDate).diff(moment(params.startDate), "days");
      hour = (numOfDays + 1) * 8;
    } else {
      const numOfHours = moment(params.endTime).diff(moment(params.startTime), "hours", true);
      hour = numOfHours;
    }
    const employeeId = await authStorage.getEmployeeId();
    let response = await saveEmployeeLeave.request(employeeId, dateFrom, dateTo, startTime, endTime, reason, comment, hour, uri, name, mimeType, controller);
    if (response.status === 200) {
      navigation.navigate("AttendanceVacationLeaveAddDone");
      ToastAndroid.show("Absence added successfully", ToastAndroid.SHORT);
    }
    // count.count += numOfDays + 1;
    //
    // await storage.storeAbsenceLeave(JSON.stringify(count));
    //TODO: done for demo purposes and should be cleaned at a later stage
  };

  const showDateRange = () => {
    let startDate = moment(params.startDate).format("DD.MM.YYYY");
    let endDate = moment(params.endDate).format("DD.MM.YYYY");

    return startDate + " - " + endDate;
  };
  const handleFileSelection = async (uri, name, mimeType) => {
    setUri(uri);
    setName(name);
    setMimeType(mimeType);
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.typeContainer}>
        <View style={styles.summary}>
          <AppText>{i18n.t('absence.youAreBooking')}</AppText>
          <AppText>{calculatedTime} {i18n.t('absence.hoursOfAbsence')}</AppText>
          <AppText>{showDateRange()}</AppText>
        </View>
        <View style={styles.absenceType}>
          <AppSegmentedControl
            source={[i18n.t('absence.standard'), i18n.t('absence.emergency'), i18n.t('absence.extraShift')]}
            onChange={(index) => setTabIndex(index)}
            currentIndex={tabIndex}
            backgroundColor={defaultStyles.colors.lightGray}
            isInputType={true}
          />
        </View>
        <View>
          <AppTextInput
            placeholder={i18n.t('absence.comment')}
            autoCapitalize="sentences"
            multiline={true}
            numberOfLines={4}
            onChangeText={(newText) => setComment(newText)}
          />
        </View>
        <View>
        <AppFileUploadForm onSelectedFile={(uri, name, mimeType) => handleFileSelection(uri, name, mimeType)} />
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  absenceType: {
    marginBottom: 25,
  },
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
  typeContainer: {},
  summary: {
    alignItems: "center",
    marginBottom: 25,
  },
});

export default AttendanceVacationLeaveAddStep2;
