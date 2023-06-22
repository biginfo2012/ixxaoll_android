import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  AbsenceScreen,
  AbsenceApprovalSelectionScreen,
  AbsenceApprovalScreen,
  ApplyScreen,
  AdvancementsScreen,
  AnnualsScreen,
  AttendanceVacationLeaveAddStep1,
  AttendanceVacationLeaveAddStep2,
  AttendanceVacationLeaveAddDone,
  AttendanceVacationLeaveCancelStep1,
  AttendanceVacationLeaveCancelStep2,
  ApplyAbsenceCalendarScreen,
  BoardAddScreen,
  ClockInOutScreen,
  ClockingScreen,
  CompanyBoardDetails,
  CompensationScreen,
  EventScreen,
  EventsListScreen,
  EventRequestsScreen,
  ExtraWorkConfirmationScreen,
  ExtraWorkScreen,
  ExtraWorkSelectionScreen,
  HomeScreen,
  MoreScreen,
  OrganisationScreen,
  PayStubsScreen,
  PerformanceScreen,
  ProfileAddressesScreen,
  ProfileContactsScreen,
  ProfileDetailsScreen,
  ProfileEmploymentScreen,
  ProfileFinancialsScreen,
  ProfileSettingsScreen,
  ProfileUserScreen,
  TimeAndAttendanceScreen,
  TimesheetsApprovalScreen,
  TimesheetsSelectionScreen,
  TimesheetsScreen,
  TrainingScreen,
  UserProfileScreen,
  RosterDetailScreen,
  RosterScreen,
  RosterSelectionScreen,
} from "app/screens";

import { HomeNavigationBar, AppSyncButton } from "app/components";

import { defaultStyles } from "app/config";

