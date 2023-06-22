import React, { useRef, useEffect } from "react";
import { Alert, StyleSheet, View, FlatList } from "react-native";
import { AppButton, AppListHeaderComponent, AppListEmptyComponent, AppText, ListItem, AppScreen } from "app/components";


import { defaultStyles } from "app/config";

const ExtraWorkConfirmationScreen = ({ route, navigation }) => {
  const { params } = route;
  const onPressConfirm = () => {
    navigation.goBack();
  }

  const onPressCancel = () => {
    navigation.goBack();
  }
  return (
    <AppScreen style={styles.container}>
      <View style={styles.confirmContainer}>
        <AppText style={styles.text}>Are you sure you want to book extra work ?</AppText>
        <AppText style={styles.textShift}>Employee: {params?.employeeName} </AppText>
        <AppText style={styles.textShift}>Shift: {params?.shift} </AppText>
      <View style={styles.buttonContainer}>
        <AppButton 
          title="Confirm"
          style={styles.callToAction}
          onPress={onPressConfirm}
        />
        <AppButton
          title="Cancel"
          style={styles.callToAction}
          onPress={onPressCancel}
        />
      </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: defaultStyles.colors.white,
    flexDirection: "column",
  },
  confirmContainer: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  },
  textShift: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  callToAction: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5
  }
});

export default ExtraWorkConfirmationScreen;
