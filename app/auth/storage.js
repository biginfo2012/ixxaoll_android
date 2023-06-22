import * as SecureStore from "expo-secure-store";
import * as Sentry from 'sentry-expo';

const key = "AuthToken";
const eId = "employeeId";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(authToken));
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error setting the auth token", error);
  }
};

const storeEmployeeId = async (employeeId) => {
  try {
    await SecureStore.setItemAsync(eId, JSON.stringify(employeeId));
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error setting the employeeId", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error getting the auth token", error);
  }
};

const getEmployeeId = async () => {
  try {
    return await SecureStore.getItemAsync(eId);
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error getting the employeeId", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  // TODO: return (token) ? jwtDecode(token) : null
  return token ? token : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error removing the auth token", error);
  }
};

//Function to store userdata locally
const storeProfileDetails = async (profile) => {
  try {
    await SecureStore.setItemAsync("profileDetails", JSON.stringify(profile));
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error setting profile details", error);
  }
};

//Get Profile from storage locally
const getUserProfileDetails = async () => {
  try {
    return await SecureStore.getItemAsync("profileDetails");
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error getting the profiles details", error);
  }
};

//use this function to return userdata/profile
const getProfileDetails = async () => {
  const profileDetails = await getUserProfileDetails();
  return profileDetails ? profileDetails : null;
};

//Function to store userdata locally
const storeProfileDefaults = async (profile) => {
  try {
    await SecureStore.setItemAsync("profileDefaults", JSON.stringify(profile));
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error setting profile defaults", error);
  }
};

//Get Profile from storage locally
const getUserProfileDefaults = async () => {
  try {
    return await SecureStore.getItemAsync("profileDefaults");
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error getting the profiles defaults", error);
  }
};

//use this function to return userdata/profile
const getProfileDefaults = async () => {
  const profileDefaults = await getUserProfileDefaults();
  return profileDefaults ? profileDefaults : null;
};

//TODO: the function below has been created for demo purposes only and should be cleaned later
const getVacationLeave = async () => {
  try {
    return await SecureStore.getItemAsync("tempVacationLeave");
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error getting the vacation leave token", error);
  }
};

//TODO: the function below has been created for demo purposes only and should be cleaned later
const storeVacationLeave = async (vacationLeave) => {
  try {
    await SecureStore.setItemAsync("tempVacationLeave", JSON.stringify(vacationLeave));
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error setting the vacation leave", error);
  }
};

//TODO: the function below has been created for demo purposes only and should be cleaned later
const getAbsenceLeave = async () => {
  try {
    return await SecureStore.getItemAsync("tempAbsenceLeave");
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error getting the Absence leave token", error);
  }
};

//TODO: the function below has been created for demo purposes only and should be cleaned later
const storeAbsenceLeave = async (AbsenceLeave) => {
  try {
    await SecureStore.setItemAsync("tempAbsenceLeave", AbsenceLeave);
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error setting the Absence leave", error);
  }
};

//TODO: the function below has been created for demo purposes only and should be cleaned later
const getBackgroundCoverUri = async () => {
  try {
    return await SecureStore.getItemAsync("backgroundCoverUri");
  } catch (error) {
    console.log("Error getting the Background Cover Uri", error);
  }
};

//TODO: the function below has been created for demo purposes only and should be cleaned later
const storeBackgroundCoverUri = async (imageUri) => {
  try {
    await SecureStore.setItemAsync("backgroundCoverUri", imageUri);
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error setting the Background Cover Uri", error);
  }
};

const storeLocale = async (locale) => {
  try {
    await SecureStore.setItemAsync("locale", locale);
  } catch (error) {
    console.log("Error setting the Background Cover Uri", error);
  }
}

const getLocale = async () => {
  try {
    return await SecureStore.getItemAsync("locale");
  } catch (error) {
    console.log("Error getting the employeeId", error);
  }
}
const storeDomain = async (domain) => {
  try {
    await SecureStore.setItemAsync('domain', domain);
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error setting the domain", error);
  }
};

const getDomain = async () => {
  try {
    return await SecureStore.getItemAsync('domain');
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error getting the domain", error);
  }
};

const storeOrganisation = async (organisation) => {
  try {
    await SecureStore.setItemAsync('organisation', organisation);
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error setting the organisation", error);
  }
};

const getOrganisation = async () => {
  try {
    return await SecureStore.getItemAsync('organisation');
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log("Error getting the organisation", error);
  }
};

export default {
  getUser,
  storeToken,
  removeToken,
  getVacationLeave,
  storeVacationLeave,
  getAbsenceLeave,
  storeAbsenceLeave,
  getBackgroundCoverUri,
  storeBackgroundCoverUri,
  storeProfileDefaults,
  getProfileDefaults,
  storeProfileDetails,
  getProfileDetails,
  storeLocale,
  getLocale,
  storeEmployeeId,
  getEmployeeId,
  storeDomain,
  getDomain,
  storeOrganisation,
  getOrganisation
};
