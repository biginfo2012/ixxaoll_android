import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AppScreen, AppSegmentedControl, ListItem, AppMenuButton, AppButton, AppModal, AbsenceListItem } from "app/components";
import { useAbsence } from "app/hooks"
import { useApply } from "app/hooks";
import { authStorage } from "app/auth";

import { defaultStyles } from "app/config";
import {absencesApi} from "app/api";
import i18n from "../../constants/i18n";

const ApplyScreen = ({ navigation }) => {
  const [absenceDataSource, setAbsenceDataSource] = useState([]);
  const [selectedAbsenceType, setSelectedAbsenceType] = useState();
  const getEmployeeLeaveSummary = useApi(absencesApi.getEmployeeLeaveSummary);
  const { getEmployeeLeaveSummaryApi, employeeLeaveSummary } = useApply();

  const loadAbsenceLeave = async () => {
    //TODO: done for demo purposes and should be removed at a later stage
    const response = await getEmployeeLeaveSummary.request();
    if(response.status == 200){
      if(response?.data){
        console.log("data1: ")
        console.log(response.data)
        setAbsenceDataSource(response.data);
      }
    }
  };

  const onPressAbsenceType = (absenceType) => {
    setSelectedAbsenceType(absenceType);
  }

  const handleNext = () => {
    navigation.navigate('ApplyAbsenceCalendarScreen')
  }

  useEffect(() => {
    if (selectedAbsenceType !== undefined) {
      navigation.setOptions({
        headerRight: () => <AppMenuButton onPress={() => handleNext()} title={i18n.t('absence.next')} />,
      });
    }
  }, [selectedAbsenceType]);

  useEffect(() => {
    loadAbsenceLeave();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  return (
    <AppScreen style={styles.container}>
      <View style={styles.callToActionContainer}>
        <AppButton
          style={[styles.callToAction, { marginRight: 5 }]}
          title={i18n.t('absence.addAbsence')}
          onPress={() => navigation.navigate("AttendanceVacationLeaveAddStep1")}
        ></AppButton>
        <AppButton
          style={[styles.callToAction, { marginLeft: 5 }]}
          title={i18n.t('absence.cancelAbsence')}
          onPress={() => navigation.navigate("AttendanceVacationLeaveCancelStep1")}
        ></AppButton>
      </View>
      <FlatList
        data={absenceDataSource}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <AbsenceListItem
            key={item.id}
            smartCode={item.smartCode}
            description={item.description}
            year={item.year}
            consumed={item.consumed}
            booked={item.booked}
            blocked={item.blocked}
            balance={item.balance}
            onPressAbsenceType={onPressAbsenceType}
            selectedAbsenceType={selectedAbsenceType}
          />
        )}
      />
      <AppModal visible={getEmployeeLeaveSummaryApi.loading} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  callToActionContainer: {
    flexDirection: "row",
  },
  callToAction: {
    flex: 1,
    // flexDirection: "row",
    borderRadius: 5,
  },
});

export default ApplyScreen;
