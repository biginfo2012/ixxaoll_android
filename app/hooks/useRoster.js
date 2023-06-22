import { useEffect, useState } from "react";
import i18n from "../constants/i18n";
import authStorage from "../auth/storage";

export default useRoster = () => {
  const [mainMenuItems, setMainMenuItems] = useState([]);

  useEffect(() => {
    const isUserManager = async () => {
      const isManager = true; //TODO: await authStorage.getUser(); needs to get the actual role once the back-end sends this info.

      setMainMenuItems([
        {
          title: i18n.t("timeAndAttendance.myRoster"),
          name: isManager ? "RosterSelectionScreen" : "RosterDetailScreen",
          icon: "MaterialIcons.perm-contact-calendar",
        },
        {
          title: i18n.t("timeAndAttendance.extraWork"),
          name: isManager ? "ExtraWorkSelectionScreen" : "ExtraWorkScreen",
          icon: "MaterialIcons.work",
        },
      ]);
    };

    isUserManager();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  return { mainMenuItems };
};
