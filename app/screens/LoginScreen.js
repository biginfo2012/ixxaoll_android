import React, {useState, useContext, useEffect} from "react";
import {StyleSheet, ScrollView, View, Keyboard, KeyboardEvent} from "react-native";
import * as Yup from "yup";

import {AppScreen, ActivityIndicator} from "app/components";

import {ErrorMessage, Form, FormField, SubmitButton} from "app/components/forms";

import {authApi} from "app/api";
import {AuthContext, authStorage} from "app/auth";

import {defaultStyles} from "app/config";
import i18n from "../constants/i18n";

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().min(4).label("Password"),
    url: Yup.string().required().label("Url"),
    port: Yup.string().required().label("Port")
});
const validationSchemaOrigin = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().min(4).label("Password"),
});

const LoginScreen = (props) => {
    const authContext = useContext(AuthContext);
    const loginApi = useApi(authApi.login);
    const getDomainAndUrlApi = useApi(authApi.getDomainAndUrl);
    const getDomainsAsync = useApi(authApi.getDomainsAsync);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getLink();
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

        return () => {
            Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
        };
    }, []);

    const overlayStyle = { height: 10 };
    function onKeyboardDidShow(e: KeyboardEvent) {
        setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
        setKeyboardHeight(0);
    }
    const getLink = async () => {
        const link = await authStorage.getLink();
        if (link != undefined && link != null && link != "") {
            setLoginSuccess(true);
            global.BASE_URL = link;
        }
    }

    const handleSubmit = async ({username, password, url, port}) => {
        let orginBaseUrl = global.BASE_URL
        let baseUrl = url + ':' + port + '/';
        debugger
        global.BASE_URL = baseUrl;
        const result1 = await getDomainsAsync.request();
        let domain = result1.data[0]
        global.DOMAIN = domain
        const result = await loginApi.request(username, password);
        if (result?.status !== 200) {
            setErrorMessage("Invalid username and/or password.");
            global.BASE_URL = orginBaseUrl;
            return setLoginFailed(true);
        }

        let user = result?.data?.data;

        if (user?.employeeId === 0) {
            setErrorMessage("Login failed.");
            global.BASE_URL = orginBaseUrl;
            return setLoginFailed(true);
        }
        authStorage.storeLink(baseUrl);
        authContext.setUser(user !== null ? user : {});
        authStorage.storeToken(user !== null ? user.token : "");
        authStorage.storeEmployeeId(user !== null ? user.employeeId : 0);


        // if (result.status !== 200) {
        //   setErrorMessage('Invalid username and/or password.')
        //   return setLoginFailed(true);
        // }

        if (user?.employeeId === 0) {
          setErrorMessage('Login failed.');
          return setLoginFailed(true);
        }

        // // const user = jwtDecode(result.data);

        // authContext.setUser(user !== null ? user : {});
        // authStorage.storeToken(user !== null ? user.token : "");
        // authStorage.storeEmployeeId(user !== null ? user.employeeId : 0)

        //TODO: add progress bar
        //TODO: this function to redo with actual token and actual value
        //TODO: show error message when login failed
        //TODO: Add form as scroll view
    };
    const handleSubmitOrigin = async ({username, password}) => {
        let orginBaseUrl = global.BASE_URL
        const result = await loginApi.request(username, password);
        debugger
        if (result?.status !== 200) {
            setErrorMessage("Invalid username and/or password.");
            global.BASE_URL = orginBaseUrl;
            return setLoginFailed(true);
        }

        let user = result?.data?.data;

        if (user?.employeeId === 0) {
            setErrorMessage("Login failed.");
            global.BASE_URL = orginBaseUrl;
            return setLoginFailed(true);
        }
        authContext.setUser(user !== null ? user : {});
        authStorage.storeToken(user !== null ? user.token : "");
        authStorage.storeEmployeeId(user !== null ? user.employeeId : 0);


        // if (result.status !== 200) {
        //   setErrorMessage('Invalid username and/or password.')
        //   return setLoginFailed(true);
        // }

        if (user?.employeeId === 0) {
          setErrorMessage('Login failed.');
          return setLoginFailed(true);
        }

        // // const user = jwtDecode(result.data);

        // authContext.setUser(user !== null ? user : {});
        // authStorage.storeToken(user !== null ? user.token : "");
        // authStorage.storeEmployeeId(user !== null ? user.employeeId : 0)

        //TODO: add progress bar
        //TODO: this function to redo with actual token and actual value
        //TODO: show error message when login failed
        //TODO: Add form as scroll view
    };

    const isValidIP = (ip) => {
        var regEx = new RegExp(
            "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\." +
            "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\." +
            "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\." +
            "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
        );
        return regEx.test(ip);
    }

    return (
        <View style={{ flex: 1 }}>
            <ActivityIndicator visible={loginApi.loading}/>
            <AppScreen style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.formContainer}>
                        {loginSuccess ? (
                            <Form initialValues={{username: "", password: ""}}
                                  onSubmit={handleSubmitOrigin} validationSchema={validationSchemaOrigin}>
                                <ErrorMessage error={i18n.t('login.invalid')} visible={loginFailed}/>
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
                                <SubmitButton title={i18n.t('login.login')}/>
                            </Form>
                        ) : (
                            <Form initialValues={{username: "", password: "", url: "", port: ""}}
                                  onSubmit={handleSubmit} validationSchema={validationSchema}>
                                <ErrorMessage error={i18n.t('login.invalid')} visible={loginFailed}/>
                                <FormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="link"
                                    keyboardType="default"
                                    name="url"
                                    placeholder={i18n.t('login.url')}
                                    textContentType="none"
                                    returnKeyType="next"
                                />
                                <FormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="usb"
                                    keyboardType="default"
                                    name="port"
                                    placeholder={i18n.t('login.port')}
                                    textContentType="none"
                                    returnKeyType="next"
                                />
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
                                <SubmitButton title={i18n.t('login.login')}/>
                            </Form>
                        )}
                    </View>
                </ScrollView>
            </AppScreen>
            {keyboardHeight > 0 && <View style={[styles.overlay, overlayStyle]} />}
        </View>
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
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
});

export default LoginScreen;
