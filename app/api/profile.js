import { client } from "app/api";
import { authStorage } from "app/auth";
import * as Sentry from 'sentry-expo';

const getEmployeeDetailsByIdEndPoint = "GetEmployeeDetailsById";
const getProfileDefaultsByIdEndPoint = "GetProfileDefaultsByEmployeeIdAsync";
const getDomainsDataSourceEndPoint = "GetDomainsAsync";
const getCompaniesByDomainEndPoint = "GetCompaniesByDomainNameAsync";
const getUserDomainAndCompanyEndpoint = "GetDomainAndCompanyByEmployeeIdAsync";

// const employeeId = await authStorage.getUser();
const getProfileDetails = async () => {
  const employeeId = await authStorage.getEmployeeId();
  return client.get(getEmployeeDetailsByIdEndPoint, { params: { eId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  }); //TODO:
};

const getProfileDefaults = async () => {
  const employeeId = await authStorage.getEmployeeId();
  return client.get(getProfileDefaultsByIdEndPoint, { params: { eId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  }); //TODO:
};

const getDomainsDataSource = async () => {
  return client.get(getDomainsDataSourceEndPoint).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  }); //TODO:
};

const getCompaniesByDomainDataSource = async (domain) => {
  return client.get(getCompaniesByDomainEndPoint, { params: { domain: domain } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  }); //TODO:
};

const getUserDomainAndCompany = async () => {
  const employeeId = await authStorage.getEmployeeId();
  return client.get(getUserDomainAndCompanyEndpoint, { params: { employeeId: employeeId } }).catch((err) => {
    Sentry.Native.captureException(err);
    return err;
  }); //TODO:
};

export default {
  getProfileDetails,
  getProfileDefaults,
  getDomainsDataSource,
  getCompaniesByDomainDataSource,
};
