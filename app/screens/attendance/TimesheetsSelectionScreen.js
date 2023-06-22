import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { ListItem, AppScreen } from "app/components";

import { useTimesheetsSelection } from "app/hooks";

const TimesheetsSelectionScreen = ({ navigation }) => {
  const { employees } = useTimesheetsSelection();

  return (
    <AppScreen>
      <FlatList
        data={employees}
        keyExtractor={(menuItem) => menuItem.title}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            onPress={() => {
              navigation.navigate("TimesheetsApprovalScreen", { employee: item });
            }}
          />
        )}
      ></FlatList>
    </AppScreen>
  );
};

const styles = StyleSheet.create({});

export default TimesheetsSelectionScreen;
