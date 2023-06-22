import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Button, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../constants/i18n";
import { AppText, AppPickerItem } from "app/components";
import { defaultStyles } from "app/config";

function AppSimplePicker({
  items,
  icon,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = AppPickerItem,
  placeholder,
  selectedItem,
  width = "100%",
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const ListEmptyComponent = () => {
    return (
      <View style={styles.empty}>
        <AppText>{i18n.t("profile.select_domain")}</AppText>
      </View>
    );
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)} {...otherProps}>
        <View style={[styles.container, { width }]}>
          {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />}
          {selectedItem ? <AppText style={styles.AppText}>{selectedItem}</AppText> : <AppText style={styles.placeholder}>{placeholder}</AppText>}

          <MaterialCommunityIcons name="chevron-down" size={20} color={defaultStyles.colors.medium} />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <Button title={i18n.t("profile.close")} onPress={() => setModalVisible(false)} color={defaultStyles.colors.alternatePrimary} />
            <FlatList
              data={items}
              keyExtractor={(item) => item.key.toString()}
              numColumns={numberOfColumns}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={({ item }) => (
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                  <PickerItemComponent
                    key={item.key}
                    item={item}
                    label={item.label}
                    onPress={() => {
                      setModalVisible(false);
                      onSelectItem(item);
                    }}
                    selected={selectedItem == item.label}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
    backgroundColor: "red",
  },
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
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
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalInner: {
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
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});

export default AppSimplePicker;
