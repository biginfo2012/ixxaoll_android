import Constants from "expo-constants";

export default useAbsencesDummyData = () => {
  if (!Constants?.manifest?.extra?.dummyData) {
    return [];
  }

  const dummyData = {
    data: [
      {
        dateStart: "09/10/2022",
        dateEnd: "09/10/2022",
        timeStart: "08:00",
        timeEnd: "16:00",
      },
      {
        dateStart: "02/12/2022",
        dateEnd: "02/12/2022",
        timeStart: "08:00",
        timeEnd: "16:00",
      },
      {
        dateStart: "12/12/2022",
        dateEnd: "15/12/2022",
        timeStart: "08:00",
        timeEnd: "16:00",
      },
      {
        dateStart: "29/12/2022",
        dateEnd: "02/01/2023",
        timeStart: "08:00",
        timeEnd: "16:00",
      },
      {
        dateStart: "12/01/2023",
        dateEnd: "12/01/2023",
        timeStart: "08:00",
        timeEnd: "12:00",
      },
    ],
  };

  return { dummyData };
};
