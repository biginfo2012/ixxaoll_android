import { useEffect, useState } from "react";
import i18n from '../constants/i18n';
import authStorage from "../auth/storage";


export default useTimeAndAttendance = () => {
  const timeAndAttendanceItems = [
    {
      id: 1,
      title: i18n.t("timeAndAttendance.roster"),
      link: "RosterScreen",
      icon: "calendar-multiselect"      
    },
    {
      id: 2,
      title: i18n.t("timeAndAttendance.clocking"),
      link: "ClockingScreen",
      icon: "clock-outline"
    },
    {
      id: 3,
      title: i18n.t("timeAndAttendance.absence"),
      link: "AbsenceScreen",
      icon: "calendar-month"
    },
    {
      id: 4,
      title: i18n.t("timeAndAttendance.request"),
      link: "",
      icon: "calendar-arrow-right"
    },
]

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(timeAndAttendanceItems);

    return () => {}; //this handles unmounted component memory leak
  }, []);

  return { items };
};
