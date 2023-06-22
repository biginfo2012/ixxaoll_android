import { useEffect, useState } from "react";
import { defaultStyles } from "app/config";
import authStorage from "../auth/storage";
import moment from "moment";
import useRosterShift from "./useRosterShift";


export const getAbsenceType = () => {
    const getShiftColor = (shiftType) => {
      switch (shiftType.toLowerCase()) {
        case "vacation":
          return defaultStyles.colors.warning;
        case "maternity":
          return defaultStyles.colors.danger;
      }
    };
  
    return {
      getShiftColor,
    };
  };
  

export default useAbsenceCalendar = () => {
  const absenceDetailDummy = [
    {
      date: moment("24/03/2023", "DD/MM/YYYY"),
      absenceType: "Vacation",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("27/03/2023", "DD/MM/YYYY"),
      absenceType: "Maternity",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("15/03/2023", "DD/MM/YYYY"),
      absenceType: "Vacation",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("17/03/2023", "DD/MM/YYYY"),
      absenceType: "Maternity",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("04/04/2023", "DD/MM/YYYY"),
      absenceType: "Vacation",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("19/04/2023", "DD/MM/YYYY"),
      absenceType: "Maternity",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
  ];

  const [displayingRosterDetails, setDisplayingRosterDetails] = useState([]);
  const [allRosterDetail, setAllRosterDetail] = useState([]);
  const [displayingMonthYear, setDisplayingMonthYear] = useState("");
  const [customDateStyles, setCustomDateStyles] = useState([]);
  const [disabledDates, setDisableDates] = useState([]);

  const { getShiftColor } = getAbsenceType();

  useEffect(() => {
    loadRosterDetail();

    setDisplayingMonthYear(moment());

    return () => {}; //this handles unmounted component memory leak
  }, []);

  useEffect(() => {
    filterRosterDetails();

    return () => {};
  }, [allRosterDetail, displayingMonthYear]);

  const loadRosterDetail = async () => {
    //TODO: To load from server
    // const response = await getRosterDetails.request();
    // setAllRosterDetail(response.data ?? []);
    //TODO: To load from server

    setAllRosterDetail(absenceDetailDummy);
  };

  const filterRosterDetails = () => {
    const startOfDisplayingMonthYear = moment(displayingMonthYear).startOf("month");
    const endOfDisplayingMonthYear = moment(displayingMonthYear).endOf("month");

    const tempRosterDetails = allRosterDetail.filter((a) => {
      const date = moment(a.date, "DD/MM/YYYY");

      return date.isBetween(startOfDisplayingMonthYear, endOfDisplayingMonthYear, "day");
    });

    setDisplayingRosterDetails(tempRosterDetails);

    let customDates = [];
    let disableDates = [];

    for (let i = 0; i < tempRosterDetails.length; i++) {
      // const dateStart = moment(tempRosterDetails[i].dateStart, "DD/MM/YYYY").startOf("day");
      // const dateEnd = moment(tempRosterDetails[i].dateEnd, "DD/MM/YYYY").startOf("day");

      // const dates = getAllDaysBetween(dateStart, dateEnd);

      //TODO: maybe we can put the colours in the main datasource so we don't have to calculate the colours everytime
      tempRosterDetails.forEach((item) => {
        customDates.push({
          date: moment(item.date, "DD/MM/YYYY").clone(), //TODO: moment can be removed here if main datasource has already been formatted
          style: { backgroundColor: getShiftColor(item.absenceType), borderRadius: 20 },
          textStyle: { color: "white" },
          containerStyle: [],
          allowDisabled: true,
        });
        disableDates.push(moment(item.date, "DD/MM/YYYY").clone())
      });
    }

    setCustomDateStyles(customDates);
    setDisableDates(disableDates);
  };

  const handleMonthChange = (date) => {
    setDisplayingMonthYear(date);
  };

  const displaySelectedMonthYear = () => {
    return moment(displayingMonthYear).format("MMMM");
  };

  const getItemIndex = (date) => {
    const index = displayingRosterDetails.findIndex(item => date.isSame(item.date,"day"));
    return index;
  };

  return {
      customDateStyles,
      displayingRosterDetails,
      disabledDates,
      displaySelectedMonthYear,
      getItemIndex,
      handleMonthChange,
      getShiftColor,
  };
};
