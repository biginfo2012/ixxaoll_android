import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ToastAndroid, View } from "react-native";

import { ActivityIndicator, AppScreen, AppMenuButton, AppTextInput, AppText, AppDatePicker, AppFileUploadForm } from "app/components";
import { ErrorMessage, FormAlert } from "app/components/forms";
import i18n from "../constants/i18n";
import { boardsApi } from "app/api";

import { defaultStyles } from "app/config";

const BoardAddScreen = ({ route, navigation }) => {
  // const authContext = useContext(AuthContext);
  // const loginApi = useApi(authAPI.login);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [uri, setUri] = useState("");
  const [name, setName] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [touched, setTouched] = useState(false);

  const controller = new AbortController();

  const saveBoardWithFile = useApi(boardsApi.saveBoardWithFile);

  //   useEffect(() => {
  //     setDate(new Date());

  //     navigation.setOptions({
  //       headerRight: () => <AppMenuButton onPress={() => handleSubmit()} title="Save" />,
  //     });
  //   }, []);

  useEffect(() => {
    setDate(new Date());

    return () => {}; //this handles unmounted component memory leak
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AppMenuButton onPress={() => handleSubmit()} title={i18n.t('addBoardScreen.save')} />,
    });
  }, [title, message, uri, name, mimeType, date]);

  const handleFileSelection = async (uri, name, mimeType) => {
    setUri(uri);
    setName(name);
    setMimeType(mimeType);
  };

  const onDateChanged = async (newDate, type) => {
    setDate(newDate);
  };

  const handleSubmit = async () => {
    setTouched(true);

    let textOptionIsValid = title != "" && message != "" && date != "";

    let fileOptionIsValid = uri != "" && date != "";

    if (!textOptionIsValid && !fileOptionIsValid) {
      return;
    }

    const response = await saveBoardWithFile.request(title, message, date, uri, name, mimeType, controller);

    if (response.status === 200) {
      navigation.popToTop();
      ToastAndroid.show(i18n.t("addBoardScreen.boardSuccessAdded"), ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <ActivityIndicator visible={saveBoardWithFile.loading} />
      <AppScreen style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <FormAlert error={i18n.t("addBoardScreen.boardNotAdded")} visible={touched && saveBoardWithFile.error} />
            <View>
              <AppText style={styles.label}>{i18n.t("addBoardScreen.title")}</AppText>
              <ErrorMessage error={i18n.t("addBoardScreen.invalidTitle")} visible={touched && title == ""} />
              <AppTextInput
                placeholder={i18n.t("addBoardScreen.title")}
                autoCapitalize="sentences"
                multiline={false}
                numberOfLines={1}
                onChangeText={(newText) => setTitle(newText)}
              />
            </View>

            <View style={styles.marginTop}>
              <AppText style={styles.label}>{i18n.t("addBoardScreen.message")}</AppText>
              <ErrorMessage error={i18n.t("addBoardScreen.invalidMessage")} visible={touched && message == ""} />
              <AppTextInput
                placeholder={i18n.t("addBoardScreen.message")}
                autoCapitalize="sentences"
                multiline={true}
                numberOfLines={4}
                onChangeText={(newText) => setMessage(newText)}
              />
            </View>

            <View style={styles.marginTop}>
              <ErrorMessage error={i18n.t("addBoardScreen.invalidDate")} visible={touched && date == ""} />
              <AppDatePicker style={defaultStyles["margin-bottom-25"]} label={i18n.t("addBoardScreen.date")} type="START_TIME" onDateChange={onDateChanged} />
            </View>

            <View style={styles.marginTop}>
              <AppText style={[styles.label, styles.marginTop]}>{i18n.t("addBoardScreen.selectFile")}</AppText>
              <ErrorMessage error={i18n.t("addBoardScreen.selectFile")} visible={touched && uri == ""} />
              <AppFileUploadForm onSelectedFile={(uri, name, mimeType) => handleFileSelection(uri, name, mimeType)} />
            </View>
          </View>
        </ScrollView>
      </AppScreen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 2,
  },
  marginTop: {
    marginTop: 20,
  },
});

export default BoardAddScreen;
