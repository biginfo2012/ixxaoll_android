import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import { AppNavigator, AuthNavigator } from "ixxoll-app/app/navigation";
import { AuthContext, authStorage } from "app/auth";
import { LanguageProvider } from './app/contexts/LanguageContext';
import NotificationContext from "app/store/notification-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { eventsApi } from "app/api";

import { LogBox } from "react-native";

import * as Sentry from 'sentry-expo';


Sentry.init({
  dsn: 'https://79d830e4a9f14849b00b53a641103cfc@o4505515973672960.ingest.sentry.io/4505515980750848',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  tracesSampleRate: 1.0
});

//TODO: Include usememo wherever possible throughout the app
export default function App() {
  
  LogBox.ignoreLogs(["Warning: ..."]); //Hide warnings
  LogBox.ignoreAllLogs(); //Hide all warning notifications on front-end

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const [notificationCount, setNotificationCount] = useState(0);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);

    //TODO: we should decode JWT Token here
  };

  const getNotificationsCount = async () => {
    const response = await eventsApi.getActiveEvents();
    setNotificationCount(response?.data?.length || 0);
  };

  const onSetNotificationHandler = (count) => {
    setNotificationCount(count);
  };

  if (!isReady) {
    return <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} onError={console.warn} />;
  }

  getNotificationsCount();

  return (
    <ActionSheetProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <NotificationContext.Provider
          value={{ notificationCount: notificationCount, onSetNotificationCount: onSetNotificationHandler }}
        >
          <LanguageProvider>
            <NavigationContainer>{user ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>
          </LanguageProvider>
        </NotificationContext.Provider>
      </AuthContext.Provider>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
