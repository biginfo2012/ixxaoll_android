import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

function AppScreen({ children, style, ...otherProps }) {
    return (
        <SafeAreaView style={[styles.screen, style]} {...otherProps}>
            <View style={[styles.view, style]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        // paddingTop: Constants.statusBarHeight, //TODO: to reenable because of iOS?
        flex: 1,
    },
    view: {
        flex: 1,
    },
});

export default AppScreen;
