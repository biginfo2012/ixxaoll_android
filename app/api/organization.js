import { client } from "app/api";
import { authStorage } from "app/auth";
import * as Sentry from 'sentry-expo';

const GetActiveOrganizationalChartsThumbnailsEndPoint = "GetActiveOrganizationalChartsThumbnails";
const GetActiveOrganizationalChartByGUIDEndPoint = "GetActiveOrganizationalChartByGUID";

const getActiveOrganizationalChartsThumbnails = async () => {
    client.defaults.baseURL = global.BASE_URL;
    return client.get(GetActiveOrganizationalChartsThumbnailsEndPoint).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
    });
};

const getActiveOrganizationalChartByGUID = async (inGUID) => {
    client.defaults.baseURL = global.BASE_URL;
    return client.get(GetActiveOrganizationalChartByGUIDEndPoint, { params: { inGUID: inGUID } }).catch((err) => {
        Sentry.Native.captureException(err);
        return err;
    });
};

export default {
    getActiveOrganizationalChartsThumbnails,
    getActiveOrganizationalChartByGUID,
};
