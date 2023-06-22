import { Platform } from "react-native";

import colors from "./colors";

export default {
  centerText: {
    textAlign: "center",
  },
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  "margin-bottom-25": {
    marginVertical: 25,
  },
  title: {
    fontSize: 22,
    color: colors.black,
    fontWeight: "bold",
    marginVertical: 15,
    margin:10,
  },
  subTitle: {
    fontSize: 16,
    color: colors.veryLightGray,
    marginVertical: 15,
  },
  description: {
    color: colors.medium,
  },
  separator: {
    backgroundColor: colors.lightGray,
    height: 15,
  },
  spaceSeparator: {
    height: 15,
  },
  boldText: {
    fontWeight: "bold"
  },
  centeredContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginVertical: 50
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
};
