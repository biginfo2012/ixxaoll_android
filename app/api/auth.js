import { client } from "app/api";
import * as Sentry from "sentry-expo";

const getDomainsAsyncEndPoint = "GetDomainsAsync";

const login = (email, password) => {
  client.defaults.baseURL = global.BASE_URL;
  return client
    .get("/UserAuthenticateAsync", {
      params: {
        domain: global.DOMAIN,
        company: "test",
        username: email,
        password: password,
      },
    })
    .catch((err) => {
      console.log(err);
      Sentry.Native.captureException(err);
      return err;
    });
};
const getDomainAndUrl = (email, password) => {
  client.defaults.baseURL = global.BASE_URL;
  return client
      .get("/GetUrlAndPortByUserCredentialsForMobile", {
        params: {
          username: email,
          password: password,
        },
      })
      .catch((err) => {
        console.log(err);
        Sentry.Native.captureException(err);
        return err;
      });
};

const getDomainsAsync = (email, password) => {
    client.defaults.baseURL = global.BASE_URL;
    return client
        .get(getDomainsAsyncEndPoint)
        .catch((err) => {
            console.log(err);
            Sentry.Native.captureException(err);
            return err;
        });
};

export default {
  login, getDomainAndUrl, getDomainsAsync
};
