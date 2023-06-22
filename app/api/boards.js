import { client } from "app/api";
import { authStorage } from "app/auth";
import moment from "moment";

import * as Sentry from 'sentry-expo';

const saveBoardWithFileEndpoint = "UploadCompanyBoardFileByEmployeeIdAsync";

const saveBoardWithFile = async (title, message, eventDate, uri, fileName, mimeType, controller) => {
  const employeeId = await authStorage.getEmployeeId();

  let data = new FormData();
  data.append("employeeId", employeeId.toString());
  data.append("title", title);
  data.append("message", message);
  data.append("eventDate", moment(eventDate).format("DD/MM/YYYY"));
  data.append("file", { uri: uri, type: mimeType, name: fileName }); //TODO: accept more than jpegs

  return client
    .post(saveBoardWithFileEndpoint, data, {
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
  saveBoardWithFile,
};
