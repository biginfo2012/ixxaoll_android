import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Button, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AppText, AppPickerItem } from "app/components";
import { defaultStyles } from "app/config";

function AppPicker({
  propertyBlockId,
  propertyBlockIndex,
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = AppPickerItem,
  placeholder,
  selectedItem,
  width = "100%",
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)} {...otherProps}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />
          )}
          {selectedItem ? (
            <AppText style={styles.AppText}>{selectedItem}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons name="chevron-down" size={20} color={defaultStyles.colors.medium} />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            height: "50%",
            marginTop: "auto",
            backgroundColor: defaultStyles.colors.light,
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 10,
          }}
        >
          <Button
            title="Close"
            onPress={() => setModalVisible(false)}
            color={defaultStyles.colors.alternatePrimary}
          />
          <FlatList
            data={items}
            keyExtractor={(item) => item.key.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <PickerItemComponent
                  item={item}
                  label={item.label}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item, propertyBlockId, propertyBlockIndex);
                  }}
                />
              </View>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 22
  },
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
