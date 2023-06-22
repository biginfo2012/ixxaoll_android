import { useEffect } from "react";

import defaultStyles from "../config/styles";

export default useTimesheetsShift = () => {

  const getShiftColor = (shiftType) => {
    switch (shiftType.toLowerCase()) {
      case "day":
        return defaultStyles.colors.shiftDay;
      case "evening":
        return defaultStyles.colors.shiftEvening;
      case "night":
        return defaultStyles.colors.shiftNight;
      case "rest":
        return defaultStyles.colors.shiftRest;
      case "off":
        return defaultStyles.colors.shiftOff;
    }
  };

  return {
    getShiftColor
  };
};
