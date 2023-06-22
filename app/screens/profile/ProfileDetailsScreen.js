import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";

import { AppScreen, AppText, ActivityIndicator } from "app/components";

import { defaultStyles } from "app/config";
import { profileApi } from "app/api";

import moment from "moment";

const BG_IMAGE = require("../../assets/bgProfile.png");

const ProfileDetailsScreen = ({ route, navigation }) => {
  {
    /* This is repeated code found in ProfileUserScreen.js. This should be fixed. */
  }
  const [profile, setProfile] = useState({});

  const getProfileApi = useApi(profileApi.getProfileDetails);

  const getProfileDetails = async () => {
    const response = await getProfileApi.request(); //TODO: to save profile details on the device for quick retrieval
    setProfile(response.data);
  };

  useEffect(() => {
    getProfileDetails();
    return () => {}; //this handles unmounted component memory leak
  }, []);

  const displayPosition = (rawPositions) => {
    if (!Array.isArray(rawPositions) || rawPositions.length < 1) return " ";

    let positions = rawPositions.reduce(
      (prevValue, currValue, index) => `${prevValue}${index ? " " : ""}${currValue.name} (${currValue.percentageCapacity}%)${index ? "" : ","}`,
      ""
    );
    return positions;
  };
  {
    /* This is repeated code found in ProfileUserScreen.js. This should be fixed. */
  }
  return (
    <AppScreen style={styles.container}>
      {/* Basic Details Section */}
      <ActivityIndicator visible={getProfileApi.loading} />
      <ImageBackground source={BG_IMAGE} style={styles.imageBg} resizeMode="stretch">
        <View style={{ flexDirection: "row", marginTop: 150 }}>
          <Image style={styles.image} source={{ uri: "data:image/jpg;base64," + profile?.photo }} />
          <View style={styles.profileDetailed}>
            <View style={styles.profileDetailedText}>
              <AppText style={[defaultStyles.centerText, styles.text]}>DataTech Consulting Limited</AppText>
              <AppText style={[defaultStyles.centerText, styles.text]}>{profile?.employeeNo && `Employee ${profile?.employeeNo}`}</AppText>
              <AppText style={[defaultStyles.centerText, styles.text]}>{profile?.name && `${profile?.name ?? ""} ${profile?.surname ?? ""}`}</AppText>
              <AppText style={[defaultStyles.centerText, styles.text]}>{displayPosition(profile?.positions) ?? ""}</AppText>
              <View style={defaultStyles.spaceSeparator}></View>
              <AppText style={[defaultStyles.centerText, styles.text]}>{moment(profile?.dob).format("DD.MM.YYYY")}</AppText>
              <View style={defaultStyles.spaceSeparator}></View>
              {profile?.addressLine1 && (
                <>
                  <AppText style={[defaultStyles.centerText, styles.text]}>{profile?.addressLine1 ?? ""}</AppText>
                  <AppText style={[defaultStyles.centerText, styles.text]}>{profile?.addressLine2 ?? ""}</AppText>
                  <AppText style={[defaultStyles.centerText, styles.text]}>{profile?.addressLine3 ?? ""}</AppText>
                </>
              )}
              <View style={defaultStyles.spaceSeparator}></View>
              <AppText style={[defaultStyles.centerText, styles.text]}>{profile?.mobile && profile?.mobile}</AppText>
              <AppText style={[defaultStyles.centerText, styles.text]}>
                {" "}
                {profile?.officePhone && profile?.officePhone} {profile?.phoneExtension && profile?.phoneExtension}
              </AppText>
              <AppText style={[defaultStyles.centerText, styles.textEmail]}>{profile?.workEmail && profile?.workEmail}</AppText>
              <View style={defaultStyles.spaceSeparator}></View>
              <AppText style={[defaultStyles.centerText, styles.text]}>Direct Debit</AppText>
              <AppText style={[defaultStyles.centerText, styles.text]}>xxxx xxxx xxxx 2043</AppText>
            </View>
          </View>
        </View>
      </ImageBackground>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 10
    flex: 1,
  },
  imageBg: {
    flex: 1,
    width: null,
    height: null,
  },
  image: {
    width: 90,
    height: 90,
    marginTop: -20,
    marginLeft: 15,
    resizeMode: "contain",
  },
  profileDetailed: {
    backgroundColor: "rgba(11 ,85, 139, 0.5 )",
    flex: 1,
    height: "100%",
    margin: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  profileDetailedText: {
    textAlign: "center",
    opacity: 1,
  },
  icon: {
    marginTop: 20,
    marginRight: 15,
  },
  text: {
    color: defaultStyles.colors.white,
    fontSize: 14,
  },
  textEmail: {
    color: defaultStyles.colors.white,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default ProfileDetailsScreen;
