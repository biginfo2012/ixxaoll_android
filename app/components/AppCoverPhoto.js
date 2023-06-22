import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import * as Sentry from 'sentry-expo';
import { useActionSheet } from "@expo/react-native-action-sheet";
import { authStorage } from "app/auth";

import * as ImagePicker from "expo-image-picker";

const BG_IMAGE = require("../assets/bgProfile.png");

const AppCoverPhoto = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const [source, setSource] = useState({});

  useEffect(() => {
    loadBackgroundCoverPhoto();

    //if we have local uri we show it otherwise default image
    // setSource(BG_IMAGE);
    // setSource({ uri: "content://com.android.providers.media.documents/document/image%3A1000000035" });
  }, []);

  const loadBackgroundCoverPhoto = async () => {
    const imageUri = (await authStorage.getBackgroundCoverUri()) || "";

    // RNFetchBlob.fs.readFile(imageUri, 'base64')
    // .then(data => {
    //   console.log(data);
    // });

    setSource(imageUri ? { uri: imageUri } : BG_IMAGE);
  };

  const selectPhoto = async () => {
    //TODO: file select can be a hook
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        // aspect: [4, 3],
        // quality: 1
      });

      if (!result.canceled) {
        setSource({ uri: result.uri });
        await storage.storeBackgroundCoverUri(result.uri);
      }
    } catch (e) {
      Sentry.Native.captureException(e);
      console.log(e);
    }
  };

  const handleError = (err) => {
    console.log(err);
  };

  const onPress = () => {
    const options = ["Change Cover Photo", "Cancel"];
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            selectPhoto();
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <TouchableHighlight onPress={() => onPress()}>
      <ImageBackground onError={handleError} source={source || BG_IMAGE} style={styles.banner} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
});

export default AppCoverPhoto;
