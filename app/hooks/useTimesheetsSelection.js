import { useEffect, useState } from "react";
import moment from "moment";
import authStorage from "../auth/storage";

export default useTimesheetsApproval = () => {
  const timesheetsDetailDummy = [
    {
      id: '1',
      date: moment("04/01/2023", "DD/MM/YYYY"),
      shiftType: "Evening",
      hours: "08:00 - 16:30",
      totalHours: "8.5hrs",
      status: null
    },
    {
      id: '2',
      date: moment("05/01/2023", "DD/MM/YYYY"),
      shiftType: "Night",
      hours: "08:00 - 16:30",
      totalHours: "8.5hrs",
      status: null
    },
    {
      id: '3',
      date: moment("07/01/2023", "DD/MM/YYYY"),
      shiftType: "Off",
      hours: "08:00 - 16:30",
      totalHours: "8.5hrs",
      status: null
    },
    {
      id: '4',
      date: moment("17/01/2023", "DD/MM/YYYY"),
      shiftType: "Night",
      hours: "08:00 - 16:30",
      totalHours: "8.5hrs",
      status: null
    },
    {
      id: '5',
      date: moment("16/02/2023", "DD/MM/YYYY"),
      shiftType: "Day",
      hours: "08:00 - 16:30",
      totalHours: "8.5hrs",
      status: null
    },
    {
      id: '16',
      date: moment("17/02/2023", "DD/MM/YYYY"),
      shiftType: "Evening",
      hours: "08:00 - 16:30",
      totalHours: "8.5hrs",
      status: null
    },
    {
      id: '7',
      date: moment("18/02/2023", "DD/MM/YYYY"),
      shiftType: "Night",
      hours: "08:00 - 16:30",
      totalHours: "8.5hrs",
      status: null
    },
  ];
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    
    const getEmployees = async () => {

      setEmployees([
        {
          employeeId: 1,
          title: "John Doe",  
          timesheets: timesheetsDetailDummy
        },
        {
          employeeId: 2,
          title: "Jane White",
          timesheets: timesheetsDetailDummy
        },
        {
          employeeId: 3,
          title: "Mike Brown",
          timesheets: timesheetsDetailDummy
        },
      ]);
    };

    getEmployees();
    return () => {}; //this handles unmounted component memory leak
  }, []);

  return { employees };
};
