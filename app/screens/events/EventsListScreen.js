import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";

import { AppScreen, AppText, ListItem } from "app/components";

import { eventsApi } from "app/api";
import { NotificationContext } from "app/store";
import { defaultStyles } from "app/config";
import i18n from "../../constants/i18n";

const EventsListScreen = ({ navigation }) => {
  const ctx = useContext(NotificationContext);

  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  //TODO: Refresh screen

  useEffect(() => {
    loadEvents();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  const loadEvents = async () => {
    debugger
    const response = await eventsApi.getActiveEvents();
    setEvents(response.data);

    ctx.onSetNotificationCount(response?.data?.length || 0);
  };

  return (
    <AppScreen style={styles.container}>
      <AppText style={defaultStyles.title}>{i18n.t("events.title")}</AppText>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            description={item.description}
            onPress={() => {
              navigation.navigate("EventScreen", { eventName: item.name });
            }}
          />
        )}
        refreshing={refreshing}
        onRefresh={loadEvents}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default EventsListScreen;
