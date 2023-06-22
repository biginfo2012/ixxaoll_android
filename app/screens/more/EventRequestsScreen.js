import React, { useEffect } from "react";
import { StyleSheet, ToastAndroid, View, FlatList } from "react-native";
import i18n from "../../constants/i18n";
import { AppScreen, ListItem, ActivityIndicator } from "app/components";

import { eventsApi } from "app/api";

const menuItems = [
  {
    title: i18n.t("more.expenseRefund"),
    name: "EventRequestsScreen",
  },
  {
    title: i18n.t("more.travelExpense"),
    name: "Travel Expense",
  },
  {
    title: i18n.t("more.medicalExpense"),
    name: "Medical Expense",
  },
];

const EventRequestsScreen = ({ navigation }) => {
  const triggerEventApi = useApi(eventsApi.triggerEventRequest);

  useEffect(() => {
    return () => {}; //this handles unmounted component memory leak
  }, []);

  const handleEventRequest = async (eventName) => {
    const response = await triggerEventApi.request(eventName);

    ToastAndroid.show(response.status === 200 ? "Event Request created successfully" : "An issue has been encountered.", ToastAndroid.SHORT);
  };

  return (
    <AppScreen>
      <ActivityIndicator visible={triggerEventApi.loading} />
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => {
                handleEventRequest(item.name);
              }}
            />
          )}
        ></FlatList>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: "space-between",
    flex: 1,
  },
});

export default EventRequestsScreen;
