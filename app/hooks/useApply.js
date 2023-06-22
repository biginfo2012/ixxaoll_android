import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Sentry from "sentry-expo";
import { absencesApi } from "app/api";

export default useApply = () => {
  const [employeeLeaveSummary, setEmployeeLeaveSummary] = useState([]);
  const [selectedAbsenceType, setSelectedAbsenceType] = useState();

  const getEmployeeLeaveSummaryApi = useApi(absencesApi.getEmployeeLeaveSummary);

  useEffect(() => {
    loadEmployeeLeaveSummary();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  const loadEmployeeLeaveSummary = async () => {
    const response = await getEmployeeLeaveSummaryApi.request();

    if (response?.data && response?.status === 200) {
      let summary = response?.data;

      setEmployeeLeaveSummary(summary);
    } else {
      Alert.alert("Error", "An error has occurred. Please try again.");
      Sentry.Native.captureException(new Error("LoadEmployeeLeaveSummary: Error encountered."));
    }
  };

  const onPressAbsenceType = (absenceType) => {
    setSelectedAbsenceType(absenceType);
  };



  return { getEmployeeLeaveSummaryApi, employeeLeaveSummary, selectedAbsenceType, onPressAbsenceType };
};
