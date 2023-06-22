import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { AppText } from "app/components";
import { defaultStyles } from "app/config";

function AppDatePicker({ label, type = "DATE", onDateChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    let now = new Date();
    setSelectedDate(now);

    return () => {}; //this handles unmounted component memory leak
  }, []);

  const onPress = () => {
    setShowPicker(true);
  };

  const handleDateChange = (event, newDate) => {
    setShowPicker(false);

    if (!newDate) {
      return;
    }
    setSelectedDate(newDate);
    onDateChange(newDate, type);
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <AppText>{selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : "Select Date"}</AppText>
        {showPicker && (
          <DateTimePicker
            is24Hour={true}
            mode="date"
            display="default"
            value={selectedDate ?? new Date()}
            onChange={handleDateChange}
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

export default AppDatePicker;
