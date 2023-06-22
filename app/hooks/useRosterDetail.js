import { useEffect, useState } from "react";

import authStorage from "../auth/storage";
import moment from "moment";
import useRosterShift from "./useRosterShift";

export default useRoster = () => {
  const rosterDetailDummy = [
    {
      date: moment("03/03/2023", "DD/MM/YYYY"),
      shiftType: "Day",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("04/03/2023", "DD/MM/YYYY"),
      shiftType: "Evening",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("05/03/2023", "DD/MM/YYYY"),
      shiftType: "Night",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("06/03/2023", "DD/MM/YYYY"),
      shiftType: "Rest",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("07/03/2023", "DD/MM/YYYY"),
      shiftType: "Off",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("15/03/2023", "DD/MM/YYYY"),
      shiftType: "Day",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("16/03/2023", "DD/MM/YYYY"),
      shiftType: "Evening",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("17/03/2023", "DD/MM/YYYY"),
      shiftType: "Night",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("18/03/2023", "DD/MM/YYYY"),
      shiftType: "Rest",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("19/03/2023", "DD/MM/YYYY"),
      shiftType: "Off",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("26/04/2023", "DD/MM/YYYY"),
      shiftType: "Day",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("27/04/2023", "DD/MM/YYYY"),
      shiftType: "Evening",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("16/04/2023", "DD/MM/YYYY"),
      shiftType: "Day",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
    {
      date: moment("17/04/2023", "DD/MM/YYYY"),
      shiftType: "Evening",
      hoursFrom: "08:00",
      hoursTo: "16:30",
      totalHours: "8.5hrs",
    },
  ];

  const [displayingRosterDetails, setDisplayingRosterDetails] = useState([]);
  const [allRosterDetail, setAllRosterDetail] = useState([]);
  const [displayingMonthYear, setDisplayingMonthYear] = useState("");
  const [customDateStyles, setCustomDateStyles] = useState([]);

  const { getShiftColor } = useRosterShift();

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

    setAllRosterDetail(rosterDetailDummy);
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

    for (let i = 0; i < tempRosterDetails.length; i++) {
      // const dateStart = moment(tempRosterDetails[i].dateStart, "DD/MM/YYYY").startOf("day");
      // const dateEnd = moment(tempRosterDetails[i].dateEnd, "DD/MM/YYYY").startOf("day");

      // const dates = getAllDaysBetween(dateStart, dateEnd);

      //TODO: maybe we can put the colours in the main datasource so we don't have to calculate the colours everytime
      tempRosterDetails.forEach((item) => {
        customDates.push({
          date: moment(item.date, "DD/MM/YYYY").clone(), //TODO: moment can be removed here if main datasource has already been formatted
          style: { backgroundColor: getShiftColor(item.shiftType) },
          textStyle: { color: "white" },
          containerStyle: [],
          allowDisabled: true,
        });
      });
    }

    setCustomDateStyles(customDates);
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

  return { customDateStyles, displayingRosterDetails, displaySelectedMonthYear, getItemIndex, handleMonthChange };
};
