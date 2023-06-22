import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Sentry from 'sentry-expo';
import {AppButton, AppText} from "app/components"

import * as DocumentPicker from "expo-document-picker";

function AppFileUpload({ propertyBlockId, propertyBlockIndex, onSelectedFile, ...otherProps }) {
    const [result, setResult] = useState({});

    const checkFileUpload = async () => {
        //TODO: file upload can be a hook
        try {
            let result = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: false,
                multiple: false,
                type: ["image/png", "application/pdf"],
            });
            setResult(result)
            onSelectedFile(propertyBlockId, result.uri, result.name)
        } catch (e) {
            Sentry.Native.captureException(e);
            throw e;
        }
    };

    return (
        <>
            <AppText>Upload</AppText>
            <AppButton title="Select File" onPress={() => checkFileUpload()} isNormalStyle={false} {...otherProps}></AppButton>
            {result.type === "success" && <AppText>{result.name}</AppText>}
            {/* {valid && <AppButton title="Upload File" onPress={() => handleFileUpload()}></AppButton>} */}
        </>
    );
}

const styles = StyleSheet.create({
    // button: {
    //     backgroundColor: defaultStyles.colors.primary,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginHorizontal: 10,
    // },
    // notification: {
    //     position: "absolute",
    //     backgroundColor: defaultStyles.colors.danger,
    //     width: 14,
    //     height: 14,
    //     borderRadius: 7,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     right: -10,
    //     top: -10,
    // },
    // notificationLabel:{
    //   top: 0,
    //   color:"white",
    //   fontSize:10
    // }
});

export default AppFileUpload;
