import React, { useState } from "react";
import { StyleSheet } from "react-native";
import i18n from "../constants/i18n";
import * as Sentry from 'sentry-expo';
import {AppText, AppButton} from "app/components"

import * as DocumentPicker from "expo-document-picker";

function AppFileUploadForm({ onSelectedFile, ...otherProps }) {
  const [result, setResult] = useState({});

  const checkFileUpload = async () => {
    //TODO: file upload can be a hook
    try {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
        type: ["image/jpeg", "image/png", "application/pdf"],
      });
      setResult(result);
      onSelectedFile(result.uri, result.name, result.mimeType);
    } catch (e) {
      Sentry.Native.captureException(e);
      throw e;
    }
  };

  return (
    <>
      <AppButton title={i18n.t("addBoardScreen.selectFile")} onPress={() => checkFileUpload()} {...otherProps}></AppButton>
      {result.type === "success" && <AppText style={styles.fileName}>{result.name}</AppText>}
      {/* {valid && <AppButton title="Upload File" onPress={() => handleFileUpload()}></AppButton>} */}
    </>
  );
}

const styles = StyleSheet.create({
  fileName: {
    fontSize: 14,
  },
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

export default AppFileUploadForm;
