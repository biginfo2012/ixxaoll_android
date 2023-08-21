import { client } from "app/api";
import { authStorage } from "app/auth";
import * as Sentry from 'sentry-expo';

const downloadTimesheetByMonthEndpoint = "timeAndAttendance/timeManagement/DownloadRosterForEmployeeAsync";
const sendEmailTimesheetByMonthEndpoint = "timeAndAttendance/timeManagement/EmailTimesheetForEmployeeAsync";
const employeeTimesheetEndpoint = "timeAndAttendance/timeManagement/HandleEmployeeTimeSheetAsManagerAsync";
const getShiftRosterEmployeeTimeSheetRequestsAsyncEndPoint = "timeAndAttendance/GetShiftRosterEmployeeTimeSheetRequestsAsync";
const getShiftRosterAsyncEndPoint = "timeAndAttendance/GetShiftRosterAsync";

const downloadTimeSheet = async (monthIndex) => {
  // const employeeId = await authStorage.getUser();
  const employeeId = await authStorage.getEmployeeId();
  client.defaults.baseURL = global.BASE_URL;
  return client.get(downloadTimesheetByMonthEndpoint, { params: { employeeId: employeeId, monthIndex: monthIndex } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

const getTimesheetsForEmployeeAsManager = async (monthIndex) => {
  const employeeId = await authStorage.getEmployeeId();
  client.defaults.baseURL = global.BASE_URL;
  return client.get('timeAndAttendance/timeManagement/GetTimeSheetForEmployeeManagerAsync', { params: { employeeId: employeeId, monthIndex: monthIndex } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
}

const downloadEmailTimesheet = async (monthIndex) => {
  const employeeId = await authStorage.getEmployeeId();
  client.defaults.baseURL = global.BASE_URL;
  return client.get(sendEmailTimesheetByMonthEndpoint, { params: { employeeId: employeeId, monthIndex: monthIndex } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
}

const handleEmployeeTimesheet = async (body) => {
  client.defaults.baseURL = global.BASE_URL;
  return client.post(employeeTimesheetEndpoint, body).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

const getShiftRosterEmployeeTimeSheetRequestsAsync = async (date) => {
  const employeeId = await authStorage.getEmployeeId();
  client.defaults.baseURL = global.BASE_URL;
  return client.get(getShiftRosterEmployeeTimeSheetRequestsAsyncEndPoint, { params: { employeeId: employeeId, date: date } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
}
const getShiftRosterAsync = async (date) => {
  client.defaults.baseURL = global.BASE_URL;
  return client.get(getShiftRosterAsyncEndPoint).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
}
export default {
  downloadTimeSheet,
  getTimesheetsForEmployeeAsManager,
  getShiftRosterEmployeeTimeSheetRequestsAsync,
  handleEmployeeTimesheet,
  getShiftRosterAsync,
  downloadEmailTimesheet
};