import { AppIcon } from "app/components";
import Context from "../contexts/LanguageContext";
import i18n from "../constants/i18n";

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: defaultStyles.colors.alternatePrimary,
        tabBarActiveTintColor: defaultStyles.colors.secondary,
        tabBarInactiveBackgroundColor: defaultStyles.colors.white,
        tabBarInactiveTintColor: defaultStyles.colors.alternatePrimary,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => <AppIcon icon={"home"} color={color} size={size}></AppIcon>,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Organization"
        component={OrganisationScreen}
        options={{
          tabBarIcon: ({ size, color }) => <AppIcon icon={"Entypo.flow-tree"} color={color} size={size}></AppIcon>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Compensation"
        component={CompensationScreen}
        options={{
          tabBarIcon: ({ size, color }) => <AppIcon icon={"FontAwesome5.coins"} color={color} size={size}></AppIcon>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsListScreen}
        options={{
          tabBarIcon: ({ size, color }) => <AppIcon icon={"calendar-blank"} color={color} size={size}></AppIcon>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="T & A"
        component={TimeAndAttendanceScreen}
        options={{
          tabBarIcon: ({ size, color }) => <AppIcon icon={"timelapse"} color={color} size={size}></AppIcon>,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ size, color }) => <AppIcon icon={"menu-open"} color={color} size={size}></AppIcon>,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { locale } = useContext(Context);
  i18n.locale = locale;
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={HomeTabs}
        options={({ navigation }) => ({
          headerRight: () => <HomeNavigationBar navigation={navigation} />,
          headerShown: true,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        })}
      />
      <Stack.Screen
        name="BoardAddScreen"
        component={BoardAddScreen}
        options={{
          title: i18n.t("navigation.addBoard"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          title: i18n.t("navigation.events"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          title: i18n.t("navigation.myProfile"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="ProfileUserScreen"
        component={ProfileUserScreen}
        options={{
          title: i18n.t("navigation.details"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="ProfileDetailsScreen"
        component={ProfileDetailsScreen}
        options={{
          title: i18n.t("navigation.details"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="ProfileEmploymentScreen"
        component={ProfileEmploymentScreen}
        options={{
          title: i18n.t("navigation.employment"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="ProfileAddressesScreen"
        component={ProfileAddressesScreen}
        options={{
          title: i18n.t("navigation.addresses"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="ProfileContactsScreen"
        component={ProfileContactsScreen}
        options={{
          title: i18n.t("navigation.contacts"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="ProfileFinancialsScreen"
        component={ProfileFinancialsScreen}
        options={{
          title: i18n.t("navigation.financials"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="ProfileSettingsScreen"
        component={ProfileSettingsScreen}
        options={{
          title: i18n.t("navigation.settings"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="AbsenceScreen"
        component={AbsenceScreen}
        options={{
          title: i18n.t("navigation.absence"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="AbsenceApprovalScreen"
        component={AbsenceApprovalScreen}
        options={{
          title: "Absence Approval",
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="AbsenceApprovalSelectionScreen"
        component={AbsenceApprovalSelectionScreen}
        options={{
          title: "Employees",
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="ApplyScreen"
        component={ApplyScreen}
        options={{
          title: i18n.t("navigation.apply"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="AttendanceVacationLeaveAddStep1"
        component={AttendanceVacationLeaveAddStep1}
        options={{
          title: i18n.t("navigation.addAbsence"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="AttendanceVacationLeaveAddStep2"
        component={AttendanceVacationLeaveAddStep2}
        options={{
          title: i18n.t("navigation.addAbsence"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="AttendanceVacationLeaveAddDone"
        component={AttendanceVacationLeaveAddDone}
        options={{
          title: i18n.t("navigation.vacationLeaveBooked"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />
      <Stack.Screen
        name="AttendanceVacationLeaveCancelStep1"
        component={AttendanceVacationLeaveCancelStep1}
        options={{
          title: i18n.t("navigation.cancelAbsence"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="AttendanceVacationLeaveCancelStep2"
        component={AttendanceVacationLeaveCancelStep2}
        options={{
          title: i18n.t("navigation.cancelAbsence"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="ApplyAbsenceCalendarScreen"
        component={ApplyAbsenceCalendarScreen}
        options={{
          title: i18n.t("absence.absenceCalendar"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="ClockingScreen"
        component={ClockingScreen}
        options={{
          title: i18n.t("navigation.clocking"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="TimesheetsScreen"
        component={TimesheetsScreen}
        options={{
          title: i18n.t("navigation.timesheets"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="ClockInOutScreen"
        component={ClockInOutScreen}
        options={{
          title: i18n.t("navigation.clockInOut"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="ExtraWorkScreen"
        component={ExtraWorkScreen}
        options={{
          title: i18n.t("navigation.timesheets"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="ExtraWorkSelectionScreen"
        component={ExtraWorkSelectionScreen}
        options={{
          title: i18n.t("timeAndAttendance.extraWork"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="ExtraWorkConfirmationScreen"
        component={ExtraWorkConfirmationScreen}
        options={{
          title: "Confirm",
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="RosterScreen"
        component={RosterScreen}
        options={{
          title: i18n.t("navigation.roster"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="RosterSelectionScreen"
        component={RosterSelectionScreen}
        options={{
          title: i18n.t("navigation.employees"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="RosterDetailScreen"
        component={RosterDetailScreen}
        options={{
          title: i18n.t("navigation.roster"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="EventRequestsScreen"
        component={EventRequestsScreen}
        options={{
          title: i18n.t("navigation.eventRequest"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="PerformanceScreen"
        component={PerformanceScreen}
        options={{
          title: i18n.t("navigation.performance"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="TrainingScreen"
        component={TrainingScreen}
        options={{
          title: i18n.t("navigation.training"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="CompanyBoardDetails"
        component={CompanyBoardDetails}
        options={{
          title: i18n.t("navigation.companyBoardDetails"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="TimesheetsApprovalScreen"
        component={TimesheetsApprovalScreen}
        options={{
          title: i18n.t("navigation.timesheetsApproval"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="TimesheetsSelectionScreen"
        component={TimesheetsSelectionScreen}
        options={{
          title: i18n.t("navigation.employees"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="AdvancementsScreen"
        component={AdvancementsScreen}
        options={{
          title: i18n.t("compensation.advancements"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="AnnualsScreen"
        component={AnnualsScreen}
        options={{
          title: i18n.t("annual.annualScreen"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      <Stack.Screen
        name="PayStubsScreen"
        component={PayStubsScreen}
        options={{
          title: i18n.t("payStubs.payStubs"),
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      />

      {/* <Stack.Screen
        name="EmployeeBoardDetails"
        component={EmployeeBoardDetails}
        options={{
          title: "Employee Board Details",
          headerTintColor: defaultStyles.colors.white,
          headerStyle: {
            backgroundColor: defaultStyles.colors.alternatePrimary,
          },
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
