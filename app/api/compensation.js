import { client } from "app/api";
import { authStorage } from "app/auth";
import * as Sentry from 'sentry-expo';

const getEmployeePayrollByIDEndPoint = "GetEmployeePayrollByID";
const getEmployeeEmploymentByIDEndPoint = "GetEmployeeEmploymentByID";
const getStatutoryStatusEndPoint = "ixxollsetup/payroll/GetStatutoryStatus";
const getSSCEndPoint = "ixxollsetup/payroll/GetSSC";
const getTaxCalculationEndPoint = "ixxollsetup/payroll/GetTaxCalculation";
const getEmploymentTypesEndPoint = "ixxollsetup/employeemaster/GetEmploymentTypes";
const getEmploymentStatusEndPoint = "ixxollsetup/employeemaster/GetEmploymentStatus";
const GetEmployeePayrollByID = async () => {
    const employeeId = await authStorage.getEmployeeId();
    client.defaults.baseURL = global.BASE_URL;
    return client.get(getEmployeePayrollByIDEndPoint, { params: { eId: employeeId } }).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
    });
};
const GetEmployeeEmploymentByID = async () => {
    const employeeId = await authStorage.getEmployeeId();
    client.defaults.baseURL = global.BASE_URL;
    return client.get(getEmployeeEmploymentByIDEndPoint, { params: { eId: employeeId } }).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
    });
};
const GetStatutoryStatus = async () => {
    client.defaults.baseURL = global.BASE_URL;
    return client.get(getStatutoryStatusEndPoint).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
    });
};
const GetSSC = async () => {
    client.defaults.baseURL = global.BASE_URL;
    return client.get(getSSCEndPoint).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
    });
};
const GetTaxCalculation = async () => {
    client.defaults.baseURL = global.BASE_URL;
    return client.get(getTaxCalculationEndPoint).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
    });
};
const GetEmploymentTypes = async () => {
    client.defaults.baseURL = global.BASE_URL;
    return client.get(getEmploymentTypesEndPoint).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
    });
};
const GetEmploymentStatus = async () => {
    client.defaults.baseURL = global.BASE_URL;
    return client.get(getEmploymentStatusEndPoint).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
    });
};
export default {
    GetEmployeePayrollByID,
    GetEmployeeEmploymentByID,
    GetStatutoryStatus,
    GetSSC,
    GetTaxCalculation,
    GetEmploymentTypes,
    GetEmploymentStatus
};
