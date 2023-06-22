import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { ListItem, AppScreen } from "app/components";

import { useAbsenceApprovalSelection } from "app/hooks";

const AbsenceApprovalSelectionScreen = ({ navigation }) => {
  const { employees } = useAbsenceApprovalSelection();

  return (
    <AppScreen>
      <FlatList
        data={employees}
        keyExtractor={(menuItem) => menuItem.title}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            onPress={() => {
              navigation.navigate("AbsenceApprovalScreen", { employee: item });
            }}
          />
        )}
      ></FlatList>
    </AppScreen>
  );
};

const styles = StyleSheet.create({});

export default AbsenceApprovalSelectionScreen;
