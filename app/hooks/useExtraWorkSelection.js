import { useEffect, useState } from "react";

import authStorage from "../auth/storage";

export default useExtraWorkSelection = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    
    const getEmployees = async () => {

      setEmployees([
        {
          employeeId: 1,
          title: "John Doe",          
        },
        {
          employeeId: 2,
          title: "Jane White",          
        },
        {
          employeeId: 3,
          title: "Mike Brown",          
        },
      ]);
    };

    getEmployees();

    return () => {}; //this handles unmounted component memory leak
  }, []);

  return { employees };
};
