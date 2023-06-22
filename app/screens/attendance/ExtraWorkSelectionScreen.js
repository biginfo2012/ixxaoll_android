import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { ListItem, AppScreen } from "app/components";

import { useExtraWorkSelection } from "app/hooks";

const ExtraWorkSelectionScreen = ({ navigation }) => {
  const { employees } = useExtraWorkSelection();

  return (
    <AppScreen>
      <FlatList
        data={employees}
        keyExtractor={(menuItem) => menuItem.title}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            onPress={() => {
              navigation.navigate("ExtraWorkScreen", { employee: item });
            }}
          />
        )}
      ></FlatList>
    </AppScreen>
  );
};

const styles = StyleSheet.create({});

export default ExtraWorkSelectionScreen;
