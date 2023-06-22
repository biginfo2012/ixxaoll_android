import { useEffect, useState } from "react";

import authStorage from "../auth/storage";
import moment from "moment";

import defaultStyles from "../config/styles";

const extraWorkShift = () => {
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
    getShiftColor,
  };
};

export default useExtraWork = () => {
  const ExtraWorkDetailDummy = [
    {

      date: moment("24/03/2023", "DD/MM/YYYY"),
      shifts: ["Evening", "Day", "Off"],
    },
    {
      date: moment("25/03/2023", "DD/MM/YYYY"),
      shifts: ["Day", "Evening", "Night", "Off"],
    },
    {
      date: moment("26/03/2023", "DD/MM/YYYY"),
      shifts: ["Day", "Night", "Off"],
    },
    {
      date: moment("27/03/2023", "DD/MM/YYYY"),
      shifts: ["Day", "Evening", "Night", "Off"],
    },
    {
      date: moment("28/03/2023", "DD/MM/YYYY"),
      shifts: ["Day", "Night", "Off" ],
    },
  ];

  const [shiftsPerDay, setShiftPerDay] = useState([]);
  const [allExtraWorkDetail, setAllExtraWorkDetail] = useState([]);
  const [displayingMonthYear, setDisplayingMonthYear] = useState("");
  const [customDateStyles, setCustomDateStyles] = useState([]);

  const { getShiftColor } = extraWorkShift();

  useEffect(() => {
    loadExtraWorkDetail();

    setDisplayingMonthYear(moment());

    return () => {}; //this handles unmounted component memory leak
  }, []);

  useEffect(() => {
    filterExtraWorkDetails();

    return () => {};
  }, [allExtraWorkDetail, displayingMonthYear]);

  const loadExtraWorkDetail = async () => {
    //TODO: To load from server
    // const response = await getRosterDetails.request();
    // setAllExtraWorkDetail(response.data ?? []);
    //TODO: To load from server

    setAllExtraWorkDetail(ExtraWorkDetailDummy);
  };

  const filterExtraWorkDetails = () => {
    // const startOfDisplayingMonthYear = moment(displayingMonthYear).startOf("month");
    // const endOfDisplayingMonthYear = moment(displayingMonthYear).endOf("month");

    // const tempExtraWorkDetails = allExtraWorkDetail.filter((a) => {
    //   const date = moment(a.date, "DD/MM/YYYY");
    //   return date.isBetween(startOfDisplayingMonthYear, endOfDisplayingMonthYear, "day");
    // });

    let customDates = [];

    for (let i = 0; i < allExtraWorkDetail.length; i++) {
      // const dateStart = moment(tempExtraWorkDetails[i].dateStart, "DD/MM/YYYY").startOf("day");
      // const dateEnd = moment(tempExtraWorkDetails[i].dateEnd, "DD/MM/YYYY").startOf("day");

      // const dates = getAllDaysBetween(dateStart, dateEnd);

      //TODO: maybe we can put the colours in the main datasource so we don't have to calculate the colours everytime
      allExtraWorkDetail.forEach((item) => {
        if (moment(item.date).format("DD/MM/YYYY") !== moment().format("DD/MM/YYYY")) {
          customDates.push({
            date: moment(item.date, "DD/MM/YYYY").clone(), //TODO: moment can be removed here if main datasource has already been formatted
            style: { backgroundColor: defaultStyles.colors.alternateSecondary },
            textStyle: { color: "white" },
            containerStyle: [],
            allowDisabled: true,
          });
        }
      });
    }

    setCustomDateStyles(customDates);
  };

  const handleMonthChange = (date) => {
    setDisplayingMonthYear(date);
    setShiftPerDay([]);
  };

  const displaySelectedMonthYear = () => {
    return moment(displayingMonthYear).format("MMMM");
  };

  const getShiftsPerDay = (date) => {
    const index = allExtraWorkDetail.findIndex((item) => date.isSame(item.date, "day"));
    setDisplayingMonthYear(date);
    if (allExtraWorkDetail[index] && allExtraWorkDetail[index].shifts !== undefined) {
      setShiftPerDay(allExtraWorkDetail[index].shifts);
    } else {
      setShiftPerDay([]);
    }
  };

  return {
    customDateStyles,
    shiftsPerDay,
    displaySelectedMonthYear,
    getShiftsPerDay,
    handleMonthChange,
    extraWorkShift,
  };
};
