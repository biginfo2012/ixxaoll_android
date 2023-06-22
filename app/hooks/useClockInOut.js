import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { clockingApi } from "app/api";
import authStorage from "../auth/storage";

export default useClockInOut = () => {
  const userCurrentShiftDetails = {
    name: "Flexi",
    time: "00:00 - 23:59",
    break: "01:00",
    date: "03.01.2023",
    day: "workday",
    absence: "no absence",
    calendar: "workday",
  };
  const [isStart, setStartButton] = useState(false);
  const [isStop, setStopButton] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [userShiftDetails, setUserShiftDetails] = useState(userCurrentShiftDetails);
  const getClockingDetailsApi = useApi(clockingApi.getCurrentClockingDetails);
  const setClockingActionApi = useApi(clockingApi.setEmployeeClockingAction);
  const getUserShiftDetails = async () => {
    // setLoading(true);

    const response = await getClockingDetailsApi.request();

    if (response?.data) {
      setUserShiftDetails(response.data);

      response.data.actions?.map((action) => {
        setStartButton(action === "Start");
        setStopButton(action === "Stop");
      });
    } else {
      setHasError(true);
      Sentry.Native.captureException(new Error("GetUserShiftDetails: Error encountered."));
    }

    // setLoading(false);
  };

  const handleActionButton = async () => {
    // setLoading(true);

    const employeeId = await authStorage.getEmployeeId();

    const action = isStart ? "Start" : "Stop";

    const body = {
      employeeId: employeeId,
      action: action,
    };

    const response = await setClockingActionApi.request(body);

    if (response?.data && response.status === 200) {
      getUserShiftDetails();
    } else {
      Alert.alert("Error", "An error has occurred. Please try again.");
      Sentry.Native.captureException(new Error("SetClockingAction: Error encountered."));
    }
    // setLoading(false);
  };

  useEffect(() => {
    getUserShiftDetails();
    return () => {}; //this handles unmounted component memory leak
  }, []);

  return { userShiftDetails, isStart, isStop, isLoading, hasError, handleActionButton };
};
