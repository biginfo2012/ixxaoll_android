import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AppIcon, ListItem, AppScreen } from "app/components";

import { useRoster } from "app/hooks";

import { defaultStyles } from "app/config";

const RosterScreen = ({ navigation }) => {
  const { mainMenuItems } = useRoster();

  return (
    <AppScreen>
      <View style={styles.container}>
        <FlatList
          data={mainMenuItems}
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

export default RosterScreen;
