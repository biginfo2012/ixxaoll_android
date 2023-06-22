import React from "react";
import { View, StyleSheet, Image, TouchableHighlight, I18nManager } from "react-native";

import { AppText } from "app/components";
import { defaultStyles } from "app/config";

function ListItem({ title, description, additionalText, image, IconComponent, showBackground = true, onPress, leftBorderColor = "" }) {
  const isRTL = I18nManager.isRTL;
  return (
    <TouchableHighlight underlayColor={defaultStyles.colors.light} onPress={onPress}>
      <View style={[styles.container, showBackground ? styles.backgroundColorWhite : null]}>
        {IconComponent}
        {image && <Image style={styles.image} source={{ uri: "data:image/jpg;base64," + image }} />}

        <View>
          {/* {leftBorderColor && <View style={{leftBorderColor: leftBorderColor, borderLeftWidth: 5}}></View>} */}
          <View style={[styles.detailsContainer, leftBorderColor != "" ? { borderLeftColor: leftBorderColor, borderLeftWidth: 5 } : ""]}>
            <AppText style={[styles.title, isRTL ? {textAlign: 'left'} : {}]}>{title}</AppText>
            {description && <AppText style={[styles.description, isRTL ? {textAlign: 'left'} : {}]}>{description}</AppText>}
            {additionalText && <AppText style={[styles.description, isRTL ? {textAlign: 'left'} : {}]}>{additionalText}</AppText>}
          </View>

        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  backgroundColorWhite: {
    backgroundColor: defaultStyles.colors.white,
  },
  container: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  detailsContainer: {
    justifyContent: "center",
    flex: 1,
    paddingLeft: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  description: {
    color: defaultStyles.colors.medium,
    flexShrink: 1,
    width: 240,
  },
  title: {
    fontWeight: "500",
    width: 240,
  },
});

export default ListItem;
