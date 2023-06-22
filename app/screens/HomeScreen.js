import React, { useCallback, useState } from "react";
import { StyleSheet, View, Image, TouchableHighlight, ScrollView, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
  AppScreen,
  AppText,
  ActivityIndicator,
  AppSegmentedControl,
  AppFloatingButton,
  AppCoverPhoto,
} from "app/components";
import i18n from "../constants/i18n";
import { defaultStyles } from "app/config";
import { profileApi } from "app/api";
import { Ionicons } from "@expo/vector-icons";

import { EmployeeBoards } from "app/screens/employeeboards";
import { CompanyBoards } from "app/screens/companyboards";
import { companyBoardApi, employeeBoardApi } from "app/api";

const HomeScreen = ({ route, navigation }) => {
  {
    /* This is repeated code found in ProfileUserScreen.js. This should be fixed. */
  }
  const [profile, setProfile] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [companyBoards, setCompanyBoards] = useState([]);
  const [employeeBoards, setEmployeeBoards] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  // const state = useNavigationState(state => state);

  //Get Company boards
  const getCompanyBoardApi = useApi(companyBoardApi.getCompanyBoardsByEmployee);
  const getEmployeeBoardAPI = useApi(employeeBoardApi.getEmployeeBoardsByEmployee);


  const { params } = route;

  const getProfileApi = useApi(profileApi.getProfileDetails);

  const getProfileDetails = async () => {
    const response = await getProfileApi.request(); //TODO: to save profile details on the device for quick retrieval
    setProfile(response.data);
  };

   const loadBoards = async () => {
    const companyBoardResponse = await getCompanyBoardApi.request();
    const employeeBoardResponse = await getEmployeeBoardAPI.request();
    setCompanyBoards(companyBoardResponse.data);
    setEmployeeBoards(employeeBoardResponse.data)
    setRefreshing(false);
  };

  const showAddBoardForm = () => {
    navigation.navigate("BoardAddScreen");
  };

  const onPressIcon = () => {
    navigation.navigate("ProfileDetailsScreen");
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadBoards();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getProfileDetails();
      return () => {};
    }, [])
  );

  // useEffect(() => {
  //   getProfileDetails();
  //   return () => {}; //this handles unmounted component memory leak
  // }, []);

  const displayPosition = (rawPositions) => {
    if (!Array.isArray(rawPositions) || rawPositions.length < 1) return " "; //TODO: show temporary profile picture and remove test

    let positions = rawPositions.reduce(
      (prevValue, currValue, index) =>
        `${prevValue}${index ? " " : ""}${currValue.name} (${currValue.percentageCapacity}%)${index ? "" : ","}`,
      ""
    );
    return positions;
  };
  {
    /* This is repeated code found in ProfileUserScreen.js. This should be fixed. */
  }
  return (
    <AppScreen style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        stickyHeaderIndices={[2]}
        // showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Basic Details Section */}
        <ActivityIndicator visible={getProfileApi.loading} />
        <View>
          <AppCoverPhoto />
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.image} source={{ uri: "data:image/jpg;base64," + profile?.photo }} />
            <View style={styles.profileBannerContainer}>
              <View style={styles.profile}>
                <View style={styles.profileText}>
                  <AppText style={styles.text}>{profile?.employeeNo && `Employee ${profile?.employeeNo}`}</AppText>
                  <AppText style={styles.text}>
                    {profile?.name && `${profile?.name ?? ""} ${profile?.surname ?? ""}`}
                  </AppText>
                  <AppText style={[styles.text, styles.position]}>{displayPosition(profile?.positions) ?? ""}</AppText>
                </View>
                <TouchableHighlight
                  style={styles.icon}
                  underlayColor={defaultStyles.colors.light}
                  onPress={onPressIcon}
                >
                  <Ionicons name="md-flower-outline" size={24} color="black" />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        {/* Basic Details Section */}
        {/* Contact Section */}
        <AppSegmentedControl
          style={styles.segmentedControl}
          source={[i18n.t("home.employeeBoard"), i18n.t("home.companyBoard")]}
          onChange={(index) => setTabIndex(index)}
          currentIndex={tabIndex}
          // isInputType={false}
        />
        <View>{<EmployeeBoards navigation={navigation} visible={tabIndex === 0} boards={employeeBoards} />}</View>
        <View>{<CompanyBoards navigation={navigation} visible={tabIndex === 1} boards={companyBoards} />}</View>
        <View></View>
        {/* Contact Section */}
      </ScrollView>
      <AppFloatingButton onPress={showAddBoardForm} title="+"></AppFloatingButton>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boardsContainer: {
    margin: 10,
  },
  image: {
    width: 90,
    height: 90,
    marginTop: -45,
    marginLeft: 15,
    borderRadius: 45,
  },
  banner: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
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
});

export default HomeScreen;
