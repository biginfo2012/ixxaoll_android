import { useEffect, useState } from "react";
import { Alert } from "react-native";
import moment from "moment";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sentry from "sentry-expo";
import { timesheetApi } from "app/api";

import useTimesheetsShift from "./useTimesheetsShift";

export default useTimeSheets = () => {
  const [displayingTimesheetsDetails, setDisplayingTimesheetsDetails] = useState([]);
  const [allTimesheetsDetail, setAllTimesheetsDetail] = useState([]);
  const [displayingMonthYear, setDisplayingMonthYear] = useState("");
  const [customDateStyles, setCustomDateStyles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [monthIndex, setMonthIndex] = useState(moment().format("YYYYMM"));

  const { getShiftColor } = useTimesheetsShift();
  const getTimeSheetApi = useApi(timesheetApi.getTimesheetsForEmployeeAsManager);
  const downloadTimesheetApi = useApi(timesheetApi.downloadTimeSheet);
  const downloadEmailTimesheetApi = useApi(timesheetApi.downloadEmailTimesheet);

  useEffect(() => {
    loadTimesheetsDetail();
    setDisplayingMonthYear(moment());

    return () => {}; //this handles unmounted component memory leak
  }, []);

  useEffect(() => {
    filterRosterDetails();

    return () => {};
  }, [allTimesheetsDetail, displayingMonthYear]);

  const loadTimesheetsDetail = async () => {
    //TODO: for timesheets and clocking, we can use the .loading of the useAPI

    const response = await getTimeSheetApi.request(monthIndex);

    if (response?.data && response?.status === 200) {
      let timesheet = [];

      response.data.map((data) => {
        const body = {
          date: moment(data.date),
          shiftType: "Off",
          hours: `${data.timeIn} - ${data.timeOut}`,
          totalHours: data.hours,
        };

        timesheet.push(body);
      });
      setAllTimesheetsDetail(timesheet);
    } else {
      Alert.alert("Error", "An error has occurred. Please try again.");
      Sentry.Native.captureException(new Error("LoadTimesheetDetail: Error encountered."));
    }
  };

  const sendEmail = async (monthIndex) => {
    // setLoading(true);

    const response = await downloadEmailTimesheetApi.request(monthIndex);

    if (response?.status === 200) {
      Alert.alert("Success", "The timesheet has been sent to your email inbox.");
    } else {
      Alert.alert("Error", "An error has occurred. Please try again.");
      Sentry.Native.captureException(new Error("SendEmail: Error encountered."));
    }

    // setLoading(false);
  };

  const download = async (monthIndex) => {
    setShowDownloadModal(true);

    const res = await downloadTimesheetApi.request(monthIndex);
    const url = res.request.responseURL;
    const file_name = "Timesheet.pdf";

    try {
      FileSystem.downloadAsync(url, FileSystem.documentDirectory + file_name).then(async ({ uri }) => {
        let content = await FileSystem.getContentUriAsync(uri);

        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: content,
          flags: 1,
          type: "application/pdf",
        });

        setShowDownloadModal(false);
      });
    } catch (e) {
      Sentry.Native.captureException(new Error("DownloadTimesheet: Error encountered."));
      setShowDownloadModal(false);
    }
  };

  /*
    The below is valid code for storing a file locally in the downloads folder.
  */
  // const downloadCallback = (downloadProgress) => {
  //   const progress = downloadProgress.totalBytesWritten / 1000;
  //   setDownloadProgress(progress.toFixed(0));
  // };

  // const download = async (monthIndex) => {
  //   const res = await downloadTimesheet.request(monthIndex);
  //   const url = res.request.responseURL;
  //   setModalVisible(true);
  //   const file_name = "Timesheet.pdf";
  //   FileSystem.downloadAsync(url, FileSystem.documentDirectory + file_name)
  //     .then(async ({ uri }) => {
  //       const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  //       if (perm.status != "granted") {
  //         return;
  //       }
  //       const downloadResumable = FileSystem.createDownloadResumable(url, FileSystem.documentDirectory + file_name, {}, downloadCallback);
  //       try {
  //         const { uri } = await downloadResumable.downloadAsync();
  //         const asset = await MediaLibrary.createAssetAsync(uri);
  //         const album = await MediaLibrary.getAlbumAsync("Download");
  //         if (album == null) {
  //           await MediaLibrary.createAlbumAsync("Download", asset, false);
  //         } else {
  //           await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
  //           setModalVisible(false);
  //           setDownloadProgress(0);
  //           Alert.alert("Success", "file is in your download folder on your device");
  //         }
  //       } catch (e) {
  //         Alert.alert("Error", "An error occurred while downloading the timesheet.");
  //         Sentry.Native.captureException(e);
  //         setModalVisible(false);
  //         setDownloadProgress(0);
  //       }
  //     })
  //     .catch((error) => {
  //       Alert.alert("Error", "An error occurred while downloading the timesheet.");
  //       Sentry.Native.captureException(error);
  //       setModalVisible(false);
  //       setDownloadProgress(0);
  //     });
  // };

  const filterRosterDetails = () => {
    const startOfDisplayingMonthYear = moment(displayingMonthYear).startOf("month");
    const endOfDisplayingMonthYear = moment(displayingMonthYear).endOf("month");

    const tempTimesheetsDetails = allTimesheetsDetail.filter((a) => {
      const date = moment(a.date, "DD/MM/YYYY");

      return date.isBetween(startOfDisplayingMonthYear, endOfDisplayingMonthYear, "day");
    });

    setDisplayingTimesheetsDetails(tempTimesheetsDetails);

    let customDates = [];
    for (let i = 0; i < tempTimesheetsDetails.length; i++) {
      // const dateStart = moment(tempTimesheetsDetails[i].dateStart, "DD/MM/YYYY").startOf("day");
      // const dateEnd = moment(tempTimesheetsDetails[i].dateEnd, "DD/MM/YYYY").startOf("day");

      // const dates = getAllDaysBetween(dateStart, dateEnd);

      //TODO: maybe we can put the colours in the main datasource so we don't have to calculate the colours everytime
      tempTimesheetsDetails.forEach((item) => {
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

  const handleMonthChange = async (date) => {
    setDisplayingMonthYear(date);
    const monthIndex = moment(date).format("YYYYMM");
    const response = await getTimeSheetApi.request(monthIndex);

    let timesheet = [];
    response.data.map((data) => {
      const body = {
        date: moment(data.date),
        shiftType: "Off",
        hours: `${data.timeIn} - ${data.timeOut}`,
        totalHours: data.hours,
      };

      timesheet.push(body);
    });
    setAllTimesheetsDetail(timesheet);
    setMonthIndex(monthIndex);
  };

  const displaySelectedMonthYear = () => {
    return moment(displayingMonthYear).format("MMMM");
  };

  const getItemIndex = (date) => {
    const index = displayingTimesheetsDetails.findIndex((item) => date.isSame(item.date, "day"));
    return index;
  };

  return {
    customDateStyles,
    displayingTimesheetsDetails,
    isLoading,
    showDownloadModal,
    displaySelectedMonthYear,
    monthIndex,
    getItemIndex,
    handleMonthChange,
    download,
    sendEmail,
    getTimeSheetApi,
    downloadEmailTimesheetApi,
  };
};
