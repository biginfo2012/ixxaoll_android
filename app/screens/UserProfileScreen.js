import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { AppButton, ListItem, AppScreen } from "app/components";

import { useAuth } from "app/auth";

const menuItems = [
  {
    title: "Details",
    name: "ProfileUserScreen",
  },
  {
    title: "Employment",
    name: "ProfileEmploymentScreen",
  },
  {
    title: "Addresses",
    name: "ProfileAddressesScreen",
  },
  {
    title: "Contacts",
    name: "ProfileContactsScreen",
  },
  {
    title: "Financials",
    name: "ProfileFinancialsScreen",
  },
  {
    title: "Settings",
    name: "ProfileSettingsScreen",
  },
];

const UserProfileScreen = ({ navigation }) => {
  const { logout } = useAuth();

  return (
    <AppScreen>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => {
                navigation.navigate(item.name);
              }}
            />
          )}
        ></FlatList>
        <AppButton title="Logout" isNormalStyle={false} onPress={logout}></AppButton>
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

export default UserProfileScreen;
