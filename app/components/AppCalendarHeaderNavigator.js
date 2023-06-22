import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import {AppText} from "app/components"

import moment from "moment";

function AppCalendarHeaderNavigator({ onChange }) {

    const MONTH_OPERAND = {
        SUBTRACT: "subtract",
        ADD: "add"
    }

    const [selectedMonth, setSelectedMonth] = useState();

    useEffect(() => {
        let currentMonth = moment();
        setSelectedMonth(currentMonth)

        return () => { }; //this handles unmounted component memory leak
    }, []);

    useEffect(() => {
        // ToastAndroid.show(selectedMonth ? selectedMonth.toString() : "null", ToastAndroid.SHORT);
    }, [selectedMonth])

    const onPress = (operand) => {

        let newMonth = selectedMonth.clone().add(operand === MONTH_OPERAND.ADD ? 1 : -1, 'months');

        setSelectedMonth(newMonth)

        onChange(newMonth)//TODO: to check how the endpoint requires the month to load data
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onPress(MONTH_OPERAND.SUBTRACT)}
            >
                <AppText style={styles.text}>{"<"}</AppText>
            </TouchableOpacity>

            <View style={styles.calendarMonth}>
                <AppText>{selectedMonth && selectedMonth.format("MMMM YYYY")}</AppText>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => onPress(MONTH_OPERAND.ADD)}
            >
                <AppText style={styles.text}>{">"}</AppText>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 10,

    },
    calendarMonth: {
        alignItems: "center",
        flex: 4
    },
    container: {
        flexDirection: "row",
        padding: 15,
        marginBottom: 10
    },
});

export default AppCalendarHeaderNavigator;
