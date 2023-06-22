import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { AppScreen, AppText, AppMenuButton, AppTextInput, AppStatusIcon } from "app/components";

import { defaultStyles } from "app/config";

import { useCancelAbsence } from "app/hooks";

function AttendanceVacationLeaveCancelStep2({ route, navigation }) {
  const { params } = route;

  const { calculatedWorkingHours, displayDate, comment, setComment } = useCancelAbsence(params.absence);
  const [shouldShowDone, setShouldShowDone] = useState(false); //TODO: temp

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AppMenuButton onPress={() => handleCancelAbsence()} title="Cancel" />,
    });
  }, [comment]);

  const handleCancelAbsence = async () => {
    console.log(params.absence, comment);
    setShouldShowDone(true);

    //TODO: temp
    setTimeout(() => {
      navigation.pop();
    }, 2000);
    //TODO: temp
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.typeContainer}>
        {shouldShowDone ? (
          <View style={styles.summary}>
            <AppStatusIcon status={true} />
            <AppText>Absence cancelled successfully</AppText>
          </View>
        ) : (
          <View>
            <View style={styles.summary}>
              <AppText>You are cancelling</AppText>
              <AppText style={defaultStyles.boldText}>{calculatedWorkingHours} hours of Absence</AppText>
              <AppText style={defaultStyles.boldText}>{displayDate()}</AppText>
            </View>
            <View>
              <AppTextInput
                placeholder="Comment"
                autoCapitalize="sentences"
                multiline={true}
                numberOfLines={4}
                onChangeText={(newText) => setComment(newText)}
              />
            </View>
          </View>
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: defaultStyles.colors.white,
  },
  summary: {
    alignItems: "center",
    marginBottom: 25,
  },
});

export default AttendanceVacationLeaveCancelStep2;
