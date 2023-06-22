import { client } from "app/api";
import { authStorage } from "app/auth";
import * as Sentry from 'sentry-expo';

const getCompanyBoardsEndPoint = "GetCompanyBoardsByEmployeeIDAsync";
const getCompanyBoardsById = "GetAllCompanyBoards";
const SaveCompanyBoardById = "SaveCompanyBoardById";

const getCompanyBoards = async () => {
  const employeeId = await authStorage.getEmployeeId();
  return client.get(getCompanyBoardsEndPoint, { params: { eId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

const getCompanyBoardsByEmployee = async () => {
  const employeeId = await authStorage.getEmployeeId();
  return client.get(getCompanyBoardsById, { params: { eId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

const saveCompanyBoardById = async (body) => {
  return client.post(SaveCompanyBoardById, body).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  });
};

export default {
  getCompanyBoards,
  getCompanyBoardsByEmployee,
  saveCompanyBoardById,
};
