import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AppScreen, ListItem, AppIcon } from "app/components";

import { useClocking } from "app/hooks";

import { defaultStyles } from "app/config";

const ClockingScreen = ({ navigation }) => {
  const { mainMenuItems } = useClocking();

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

export default ClockingScreen;
