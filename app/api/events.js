import { client } from "app/api";
import { authStorage } from "app/auth";
import * as Sentry from 'sentry-expo';

const getActiveEventsEndPoint = "GetEventsLastSyncedByEmployeeIDAsync";
const getEventEndPoint = "GetEventByNameAndEmployeeIdAsync";
const saveEventEndPoint = "SaveEventByEventAndEmployeeId";
const uploadFileEndPoint = "UploadEventFilesByBlockAndEmployeeIdAsync";
const triggerEventsRequestEndpoint = "RequestEventForEmployeeIdMobileAsync?employeeId=1&eventName=";

const getActiveEvents = async () => {
  const employeeId = await authStorage.getEmployeeId();
  client.defaults.baseURL = global.BASE_URL;
  return client.get(getActiveEventsEndPoint, { params: { eId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

const getEvent = async (inName) => {
  const employeeId = await authStorage.getEmployeeId();
  client.defaults.baseURL = global.BASE_URL;
  return client.get(getEventEndPoint, { params: { employeeId: employeeId, inName: inName } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
  //TODO: Parameterize inName
};

const saveEvent = (event) => {
  client.defaults.baseURL = global.BASE_URL;
  return client.post(saveEventEndPoint, event).catch((err) => {
    Sentry.Native.captureException(err);
    console.log(err);
    return err;
  });
};

const triggerEventRequest = async (eventName) => {

const endpoint = triggerEventsRequestEndpoint + eventName;
  client.defaults.baseURL = global.BASE_URL;
  return client
    .post(endpoint, eventName)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      Sentry.Native.captureException(err);
      return err;
    });
};

const uploadFile = async (blockIds, eventId, uri, fileName, controller) => {
  const employeeId = await authStorage.getEmployeeId();

  let data = new FormData();
  data.append("employeeId", employeeId.toString());
  data.append("eventId", eventId.toString());
  data.append("blockIds", blockIds.toString());
  data.append("eventFiles", { uri: uri, type: "application/pdf", name: fileName });
  client.defaults.baseURL = global.BASE_URL;
  return client
    .post(uploadFileEndPoint, data, {
      headers: { Accept: "application/json", "Content-Type": "multipart/form-data" },
      signal: controller.signal,
      transformRequest: (formData) => formData,
    })
    .catch((err) => {
      Sentry.Native.captureException(err);
      return err;
    });
};

export default {
  getActiveEvents,
  getEvent,
  saveEvent,
  triggerEventRequest,
  uploadFile,
};
