import { useEffect } from "react";

export default useDate = () => {
  // const [calculatedWorkingHours, setCalculatedWorkingHours] = useState(0);

  useEffect(() => {
    // calculateWorkingHoursBetweenDays();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  const getAllDaysBetween = (startDate, endDate) => {
    let dates = [];

    for (let date = startDate; date.isSameOrBefore(endDate); date.add(1, "day")) {
      dates.push(date.clone());
    }
    return dates;
  };

  const calculateWorkingHoursBetweenDays = (startDate, endDate, startTime, endTime) => {
    if (startDate.isBefore(endDate, "day")) {
      const numOfDays = endDate.diff(startDate, "days");
      return (numOfDays + 1) * 8;
    } else {
      const numOfHours = endTime.diff(startTime, "hours", true);
      return numOfHours;
    }
  };

  return {
    getAllDaysBetween,
    calculateWorkingHoursBetweenDays,
  };
};
