import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { ListItem, AppScreen } from "app/components";

import { useRosterSelection } from "app/hooks";

const RosterScreen = ({ navigation }) => {
  const { employees } = useRosterSelection();

  return (
    <AppScreen>
      <FlatList
        data={employees}
        keyExtractor={(menuItem) => menuItem.title}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            onPress={() => {
              navigation.navigate("RosterDetailScreen", { employee: item });
            }}
          />
        )}
      ></FlatList>
    </AppScreen>
  );
};

const styles = StyleSheet.create({});

export default RosterScreen;
