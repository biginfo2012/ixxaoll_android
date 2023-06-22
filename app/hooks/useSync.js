import { useEffect, useState } from "react";
import { profileApi } from "app/api/";
import authStorage from "../auth/storage";

export default useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const getProfileDefaultsApi = useApi(profileApi.getProfileDefaults);
  const getProfileDetailsApi = useApi(profileApi.getProfileDetails);

  //Sycn user Profiles
  const getProfileDetails = async () => {
    const profileDefaultsResponse = await getProfileDefaultsApi.request();
    const profileDetailsResponsse = await getProfileDetailsApi.request();
    if (profileDefaultsResponse || profileDetailsResponsse) {
      authStorage.storeProfileDefaults(profileDefaultsResponse.data ? profileDefaultsResponse.data : {})
      authStorage.storeProfileDetails(profileDetailsResponsse.data ? profileDetailsResponsse.data : {});
      setIsSyncing(false);
    }
  }

  const handlePressSync = () => {
    setIsSyncing(!isSyncing);
  };


  useEffect(() => {
    if (isSyncing) {
      getProfileDetails();
    }
    return () => {}; //this handles unmounted component memory leak
  }, [isSyncing]);

  return { isSyncing, handlePressSync };
};
