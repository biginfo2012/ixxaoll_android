import { authStorage } from "app/auth";
import { client, useAbsencesDummyData } from "app/api";
import * as Sentry from 'sentry-expo';

const getAbsencesByEmployeeIdEndPoint = "GetAbsencesByEmployeeId";
const getEmployeeLeaveSummaryEndPoint = "GetEmployeeLeaveSummary";
const getEmployeeLeaveRequestListEndPoint = "GetEmployeeLeaveRequestList";
const saveEmployeeLeaveWithAttachmentEndPoint = "SaveEmployeeLeaveWithAttachment";
const saveEmployeeLeaveEndPoint = "SaveEmployeeLeave";

const getAbsences = async () => {
  const { dummyData } = useAbsencesDummyData();

  if (dummyData) {
    return dummyData;
  }

  const employeeId = await authStorage.getEmployeeId();
  return client.get(getAbsencesByEmployeeIdEndPoint, { params: { eId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

const getEmployeeLeaveSummary = async () => {
  const employeeId = await authStorage.getEmployeeId();
  return client.get(getEmployeeLeaveSummaryEndPoint, { params: { eId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
}
const getEmployeeLeaveRequestList = async () => {
  const employeeId = await authStorage.getEmployeeId();
  return client.get(getEmployeeLeaveRequestListEndPoint, { params: { eId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
}
const saveEmployeeLeave = (employeeId, dateFrom, dateTo, startTime, endTime, reason, comments, hours, uri, fileName, mimeType, controller) => {
  let data = new FormData();
  data.append('EmployeeId', employeeId);
  data.append('SmartCode', 0);
  data.append('DateFrom', dateFrom);
  data.append('DateTo', dateTo);
  data.append('StartTime', startTime);
  data.append('EndTime', endTime);
  data.append('Reason', reason);
  data.append('Comments', comments);
  data.append('Hours', hours == "" ? 0 : hours);
  data.append('LeaveFilePath', '');
  data.append('LeaveFile', { uri: uri, type: mimeType, name: fileName }); //TODO: accept more than jpegs
  if(uri == undefined || uri == ""){
    let body = {
      employeeId: employeeId,
      smartCode: 0,
      dateFrom: dateFrom,
      dateTo: dateTo,
      startTime: startTime,
      endTime: endTime,
      reason: reason,
      comments: comments,
      hours: hours == "" ? 0 : hours,
      leaveFile : ""
    };
    return client.post(saveEmployeeLeaveEndPoint, body, {
          headers: {
            'Content-Type': 'application/json'
          },
      }).catch((err) => {
      Sentry.Native.captureException(err);
      return err;
    });
  }

  return client
      .post(saveEmployeeLeaveWithAttachmentEndPoint, data, {
        headers: { Accept: "application/json", "Content-Type": "multipart/form-data" },
        signal: controller.signal,
        transformRequest: (formData) => formData,
      })
      .catch((err) => {
        Sentry.Native.captureException(err);
        return err;
      });
}
export default {
  getAbsences,
  getEmployeeLeaveSummary,
  getEmployeeLeaveRequestList,
  saveEmployeeLeave
};
