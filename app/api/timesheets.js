import { client } from "app/api";
import { authStorage } from "app/auth";
import * as Sentry from 'sentry-expo';

const downloadTimesheetByMonthEndpoint = "timeAndAttendance/timeManagement/DownloadRosterForEmployeeAsync";
const sendEmailTimesheetByMonthEndpoint = "timeAndAttendance/timeManagement/EmailTimesheetForEmployeeAsync";
const employeeTimesheetEndpoint = "timeAndAttendance/timeManagement/HandleEmployeeTimeSheetAsManagerAsync";

const downloadTimeSheet = async (monthIndex) => {
  // const employeeId = await authStorage.getUser();
  const employeeId = await authStorage.getEmployeeId();
  return client.get(downloadTimesheetByMonthEndpoint, { params: { employeeId: employeeId, monthIndex: monthIndex } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

const getTimesheetsForEmployeeAsManager = async (monthIndex) => {
  const employeeId = await authStorage.getEmployeeId();
  
  return client.get('timeAndAttendance/timeManagement/GetTimeSheetForEmployeeManagerAsync', { params: { employeeId: employeeId, monthIndex: monthIndex } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
}

const downloadEmailTimesheet = async (monthIndex) => {
  const employeeId = await authStorage.getEmployeeId();
  return client.get(sendEmailTimesheetByMonthEndpoint, { params: { employeeId: employeeId, monthIndex: monthIndex } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
}

const handleEmployeeTimesheet = async (body) => {
  return client.post(employeeTimesheetEndpoint, body).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

export default {
  downloadTimeSheet,
  getTimesheetsForEmployeeAsManager,
  handleEmployeeTimesheet,
  downloadEmailTimesheet
};
