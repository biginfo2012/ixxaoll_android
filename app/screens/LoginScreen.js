import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import * as Yup from "yup";

import { AppScreen, ActivityIndicator } from "app/components";

import { ErrorMessage, Form, FormField, SubmitButton } from "app/components/forms";

import { authApi } from "app/api";
import { AuthContext, authStorage } from "app/auth";

import { defaultStyles } from "app/config";
import i18n from "../constants/i18n";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoginScreen = (props) => {
  const authContext = useContext(AuthContext);
  const loginApi = useApi(authApi.login);

  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async ({ username, password }) => {
    const result = await loginApi.request(username, password);

    if (result?.status !== 200) {
      setErrorMessage("Invalid username and/or password.");
      return setLoginFailed(true);
    }

    let user = result?.data?.data;

    if (user?.employeeId === 0) {
      setErrorMessage("Login failed.");
      return setLoginFailed(true);
    }

    authContext.setUser(user !== null ? user : {});
    authStorage.storeToken(user !== null ? user.token : "");
    authStorage.storeEmployeeId(user !== null ? user.employeeId : 0);


    // if (result.status !== 200) {
    //   setErrorMessage('Invalid username and/or password.')
    //   return setLoginFailed(true);
    // }

    // if (user?.employeeId === 0) {
    //   setErrorMessage('Login failed.');
    //   return setLoginFailed(true);
    // }

    // // const user = jwtDecode(result.data);

    // authContext.setUser(user !== null ? user : {});
    // authStorage.storeToken(user !== null ? user.token : "");
    // authStorage.storeEmployeeId(user !== null ? user.employeeId : 0)

    //TODO: add progress bar
    //TODO: this function to redo with actual token and actual value
    //TODO: show error message when login failed
    //TODO: Add form as scroll view
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <AppScreen style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <Form initialValues={{ username: "", password: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
              <ErrorMessage error={i18n.t('login.invalid')} visible={loginFailed} />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                keyboardType="default"
                name="username"
                placeholder={i18n.t('login.username')}
                textContentType="none"
                returnKeyType="next"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder={i18n.t('login.password')}
                secureTextEntry
                textContentType="password"
                returnKeyType="done"
              />
              <SubmitButton title={i18n.t('login.login')} />
            </Form>
          </View>
        </ScrollView>
      </AppScreen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
});

export default LoginScreen;