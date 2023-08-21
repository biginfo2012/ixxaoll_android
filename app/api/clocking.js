import { client } from "app/api";
import { authStorage } from "app/auth";
import * as Sentry from 'sentry-expo';

const getCurrentClockingEndpoint = "timeAndAttendance/timeManagement/GetCurrentClockingDetailsAsync";
const setClockingActionEndpoint = "timeAndAttendance/timeManagement/SetEmployeeClockingActionAsync";

const getCurrentClockingDetails = async () => {
  client.defaults.baseURL = global.BASE_URL;
  return client.get(getCurrentClockingEndpoint).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

const setEmployeeClockingAction = async (body) => {
    client.defaults.baseURL = global.BASE_URL;
    return client.post(setClockingActionEndpoint, body).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
      });
}


export default {
    getCurrentClockingDetails,
    setEmployeeClockingAction
};
