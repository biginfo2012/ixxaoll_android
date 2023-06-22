import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";

import { AppText, AppButton } from "app/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { defaultStyles } from "app/config";
import Context from "../contexts/LanguageContext";
import i18n from "../constants/i18n";


const ARAB = require('../assets/arab.png')
const AMER = require('../assets/america.jpeg')

const AppLanguagePicker = ({ ...otherProps }) => {
  const [visible, setVisible] = useState(false);
  const { data, userChangeLanguage } = useContext(Context)
  const language = [
    {
      title: 'Engish',
      locale: 'en',
      image: AMER
    },
    {
      title: 'Arabic',
      locale: 'ar',
      image: ARAB
    }
  ];

  const onChangeLanguage = () => {
    setVisible(true);
  }

  const onChangeLocale = (item) => {
    userChangeLanguage(item.locale);
    setVisible(false);
  }

  const onPressCancel = () => {
    setVisible(false);
  }

  return (
    <View style={defaultStyles.text} {...otherProps}>
        <TouchableOpacity style={styles.pickerContainer} onPress={() => onChangeLanguage()}>
            <Image source={(data === 'en' || data === 'en-PH') ? AMER : ARAB} style={styles.imageDrop}/>
            <MaterialCommunityIcons name="chevron-down" size={20} color={defaultStyles.colors.white}/>
        </TouchableOpacity>
        <Modal visible={visible} animationType="slide" transparent={true}>
          <View style={styles.pickerContent}>
          <FlatList
            data={language}
            keyExtractor={(item) => item.title}
            renderItem={({item}) => (
              <TouchableOpacity style={[styles.listContent, data === item.locale ? styles.highlight : {}]} onPress={() => onChangeLocale(item)}>
                <Image source={item.image} style={styles.image} />
                <AppText>{item.title}</AppText>
              </TouchableOpacity>
            )}
          />
          <View style={styles.closeIcon}>
           <AppButton title={i18n.t('home.cancel')} onPress={onPressCancel} />
          </View>
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: defaultStyles.colors.white
  },
  pickerContent: {
    height: "50%",
    marginTop: "auto",
    backgroundColor: defaultStyles.colors.light,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  listContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 10
  },
  imageDrop: {
    width: 30,
    height: 30
  },
  closeIcon: {
    marginTop: 10,
  },
  highlight: {
    backgroundColor: defaultStyles.colors.veryLightGray
  }
});

export default AppLanguagePicker;
