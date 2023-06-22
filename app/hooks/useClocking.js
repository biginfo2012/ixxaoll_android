import { useEffect, useState } from "react";
import i18n from "../constants/i18n";
import authStorage from "../auth/storage";

export default useClocking = () => {
  const [mainMenuItems, setMainMenuItems] = useState([]);

  const menuItems = [
    {
      title: i18n.t('clocking.timesheets'),
      name: "TimesheetsScreen",
      icon: "MaterialIcons.calendar-today",
    },
    {
      title: i18n.t('clocking.clockInOut'),
      name: "ClockInOutScreen",
      icon: "MaterialIcons.access-time",
    },
  ];

  useEffect(() => {
    const isUserManager = async () => {
      const isManager = true; //TODO: await authStorage.getUser(); needs to get the actual role once the back-end sends this info.

      if (isManager) {
        setMainMenuItems([
          ...menuItems,
          {
            title: i18n.t('clocking.timesheetsApproval'),
            name: "TimesheetsSelectionScreen",
            icon: "MaterialIcons.library-add-check",
          },
        ]);
      } else {
        setMainMenuItems(menuItems);
      }
    };

    isUserManager();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  return { mainMenuItems };
};
