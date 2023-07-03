import React, {useEffect, useState} from "react";
import { StyleSheet, View } from "react-native";

import {AppMenuButton, AppScreen, AppStatusIcon, AppText} from "app/components";
import i18n from "../../constants/i18n";
import { defaultStyles } from "app/config";
import {absencesApi} from "../../api";

function AttendanceVacationLeaveAddDone({ route, navigation }) {
  const [absenceDataSource, setAbsenceDataSource] = useState([]);
  const getEmployeeLeaveSummary = useApi(absencesApi.getEmployeeLeaveSummary);
  useEffect(() => {
    // navigation.popToTop();
    loadAbsenceLeave()
    return () => {}; //this handles unmounted component memory leak
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppMenuButton/>,
      headerRight: () => <AppMenuButton onPress={() => handleBook()} title={i18n.t('absence.complete')} />,
    });
  }, []);
  const loadAbsenceLeave = async () => {
    //TODO: done for demo purposes and should be removed at a later stage
    const response = await getEmployeeLeaveSummary.request();
    if(response.status == 200){
      if(response?.data){
        console.log(response.data)
        let tmp = {
          balance : 0,
          booked: 0,
          consumed: 0,
          blocked: 0
        }
        for(let i = 0; i < response.data.length; i++){
          tmp['balance'] += response.data[i].balance;
          tmp['booked'] += response.data[i].booked;
          tmp['consumed'] += response.data[i].consumed;
          tmp['blocked'] += response.data[i].blocked;
        }
        console.log(tmp);
        setAbsenceDataSource(tmp);
      }
    }
  };

  const handleBook = () => {
    navigation.navigate("ApplyScreen");
  }

  return (
    <AppScreen style={styles.container}>
      <View style={styles.horizontalCenter}>
        <AppStatusIcon status={true} />
        <AppText>{i18n.t('absence.booked')}</AppText>
      </View>
      <View style={styles.balance}>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.balance')}:</AppText>
            <AppText style={[styles.label, styles.labelLeft]}>{absenceDataSource.balance}</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.booked')}:</AppText>
            <AppText style={[styles.label, styles.labelLeft]}>{absenceDataSource.booked}</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowDetails}>
            <AppText style={[styles.label, styles.labelRight]}>{i18n.t('absence.remaining')}:</AppText>
            <AppText style={[styles.label, styles.labelLeft]}>{absenceDataSource.balance - absenceDataSource.booked}</AppText>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  balance: {
    marginTop: 50,
  },
  container: {
    padding: 10,
    backgroundColor: defaultStyles.colors.white,
  },
  horizontalCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flexDirection: "row",
    flex: 1,
  },
  labelRight: {
    textAlign: "right",
    marginRight: 10,
    fontWeight: "bold",
  },
  labelLeft: {
    textAlign: 'left'
  },
  row: {
    marginLeft: 10,
    justifyContent: "center",
  },
  rowDetails: { flexDirection: "row" },
});

export default AttendanceVacationLeaveAddDone;
