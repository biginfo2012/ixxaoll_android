import { useEffect, useState } from "react";
import i18n from '../constants/i18n';
import authStorage from "../auth/storage";


export default useCompensation = () => {
  const compensation = [
    {
      id: 1,
      title: i18n.t('compensation.pay_stubs'),
      link: "PayStubsScreen",
      icon: "cash"      
    },
    {
      id: 2,
      title: i18n.t('compensation.annuals'),
      link: "AnnualsScreen",
      icon: "calendar-month"
    },
    {
      id: 3,
      title: i18n.t('compensation.advancements'),
      link: "AdvancementsScreen",
      icon: "palette-advanced"
    },
]

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(compensation);

    return () => {}; //this handles unmounted component memory leak
  }, []);

  return { items };
};
