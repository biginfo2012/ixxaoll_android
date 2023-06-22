import { useEffect, useState } from "react";
import moment from "moment";
import authStorage from "../auth/storage";
import { timesheetApi } from "app/api";

export default useTimesheetsApproval = (employee) => {
  const [displayingTimesheetsDetails, setDisplayingTimesheetsDetails] = useState([]);
  const [isAllApproved, setAllApproved] = useState(false);
  const [isAllRejected, setAllRejected] = useState(false);
  const [isUndoPress, setIsUndoPress] = useState(true);
  const [index, setIndex] = useState(0);
  const [allApproveRejectIndex, setAllApprovedRejectIndex] = useState([]);
  const [employeeTimesheet, setEmployeeTimesheet] = useState([]);

  const handleTimesheetApi = useApi(timesheetApi.handleEmployeeTimesheet);

  useEffect(() => {
    setAllRejected(false);
    setAllApproved(false);
    setIsUndoPress(true);
    loadTimesheetsDetails();
  }, []);

  const loadTimesheetsDetails = () => {
    //TODO: to load from server
    setDisplayingTimesheetsDetails(employee.timesheets);
  };

  const onPressApprove = async (item) => {
    const managerId = await authStorage.getEmployeeId();

    let body = {};
    let timesheet = [];

    const newTimesheets = displayingTimesheetsDetails.map((obj, i) => {
      if (obj.id === item.id) {
        setIndex(i);
        const body = {
          TimesheetId: item.id,
          action: "Approve",
        };
        employeeTimesheet.push(body);
        // timesheet.push(bod)
        body = {
          ManagerId: managerId,
          EmployeeId: employee.employeeId,
          Timesheets: employeeTimesheet,
        };
        return { ...obj, status: "Approved" };
      }
      return obj;
    });

    const response = await handleTimesheetApi.request(body);

    setDisplayingTimesheetsDetails(newTimesheets);
    setIsUndoPress(false);
  };

  const onPressReject = async (item) => {
    
    const managerId = await authStorage.getEmployeeId();


    let body = {};
    let timesheet = [];
    const newTimesheets = displayingTimesheetsDetails.map((obj, i) => {
      if (obj.id === item.id) {
        setIndex(i);
        const bod = {
          TimesheetId: item.id,
          action: "Decline",
        };
        employeeTimesheet.push(bod);
        // timesheet.push(bod)
        body = {
          ManagerId: managerId,
          EmployeeId: employee.employeeId,
          Timesheets: employeeTimesheet,
        };
        return { ...obj, status: "Rejected" };
      }
      return obj;
    });
    const response = await handleTimesheetApi.request(body);
    console.log(response.data);
    setDisplayingTimesheetsDetails(newTimesheets);
    setIsUndoPress(false);
  };

  const onPressApproveAll = () => {
    //TODO: update status using endpoints
    let newIndex = [];
    const newTimesheets = displayingTimesheetsDetails.map((obj, i) => {
      if (obj.status == null) {
        newIndex.push(i);
      }
      if (obj.status !== "Rejected") {
        return { ...obj, status: "Approved" };
      }
      return obj;
    });
    setAllApprovedRejectIndex(newIndex);
    setAllApproved(true);
    setIsUndoPress(false);
    setDisplayingTimesheetsDetails(newTimesheets);
  };

  const onPressRejectAll = () => {
    //TODO: update status using endpoints
    let newIndex = [];
    const newTimesheets = displayingTimesheetsDetails.map((obj, i) => {
      if (obj.status == null) {
        newIndex.push(i);
      }
      if (obj.status !== "Approved") {
        return { ...obj, status: "Rejected" };
      }
      return obj;
    });
    setAllApprovedRejectIndex(newIndex);
    setAllRejected(true);
    setIsUndoPress(false);
    setDisplayingTimesheetsDetails(newTimesheets);
  };

  const onPressUndo = async () => {
    if (isAllApproved || isAllRejected) {
      let newTimesheets = [];
      allApproveRejectIndex.map((indx) => {
        displayingTimesheetsDetails[indx].status = null;
        newTimesheets = displayingTimesheetsDetails;
      });
      setDisplayingTimesheetsDetails(newTimesheets);
      setAllRejected(false);
      setAllApproved(false);
      setIsUndoPress(true);
      return;
    }
    setIndex((state) => {
      const newTimesheets = displayingTimesheetsDetails.map((obj, i) => {
        if (state === i) {
          return { ...obj, status: null };
        }
        return obj;
      });
      setDisplayingTimesheetsDetails(newTimesheets);
      return state;
    });
    setIsUndoPress(true);
  };

  const onPressReset = () => {
    setDisplayingTimesheetsDetails(employee.timesheets);
    setAllRejected(false);
    setAllApproved(false);
  };

  return {
    displayingTimesheetsDetails,
    isAllApproved,
    isAllRejected,
    isUndoPress,
    allApproveRejectIndex,
    onPressApprove,
    onPressReject,
    onPressApproveAll,
    onPressRejectAll,
    onPressUndo,
    onPressReset,
  };
};
