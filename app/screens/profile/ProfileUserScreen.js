import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";

import { AppButton, AppCoverPhoto, ActivityIndicator, AppText, AppScreen, AppSyncButton } from "app/components";
import i18n from "../../constants/i18n";
import { defaultStyles } from "app/config";
import { useAuth, authStorage } from "app/auth";
import { profileApi } from "app/api";

import * as Device from "expo-device";

import package_json from "ixxoll-app/package.json";

const ProfileUserScreen = ({ route, navigation }) => {
  const { logout } = useAuth();

  const getProfileApi = useApi(profileApi.getProfileDefaults);

  /* This is repeated code found in ProfileUserScreen.js. This should be fixed. */

  const [profile, setProfile] = useState({});
  const [profileDefaults, setProfileDefaults] = useState({});

  const getProfileDetails = async () => {
    //GET User Profiles from storage for quick retrieval
    const profileDetails = await authStorage.getProfileDetails();
    setProfile(profileDetails);

    const profileDefaults = await getProfileApi.request();
    setProfileDefaults(profileDefaults.data || {});
  };

  useEffect(() => {
    getProfileDetails();
    return () => {}; //this handles unmounted component memory leak
  }, []);

  const onPressSettings = () => {
    navigation.navigate("ProfileSettingsScreen");
  };

  const displayPosition = (rawPositions) => {
    if (!Array.isArray(rawPositions) || rawPositions.length < 1) return " ";

    let positions = rawPositions.reduce(
      (prevValue, currValue, index) => `${prevValue}${index ? " " : ""}${currValue.name} (${currValue.percentageCapacity}%)${index ? "" : ","}`,
      ""
    );
    return positions;
  };
  /* This is repeated code found in ProfileUserScreen.js. This should be fixed. */
  return (
    <AppScreen style={styles.container}>
      {/* Basic Details Section */}
      {/* <ActivityIndicator visible={getProfileApi.loading} /> */}
      <ScrollView>
        <AppCoverPhoto />
        <View style={[{ flexDirection: "row" }, defaultStyles["margin-bottom-25"]]}>
          <Image style={styles.image} source={{ uri: "data:image/jpg;base64," + profile?.photo }} />
          <View style={styles.profileBannerContainer}>
            <View style={styles.profile}>
              <View style={styles.profileText}>
                <AppText style={styles.text}>{profile?.employeeNo && `Employee ${profile?.employeeNo}`}</AppText>
                <AppText style={styles.text}>{profile?.name && `${profile?.name ?? ""} ${profile?.surname || ""}`}</AppText>
                <AppText style={[styles.text, styles.position]}>{displayPosition(profile?.positions) ?? ""}</AppText>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.userDetails}>
          <View style={styles.row}>
            <View style={styles.rowDetails}>
              <AppText style={[styles.label, styles.labelRight]}>{i18n.t("profile.username")}:</AppText>
              <AppText style={styles.label}>{profileDefaults?.username || ""}</AppText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowDetails}>
              <AppText style={[styles.label, styles.labelRight]}>{i18n.t("profile.domain")}:</AppText>
              <AppText style={styles.label}>{profileDefaults?.domain || ""}</AppText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowDetails}>
              <AppText style={[styles.label, styles.labelRight]}>{i18n.t("profile.company")}:</AppText>
              <AppText style={styles.label}>{profileDefaults?.company || ""}</AppText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.rowDetails, defaultStyles["margin-bottom-25"]]}>
              <AppText style={[styles.label, styles.labelRight]}>{i18n.t("profile.authorisationProfile")}:</AppText>
              <AppText style={styles.label}>{profileDefaults?.authorisationProfile || ""}</AppText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowDetails}>
              <AppText style={[styles.label, styles.labelRight]}>{i18n.t("profile.deviceId")}:</AppText>
              <AppText style={styles.label}>{Device.modelName}</AppText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.rowDetails, defaultStyles["margin-bottom-25"]]}>
              <AppText style={[styles.label, styles.labelRight]}>{i18n.t("profile.appVersion")}:</AppText>
              <AppText style={styles.label}>{package_json.version}</AppText>
            </View>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <AppButton title={i18n.t("profile.settings")} onPress={onPressSettings}></AppButton>
          <AppButton title={i18n.t("profile.logout")} onPress={logout}></AppButton>
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 45,
    width: 90,
    height: 90,
    marginTop: -70,
    marginLeft: 15,
  },

  profileBannerContainer: {
    flex: 1,
    height: "100%",
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  profileText: {
    maxWidth: 200,
    alignItems: "center",
  },
  icon: {
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  segmentedControl: {
    padding: 5,
  },
  text: {
    color: defaultStyles.colors.medium,
    fontSize: 14,
    textAlign: "center",
  },

  labelRight: {
    textAlign: "right",
    marginRight: 10,
    fontWeight: "bold",
  },
  userDetails: {
    flexDirection: "column",
    // padding: 15,
    // marginBottom: 10,
  },
  label: {
    flexDirection: "row",
    flex: 1,
    fontSize: 16,
    textAlign: "left",
  },
  row: {
    marginLeft: 10,
    justifyContent: "center",
  },
  rowDetails: { flexDirection: "row" },
});

export default ProfileUserScreen;
