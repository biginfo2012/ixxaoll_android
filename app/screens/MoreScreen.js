import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { AppScreen, AppIcon, ListItem  } from "app/components";

import { defaultStyles } from "app/config";
import i18n from "../constants/i18n";


const MoreScreen = ({ navigation }) => {

const menuItems = [
  {
    icon: "MaterialCommunityIcons.sort-calendar-descending",
    title: i18n.t('more.event_requests'),
    name: "EventRequestsScreen",
  },
  {
    icon: "chart-timeline-variant",
    title: i18n.t('more.performance'),
    name: "PerformanceScreen",
  },
  {
    icon: "FontAwesome5.chalkboard-teacher",
    title: i18n.t('more.training'),
    name: "TrainingScreen",
  },
];
  return (
    <AppScreen>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={<AppIcon icon={item.icon} size={20} margin={20} color={defaultStyles.colors.medium} />}
              onPress={() => {
                navigation.navigate(item.name);
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

export default MoreScreen;
