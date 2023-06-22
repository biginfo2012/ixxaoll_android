import { useEffect, useState } from "react";
import { absencesApi } from "app/api";
import { useDate } from "app/hooks";
import i18n from "../constants/i18n";
import { defaultStyles } from "app/config";

import moment from "moment";

export default useAbsence = () => {
  const [displayingAbsences, setDisplayingAbsences] = useState([]);
  const [allAbsences, setAllAbsences] = useState([]);
  const [displayingMonthYear, setDisplayingMonthYear] = useState("");
  const [customDateStyles, setCustomDateStyles] = useState([]);
  const [listItems, setListItems] = useState([]);
  const getAbsences = useApi(absencesApi.getAbsences);
  const { getAllDaysBetween } = useDate();

  const absenceListItem = [
    {
      title: i18n.t('absence.apply'),
      name: "ApplyScreen",
      icon: "MaterialIcons.perm-contact-calendar",
    },
    {
      title: i18n.t('absence.donate'),
      name: '',
      icon: "MaterialIcons.work",
    },
  ]

  useEffect(() => {
    const isUserManager = async () => {
      const isManager = true; //TODO: await authStorage.getUser(); needs to get the actual role once the back-end sends this info.

      if (isManager) {
        setListItems([
          ...absenceListItem,
          {
            title: i18n.t('absence.approve'),
            name: "",
            icon: "MaterialIcons.library-add-check",
          },
        ]);
      } else {
        setListItems(absenceListItem);
      }
    };

    isUserManager();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  useEffect(() => {
    loadAbsences();

    setDisplayingMonthYear(moment());

    return () => {}; //this handles unmounted component memory leak
  }, []);

  useEffect(() => {
    filterAbsences();

    return () => {}; //filter when absences have been loaded
  }, [allAbsences, displayingMonthYear]);

  const loadAbsences = async () => {
    const response = await getAbsences.request();
    setAllAbsences(response.data ?? []);
  };

  const filterAbsences = () => {
    const startOfDisplayingMonthYear = moment(displayingMonthYear).startOf("month");
    const endOfDisplayingMonthYear = moment(displayingMonthYear).endOf("month");

    const tempAbsences = allAbsences.filter((a) => {
      const dateStart = moment(a.dateStart, "DD/MM/YYYY");
      const dateEnd = moment(a.dateEnd, "DD/MM/YYYY");

      return (
        dateStart.isBetween(startOfDisplayingMonthYear, endOfDisplayingMonthYear, "day") ||
        dateEnd.isBetween(startOfDisplayingMonthYear, endOfDisplayingMonthYear, "day")
      );
    });

    setDisplayingAbsences(tempAbsences);

    let customDates = [];

    for (let i = 0; i < tempAbsences.length; i++) {
      const dateStart = moment(tempAbsences[i].dateStart, "DD/MM/YYYY").startOf("day");
      const dateEnd = moment(tempAbsences[i].dateEnd, "DD/MM/YYYY").startOf("day");

      const dates = getAllDaysBetween(dateStart, dateEnd);

      dates.forEach((date) => {
        customDates.push({
          date: date.clone(),
          style: { backgroundColor: defaultStyles.colors.alternatePrimary },
          textStyle: { color: "white" },
          containerStyle: [],
          allowDisabled: true,
        });
      });

      // for (let date = moment(dateStart); date.isSameOrBefore(dateEnd); date.add(1, "day")) {
      //   customDates.push({
      //     date: date.clone(),
      //     style: { backgroundColor: defaultStyles.colors.alternatePrimary },
      //     textStyle: { color: "white" },
      //     containerStyle: [],
      //     allowDisabled: true,
      //   });
      // }
    }

    setCustomDateStyles(customDates);
  };

  const handleMonthChange = (date) => {
    setDisplayingMonthYear(date);
  };

  const displaySelectedMonthYear = () => {
    return moment(displayingMonthYear).format("MMMM");
  };

  return {
    customDateStyles,
    displayingAbsences,
    listItems,
    displaySelectedMonthYear,
    handleMonthChange,
  };
};
