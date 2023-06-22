import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AppScreen, AppSegmentedControl, ListItem, AppIcon, AppButton, AbsenceListItem } from "app/components";
import { useAbsence } from "app/hooks"
import { authStorage } from "app/auth";

import { defaultStyles } from "app/config";

const AbsenceScreen = ({ navigation }) => {

  const { listItems } = useAbsence();

  return (
    <AppScreen style={styles.container}>
      <FlatList
        data={listItems}
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
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 10,
  },
});

export default AbsenceScreen;
