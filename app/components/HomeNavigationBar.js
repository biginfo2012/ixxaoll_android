import React, { useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {AppButtonIcon, AppSyncButton, AppLanguagePicker} from "app/components"
import {defaultStyles} from "app/config";

import NotificationContext from "app/store/notification-context";

const HomeNavigationBar = ({ children, navigation, ...otherProps }) => {
  const ctx = useContext(NotificationContext);

  //TODO: done for demo purposes
  // const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {}; //this handles unmounted component memory leak
  }, []);

  //TODO: done for demo purposes
  // const loadEvents = async () => {
  //     const response = await eventsApi.getActiveEvents();
  //     setCount(response?.data?.length ?? 0);
  // };

  return (
    <View style={[defaultStyles.text, styles.container]} {...otherProps}>
      <View style={styles.iconsLeft}>
        <AppButtonIcon
          icon="account-circle"
          onPress={() => navigation.navigate("ProfileUserScreen")}
        ></AppButtonIcon>
      </View>
      <View style={styles.middle}></View>
      <View style={styles.iconsRight}>
        <AppButtonIcon icon="bell" count={ctx.notificationCount} onPress={() => navigation.navigate("Events")}></AppButtonIcon>
        <AppSyncButton icon="sync" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  iconsLeft: {
    flex: 1,
  },
  iconsRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "flex-end",
  },
  middle: {
    flex: 2,
  },
});

export default HomeNavigationBar;
