import React from "react";
import i18n from '../constants/i18n';
import { View, StyleSheet, FlatList } from "react-native";

import { AppText, ListItem, AppIcon, AppScreen } from "app/components";
import { useCompensation } from "app/hooks";
import { defaultStyles } from "app/config";

const CompensationScreen = ({ navigation }) => {
  const { items } = useCompensation();
  return (
    <AppScreen style={styles.container}>
      <AppText style={[defaultStyles.title, defaultStyles.title]}>{i18n.t('compensation.title')}</AppText>
      {/* <AppText>{i18n.t('compensation.module_not_loaded')}</AppText> */}
      <View style={styles.detailsContainer}>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.contract_type')}: </AppText>Indefinite</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.employment_type')}: </AppText>FT</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.salary')}: </AppText>€10,000</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.hours')} %: </AppText> 100%</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.tax')}: </AppText>M</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.ssc')}: </AppText>Z</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('compensation.status')}: </AppText>Present</AppText>
      </View>
      <FlatList
        data={items}
        keyExtractor={(menuItem) => menuItem.title}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            IconComponent={
            <AppIcon
              icon={item.icon}
              size={20}
              margin={20}
              color={defaultStyles.colors.medium}
            />
            }
            onPress={() => {
              navigation.navigate(item.link);
            }}
          />
        )}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    margin: 10
  },
  listContainer: {
    marginTop: 25
  },
  detailsContainer: {
    marginHorizontal: 15,
  },
  detailsContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CompensationScreen;
