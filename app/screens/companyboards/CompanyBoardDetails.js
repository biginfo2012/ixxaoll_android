import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { AppScreen, AppText } from "app/components";

import { companyBoardAPI } from "app/api";
import { authStorage } from "app/auth";

import { defaultStyles } from "app/config";
import i18n from "../../constants/i18n";

const buttonDefaultValue = {
  like: false,
  unlike: false,
  accept: false,
  decline: false,
};

const Buttons = ({ title, onPress, icon, active }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <AntDesign name={icon} size={24} color={active ? defaultStyles.colors.alternatePrimary : defaultStyles.colors.medium} />
      <AppText style={[styles.buttonText, active ? { fontWeight: "bold", color: defaultStyles.colors.alternatePrimary } : {}]}>{title}</AppText>
    </TouchableOpacity>
  );
};

const CompanyBoardDetails = ({ route, navigation }) => {
  const [activeButton, setActiveButton] = useState({
    like: false,
    unlike: false,
    accept: false,
    decline: false,
  });

  const [employeeId, setEmployeeId] = useState(null);

  const { items } = route.params;

  const onPressButton = async (title) => {
    let body = {
      Accept: "null",
      Decline: "null",
      Liked: "null",
      Unliked: "null",
    };
    switch (title) {
      case "like":
        setActiveButton({ ...buttonDefaultValue, like: !activeButton.like });
        body = {
          ...body,
          Liked: `${activeButton.like ? "null" : employeeId}`,
        };
        break;
      case "unlike":
        setActiveButton({ ...buttonDefaultValue, unlike: !activeButton.unlike });
        body = {
          ...body,
          Unliked: `${activeButton.unlike ? "null" : employeeId}`,
        };
        break;
      case "accept":
        setActiveButton({ ...buttonDefaultValue, accept: !activeButton.accept });
        body = {
          ...body,
          Accept: `${activeButton.accept ? "null" : employeeId}`,
        };
        break;
      case "decline":
        setActiveButton({ ...buttonDefaultValue, decline: !activeButton.decline });
        body = {
          ...body,
          Decline: `${activeButton.decline ? "null" : employeeId}`,
        };
        break;
      default:
        break;
    }
    body = {
      Id: `${items.id}`,
      ...body,
    };
    const response = await companyBoardAPI.saveCompanyBoardById(body);
    if (response.status !== 200) {
      alert("something went wrong!");
    }
  };

  const getEmployeeId = async () => {
    const employeeId = await authStorage.getUser();
    setEmployeeId(employeeId);
  };

  const nullToString = (val) => {
    return val === null ? "null" : val.toString();
  };

  useEffect(() => {
    getEmployeeId();
    setActiveButton({
      like: nullToString(items.liked) !== "null",
      unlike: nullToString(items.unliked) !== "null",
      accept: nullToString(items.accept) !== "null",
      decline: nullToString(items.decline) !== "null",
    });
  }, []);
  return (
    <AppScreen style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.headerContent}>
            {items.image && <Image style={styles.image} source={{ uri: "data:image/jpg;base64," + items.image }} />}
            <AppText style={defaultStyles.centerText}>{items.title}</AppText>
          </View>
          <View style={styles.descriptionContainer}>
            <AppText style={defaultStyles.description}>{items.message}</AppText>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContent}>
        <Buttons title={i18n.t('boards.liked')} onPress={() => onPressButton("like")} icon="like2" active={activeButton.like} />
        <Buttons title={i18n.t('boards.unliked')}  onPress={() => onPressButton("unlike")} icon="dislike2" active={activeButton.unlike} />
        <Buttons title={i18n.t('boards.accept')}  onPress={() => onPressButton("accept")} icon="checkcircleo" active={activeButton.accept} />
        <Buttons title={i18n.t('boards.decline')}  onPress={() => onPressButton("decline")} icon="closecircleo" active={activeButton.decline} />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    // backgroundColor: defaultStyles.colors.white,
    padding: 15,
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 35,
    marginRight: 10,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
    flexDirection: "row",
  },
  buttonText: {
    color: defaultStyles.colors.medium,
    fontSize: 14,
    marginLeft: 5,
    // textTransform: "uppercase",
    fontWeight: "normal",
  },
});

export default CompanyBoardDetails;
