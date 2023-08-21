import React, {useEffect, useState} from "react";
import i18n from '../constants/i18n';
import { View, StyleSheet, FlatList } from "react-native";

import { AppText, ListItem, AppIcon, AppScreen } from "app/components";
import { useCompensation } from "app/hooks";
import { defaultStyles } from "app/config";
import {compensationApi} from "app/api";

const CompensationScreen = ({ navigation }) => {
  const { items } = useCompensation();
  const [data, setData] = useState({});
  const [statutoryStatusData, setStatutoryStatusData] = useState(null);
  const [percentageHours, setPercentageHours] = useState(null);
  const [sscStatusData, setSscStatusData] = useState(null);
  const [taxCalculationData, setTaxCalculationData] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [employmentStatus, setEmploymentStatus] = useState(null);
  const GetEmployeePayrollByID = useApi(compensationApi.GetEmployeePayrollByID);
  const GetEmployeeEmploymentByID = useApi(compensationApi.GetEmployeeEmploymentByID);
  const GetStatutoryStatus = useApi(compensationApi.GetStatutoryStatus);
  const GetSSC = useApi(compensationApi.GetSSC);
  const GetTaxCalculation = useApi(compensationApi.GetTaxCalculation);
  const GetEmploymentTypes = useApi(compensationApi.GetEmploymentTypes);
  const GetEmploymentStatus = useApi(compensationApi.GetEmploymentStatus);
  const getEmployeePayrollByID = async () => {
    const response1 = await GetEmployeePayrollByID.request();
    debugger
    let data1 = response1.data
    setData(response1.data);
    let statutoryStatusTmp = data1?.statutoryStatus
    if(statutoryStatusTmp){
      const response2 = await GetStatutoryStatus.request();
      let data2 = response2.data
      let obj = data2.find(item => item.id === statutoryStatusTmp)
      setStatutoryStatusData(obj ? obj.name : null)
    }
    let sscStatusTmp = data1?.sscStatus
    if(sscStatusTmp){
      const response3 = await GetSSC.request();
      let data3 = response3.data;
      let obj = data3.find(item => item.id === sscStatusTmp)
      setSscStatusData(obj ? obj.code : null)
    }
    let taxCalculationTmp = data1?.taxCalculation;
    if(taxCalculationTmp){
      const response4 = await GetTaxCalculation.request();
      let data4 = response4.data;
      let obj = data4.find(item => item.id === taxCalculationTmp)
      setTaxCalculationData(obj ? obj.name : null)
    }
  };
  const getEmployeeEmploymentByID = async () => {
    const response1 = await GetEmployeeEmploymentByID.request();
    debugger
    let data1 = response1.data
    setPercentageHours(parseInt(data1?.percentageHours))
    let jobTypeIdTmp = data1?.jobTypeId;
    if(jobTypeIdTmp){
      const response2 = await GetEmploymentTypes.request();
      let data2 = response2.data
      let obj = data2.find(item => item.id === jobTypeIdTmp)
      setJobType(obj ? obj.code : null)
    }
    let employmentStatusIdTmp = data1?.employmentStatusId
    if(employmentStatusIdTmp){
      const response3 = await GetEmploymentStatus.request();
      let data3 = response3.data
      let obj = data3.find(item => item.id === employmentStatusIdTmp)
      setEmploymentStatus(obj ? obj.description : null)
    }
  };
  useEffect(() => {
    getEmployeePayrollByID();
    getEmployeeEmploymentByID();
    return () => {}; //this handles unmounted component memory leak
  }, []);
  return (
    <AppScreen style={styles.container}>
      <AppText style={[defaultStyles.title, defaultStyles.title]}>{i18n.t('compensation.title')}</AppText>
      {/* <AppText>{i18n.t('compensation.module_not_loaded')}</AppText> */}
      <View style={styles.detailsContainer}>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.contract_type')}: </AppText>{employmentStatus}</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.employment_type')}: </AppText>{jobType}</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.salary')}: </AppText>€{data?.annualSalary}</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.hours')} %: </AppText> {percentageHours}%</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.tax')}: </AppText>{taxCalculationData}</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.ssc')}: </AppText>{sscStatusData}</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.status')}: </AppText>{statutoryStatusData}</AppText>
      </View>
      <FlatList
        data={items}
        keyExtractor={(menuItem) => menuItem.title}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            IconComponent={
            <AppIcon
              icon={item.icon}
              size={20}
              margin={20}
              color={defaultStyles.colors.medium}
            />
            }
            onPress={() => {
              navigation.navigate(item.link);
            }}
          />
        )}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    margin: 10
  },
  listContainer: {
    marginTop: 25
  },
  detailsContainer: {
    marginHorizontal: 15,
  },
  detailsContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CompensationScreen;
