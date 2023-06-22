import React, { useState, useEffect } from "react";
import { StyleSheet, View, useWindowDimensions, ScrollView } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import RenderHtml from "react-native-render-html";

import { AppScreen, AppText, AppTextInput, AppButton, AppStatusIcon, AppPicker, ActivityIndicator, AppFileUpload } from "app/components";
import { ErrorMessage } from "app/components/forms";

import { defaultStyles } from "app/config";

import { useApi } from "app/hooks";
import { eventsApi } from "app/api";

const _ = require("lodash");

const forwardButtonTitle = "Continue";
//TODO: Handle blocks that have nothing to show/save
//TODO: Abort save and get event controller (axios)

const EventScreen = ({ route, navigation }) => {
  const { eventName } = route.params;

  const controller = new AbortController();

  const getEventApi = useApi(eventsApi.getEvent);
  const saveEventApi = useApi(eventsApi.saveEvent);
  const uploadFileApi = useApi(eventsApi.uploadFile);

  const [event, setEvent] = useState([]);
  const [propertyParts, setPropertyParts] = useState([]);
  const [invalidPropertyParts, setInvalidPropertyParts] = useState([]);

  const { windowWidth } = useWindowDimensions();

  useEffect(() => {
    loadEvent();

    return () => {
      controller.abort();
    };
  }, []);

  //#region handling actions
  const handleFileSelection = async (propertyBlockId, uri, fileName) => {
    let pParts = propertyParts;
    const propertyBlockIndex = pParts.findIndex((propertyBlock) => propertyBlock.item[1].id === propertyBlockId);

    let obj = pParts[propertyBlockIndex];
    obj.item[1].value = fileName;
    obj.item[1].uri = uri;
    pParts[propertyBlockIndex] = obj;

    setPropertyParts([...pParts]);
  };

  const handleMainEvent = async () => {
    if (event?.scene?.event?.stepToShow === -1) return;
    save();
  };

  const handlePickerSelection = (item, propertyBlockId) => {
    let pParts = propertyParts;
    const propertyBlockIndex = pParts.findIndex((propertyBlock) => propertyBlock.item[1].id === propertyBlockId);

    let obj = pParts[propertyBlockIndex];
    obj.item[1].value = item.value;
    pParts[propertyBlockIndex] = obj;

    setPropertyParts([...pParts]);
  };

  const onChangeText = (text, propertyBlockId) => {
    let pParts = propertyParts;
    const propertyBlockIndex = pParts.findIndex((propertyBlock) => propertyBlock.item[1].id === propertyBlockId);

    let obj = pParts[propertyBlockIndex];
    obj.item[1].value = text;
    pParts[propertyBlockIndex] = obj;

    setPropertyParts([...pParts]);
  };
  //#endregion

  //#region UI
  const buildMainActionUI = () => {
    if (event?.scene?.event?.stepToShow !== event?.scene?.event?.currentStep) {
      return (
        <View style={styles.eventButtonContainer}>
          {event?.scene?.event?.stepToShow === -1 && <AppText>Waiting operator approval</AppText>}
          <AppButton title={forwardButtonTitle} disabled={event?.scene?.event?.stepToShow === -1} onPress={() => handleMainEvent()}></AppButton>
        </View>
      );
    }
  };

  const buildUI = () => {
    //TODO: This should be done outside of a component level
    const netInfo = useNetInfo();
    console.log(netInfo.type + "----" + netInfo.isInternetReachable);

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
      return (
        <View style={styles.horizontalCenter}>
          <AppText>No internet connection</AppText>
          <AppStatusIcon status={false} />
        </View>
      );
    }

    if (!event?.scene?.event) {
      if (!getEventApi.loading) {
        return (
          <View style={styles.horizontalCenter}>
            <AppText>An error has occurred</AppText>
            <AppStatusIcon status={false} />
          </View>
        );
      }
    }

    if (event?.scene?.event) {
      if (event?.scene?.event?.currentStep === event?.scene?.event?.stepToShow) {
        return (
          <View style={styles.horizontalCenter}>
            <AppText>This event is complete.</AppText>
            <AppStatusIcon status={true} />
          </View>
        );
      } else {
        if (propertyParts.length > 0) {
          return paintUI();
        }
      }
    }
  };

  const createSelectDataSource = (rawSource) => {
    let source = [];
    rawSource.split(",").forEach((rawItem) => {
      let item = {
        label: rawItem,
        value: rawItem,
        key: rawItem,
      };
      source.push(item);
    });
    return source;
  };

  const createUIElement = (propertyPart) => {
    let propertyPartValue = propertyPart.item[1];
    let propertyBlockIndex = propertyPart.propertyBlockIndex;

    switch (propertyPartValue.type) {
      case "boolean":
        return (
          <View style={styles.horizontalCenter}>
            <AppStatusIcon status={propertyPartValue.value} />
          </View>
        );
      case "file":
        return (
          <>
            <AppFileUpload
              propertyBlockId={propertyPartValue.id}
              propertyBlockIndex={propertyBlockIndex}
              onSelectedFile={(propertyBlockId, uri, fileName) => handleFileSelection(propertyBlockId, uri, fileName)}
              disabled={event?.scene?.event?.stepToShow === -1}
            />
            <ErrorMessage
              error="A file must be selected"
              visible={invalidPropertyParts.length > 0 && invalidPropertyParts.findIndex((x) => x.id === propertyPartValue.id) !== -1}
            />
          </>
        );
      case "select":
        //TODO: MASSIVE UGLY HACK FOR DEMO PURPOSES
        if (propertyPartValue.selectDataSource == null && propertyPartValue.value[0] == "<") {
          return (
            <>
              <RenderHtml contentWidth={windowWidth} source={{ html: propertyPartValue.value }} />
            </>
          );
        }
        //TODO: MASSIVE UGLY HACK FOR DEMO PURPOSES

        //rest of the code
        let source = createSelectDataSource(propertyPartValue.selectDataSource);
        return (
          <>
            <AppPicker
              propertyBlockId={propertyPartValue.id}
              propertyBlockIndex={propertyBlockIndex}
              selectedItem={propertyParts.find((x) => x.item[1].id === propertyPartValue.id)?.item[1]?.value}
              onSelectItem={(item, propertyBlockId, propertyBlockIndex) => handlePickerSelection(item, propertyBlockId, propertyBlockIndex)}
              items={source}
              placeholder={propertyPartValue.label}
              disabled={event?.scene?.event?.stepToShow === -1}
            />

            <ErrorMessage
              error="This field is required"
              visible={invalidPropertyParts.length > 0 && invalidPropertyParts.findIndex((x) => x.id === propertyPartValue.id) !== -1}
            />
          </>
        );
      case "string":
        return (
          <>
            <AppText>{propertyPartValue.label}</AppText>
            <AppTextInput
              autoCapitalize="sentences"
              multiline={false}
              editable={event?.scene?.event?.stepToShow !== -1}
              value={propertyPartValue.value}
              onChangeText={(text) => onChangeText(text, propertyPartValue.id)}
            />
          </>
        );
      case "number":
        if (["Employee Id", "User Id"].includes(propertyPartValue.label)) {
          break;
        }

        return (
          <>
            <AppText>{propertyPartValue.label}</AppText>
            <AppTextInput
              autoCapitalize="sentences"
              multiline={false}
              editable={event?.scene?.event?.stepToShow !== -1}
              value={propertyPartValue.value}
              onChangeText={(text) => onChangeText(text, propertyPartValue.id)}
            />
          </>
        );
      case "label":
        return <AppText>{propertyPartValue.value}</AppText>;
      default:
        break;
    }
  };

  const paintUI = () => {
    const elements = [];

    for (var i = 0; i < propertyParts.length; i++) {
      elements.push(createUIElement(propertyParts[i]));
    }
    return elements;
  };
  //#endregion

  //#region loading and saving events
  const loadEvent = async (event) => {
    if (event) {
      setEvent(event);
      parseEvent(event);
    } else {
      const response = await getEventApi.request(eventName);
      setEvent(response.data);
      parseEvent(response.data);
    }
  };

  const parseEvent = (rawEvent) => {
    let parts = [];

    if (!rawEvent) {
      setPropertyParts([...parts]);
      return;
    }

    let stepToShow = [-1, -2].includes(rawEvent.scene.event.stepToShow) ? rawEvent.scene.event.currentStep : rawEvent.scene.event.stepToShow;

    if (rawEvent && rawEvent.scene && rawEvent.scene.blocks && rawEvent.scene.blocks.length > 0) {
      for (var propertyBlockIndex = 0; propertyBlockIndex < rawEvent.scene.blocks[stepToShow].values.property.length; propertyBlockIndex++) {
        Object.entries(rawEvent.scene.blocks[stepToShow].values.property[propertyBlockIndex]).map((item) => {
          if (item[1] && _.has(item[1], "type")) {
            if (item[1].type === "selectsource") {
              const selectPropertyBlockIndex = parts.findIndex((p) => p.item[1].type === "select");
              parts[selectPropertyBlockIndex].item[1].selectDataSource = item[1].value;
            }

            parts.push({ item, propertyBlockIndex });
          }
        });
      }

      setPropertyParts([...parts]);
    }
  };

  const save = async () => {
    if (!validInputs()) {
      return;
    }

    let hasFileUpload = false;
    let valuesToSave = [];

    propertyParts.forEach((p) => {
      let obj = {
        id: p.item[1].id,
        value: p.item[1].type === "select" ? p.item[1].value.trim() : p.item[1].value ?? "",
        type: p.item[1].type,
      };
      valuesToSave.push(obj);

      if (!hasFileUpload) {
        hasFileUpload = p.item[1].type === "file";
      }
    });

    if (hasFileUpload) {
      let filePropertyBlockIndex = propertyParts.findIndex((propertyBlock) => propertyBlock.item[1].type === "file");
      let filePropertyBlock = propertyParts[filePropertyBlockIndex];

      const response = await uploadFileApi.request(
        filePropertyBlock.item[1].id,
        event.scene.event.id.toString(),
        filePropertyBlock.item[1].uri,
        filePropertyBlock.item[1].value,
        controller
      );

      if (response.status !== 200) {
        //TODO: show error message and do the same for login when it fals
        console.log("File Upload FAILED");
        return;
      }
      console.log("File Upload SUCCESS !");
    }

    let savedObj = {
      id: event.scene.event.id,
      name: event.scene.event.name,
      type: event.scene.event.type,
      description: event.scene.event.description,
      currentStep: event.scene.event.stepToShow,
      stepToShow: event.scene.event.stepToShow,
      employeeId: event.scene.event.employeeId,
      values: {
        property: valuesToSave,
      },
    };

    const response = await saveEventApi.request(savedObj);

    if (response.status !== 200 && response.status != 204) {
      //TODO: ugly hack because server somehow gives 204 here
      //TODO: show error message
      console.log("Saving FAILED");
      return;
    }
    console.log("Saving SUCCESS");

    loadEvent(response.data);
  };

  const validInputs = () => {
    let tempInvalidPropertyPaths = [];

    for (var i = 0; i < propertyParts.length; i++) {
      let propertyPart = propertyParts[i];
      let propertyPartValue = propertyPart.item[1];

      // if (propertyPartValue.type === "select") {
      //   if (!propertyPartValue.value) {
      //     tempInvalidPropertyPaths.push(propertyPartValue);
      //   }
      // }

      if (propertyPartValue.type === "file") {
        if (!propertyPartValue.value && !propertyPartValue.uri) {
          tempInvalidPropertyPaths.push(propertyPartValue);
        }
      }
    }
    setInvalidPropertyParts([...tempInvalidPropertyPaths]);
    return tempInvalidPropertyPaths.length === 0;
  };
  //#endregion

  return (
    <>
      <ActivityIndicator visible={getEventApi.loading} />
      <ActivityIndicator visible={uploadFileApi.loading} />
      <ActivityIndicator visible={saveEventApi.loading} />
      <AppScreen style={styles.container}>
        <View style={styles.viewContainer}>
          <ScrollView>
            {buildUI()}
            {buildMainActionUI()}
          </ScrollView>
        </View>
      </AppScreen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 10,
    backgroundColor: defaultStyles.colors.white,
  },
  viewContainer: {
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    margin: 20,
  },
  eventButtonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  horizontalCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EventScreen;
