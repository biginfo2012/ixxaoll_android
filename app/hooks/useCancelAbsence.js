import { useEffect, useState } from "react";
import { absencesApi } from "app/api";
import { useDate } from "app/hooks";

import moment from "moment";

export default useCancelAbsence = (absence) => {
  const getAbsences = useApi(absencesApi.getAbsences);

  const { calculateWorkingHoursBetweenDays } = useDate();
  const [calculatedWorkingHours, setCalculatedWorkingHours] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadCalculatedWorkingHours();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  const loadCalculatedWorkingHours = () => {
    const startDate = moment(absence.dateStart, "DD/MM/YYYY");
    const endDate = moment(absence.dateEnd, "DD/MM/YYYY");

    const startTime = moment(absence.timeStart, "HH:mm");
    const endTime = moment(absence.timeEnd, "HH:mm");

    const hours = calculateWorkingHoursBetweenDays(startDate, endDate, startTime, endTime);
    setCalculatedWorkingHours(hours);
  };

  const displayDate = () => {
    return `${absence.dateStart} - ${absence.dateEnd}`;
  };

  return { calculatedWorkingHours, displayDate, comment, setComment };
};
