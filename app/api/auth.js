import { client } from "app/api";
import * as Sentry from "sentry-expo";

const login = (email, password) => {
  return client
    .get("/UserAuthenticateAsync", {
      params: {
        domain: "IXXALL",
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

export default {
  login, getDomainAndUrl
};
