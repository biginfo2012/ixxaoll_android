import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AppText } from "app/components";
import { defaultStyles } from "app/config";

function AppTimePicker({ label, type = "TIME", onTimeChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState();

  useEffect(() => {
    let now = new Date();
    setSelectedTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0));

    return () => {}; //this handles unmounted component memory leak
  }, []);

  const onPress = () => {
    setShowPicker(true);
  };

  const handleTimeChange = (event, newTime) => {
    setShowPicker(false);

    if (!newTime) {
      return;
    }
    setSelectedTime(newTime);
    onTimeChange(newTime, type);
  };

  //TODO: Ideally, this should return Time only
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <AppText>
          {selectedTime
            ? `${selectedTime?.getHours()}:${selectedTime?.getMinutes()?.toString().padStart(2, "0")}`
            : "Select Time"}
        </AppText>
        {showPicker && (
          <DateTimePicker
            is24Hour={true}
            mode="time"
            display="default"
            value={selectedTime ?? new Date()}
            onChange={handleTimeChange}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultStyles.colors.lightGray,
    borderRadius: 10,
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default AppTimePicker;
