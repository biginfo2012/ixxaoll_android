import { client } from "app/api";
import { authStorage } from "app/auth";
import * as Sentry from 'sentry-expo';

const getEmployeeBoardsById = "GetAllEmployeeBoards";
const SaveEmployeeBoardById = "SaveEmployeeBoardById";

const getEmployeeBoardsByEmployee = async () => {
  // const employeeId = await authStorage.getUser();
  const employeeId = await authStorage.getEmployeeId();
  client.defaults.baseURL = global.BASE_URL;
  return client.get(getEmployeeBoardsById, { params: { employeeId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

const saveEmployeeBoardById = async (body) => {
  client.defaults.baseURL = global.BASE_URL;
  return client.post(SaveEmployeeBoardById, body).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

export default {
  getEmployeeBoardsByEmployee,
  saveEmployeeBoardById,
};
