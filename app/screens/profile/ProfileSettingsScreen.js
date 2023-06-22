import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Updates from "expo-updates";
import { AppScreen, AppText, AppSimplePicker } from "app/components";
import { authStorage } from "app/auth";
import { defaultStyles } from "app/config";
import i18n from "app/constants/i18n";

import Context from "app/contexts/LanguageContext";

const domainSource = [
  {
    key: "IXXOLL",
    label: "IXXOLL",
  },
  {
    key: "I-XALL",
    label: "I-XALL",
  },
];

const organisationSource = [
  {
    key: "IXXALL LIBYA",
    label: "IXXALL LIBYA",
    domain: "IXXOLL",
  },
  {
    key: "IXXALL LIBYA EAST",
    label: "IXXALL LIBYA EAST",
    domain: "IXXOLL",
  },
  {
    key: "IXXALL LIBYA1",
    label: "IXXALL LIBYA1",
    domain: "I-XALL",
  },
  {
    key: "IXXALL LIBYA EAST1",
    label: "IXXALL LIBYA EAST1",
    domain: "I-XALL",
  },
  {
    key: "IXXALL LIBYA EAST2",
    label: "IXXALL LIBYA EAST2",
    domain: "I-XALL",
  },
];

const languageSource = [
  {
    label: "English",
    key: "en",
    locale: "en",
  },
  {
    label: "العربية",
    key: "ar",
    locale: "ar",
  },
];

const ProfileSettingsScreen = ({ navigation }) => {
  const [domainDataSource, setDomainDataSource] = useState([]);
  const [organisationDataSource, setOrganisationDataSource] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState();
  const [selectedOrganisation, setSelectedOrganisation] = useState();

  const { locale, changeLanguage } = useContext(Context);

  const handleDomainPickerSelection = (item) => {
    setSelectedDomain(item.key);
    getOrganisationDataSource(item.key);
    setSelectedOrganisation();
  };

  const handleOrganisationPickerSelection = async (item) => {
    //reset user and refresh the app
    //TODO: use context for switching value of domain/company

    // console.log(domainDataSource);
    authStorage.storeDomain(selectedDomain);
    authStorage.storeOrganisation(item.key);
    await Updates.reloadAsync();
    // navigation.popToTop();
  };

  const handleLanguageSelection = (item) => {
    changeLanguage(item.locale);
  };

  //TODO: this should ideally be done on the server

  const getDomainDataSource = () => {
    setDomainDataSource(domainSource);
  };

  const getOrganisationDataSource = (key) => {
    //TODO: hard-coding this param for the time being
    const orgSource = organisationSource.filter((item) => {
      return item.domain === key;
    });
    setOrganisationDataSource(orgSource);
  };

  const getOrganisationSource = (domain) => {
    const org = organisationSource.filter((item) => {
      return item.domain === domain;
    });
    setOrganisationDataSource(org);
  };

  const getDataLocally = async () => {
    const domain = await authStorage.getDomain();
    const org = await authStorage.getOrganisation();

    setSelectedDomain(domain);
    setSelectedOrganisation(org);
    getOrganisationSource(domain);
  };

  useEffect(() => {
    getDomainDataSource();
    getDataLocally();
    return () => {};
  }, []);
  return (
    <AppScreen style={styles.container}>
      <View style={styles.viewContainer}>
        <>
          <AppText>{i18n.t("profile.language")} </AppText>
          <AppSimplePicker
            selectedItem={languageSource.find((x) => x.locale == locale)?.label}
            onSelectItem={(item) => handleLanguageSelection(item)}
            items={languageSource}
            placeholder={i18n.t("profile.language")}
          />
        </>

        <>
          <AppText>{i18n.t("profile.domain")} </AppText>
          {domainDataSource.length > 1 && (
            <AppSimplePicker
              selectedItem={selectedDomain} //TODO:
              onSelectItem={(item) => handleDomainPickerSelection(item)}
              items={domainDataSource}
              placeholder={i18n.t("profile.domain")}
            />
          )}
        </>

        <>
          <AppText>{i18n.t("profile.organisation")}</AppText>
          <AppSimplePicker
            // selectedItem={propertyParts.find((x) => x.item[1].id === propertyPartValue.id)?.item[1]?.value} //TODO:
            selectedItem={selectedOrganisation}
            onSelectItem={(item) => handleOrganisationPickerSelection(item)}
            items={organisationDataSource}
            placeholder={i18n.t("profile.organisation")}
          />
        </>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
  },
  viewContainer: {
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    margin: 20,
  },
});

export default ProfileSettingsScreen;
