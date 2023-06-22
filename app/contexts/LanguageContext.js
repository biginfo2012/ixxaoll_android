import React, {useState, useEffect} from 'react';
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';
import * as Localisation from 'expo-localization';
import i18n from '../constants/i18n';
import { authStorage } from "app/auth";


const Context = React.createContext()

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState(i18n.locale);

     // In the beginning of App, check if user has selected language before. 
     // If not, use system default language
     useEffect(() => {
        authStorage.getLocale().then(data => {
             if (data === null) {
             setLanguage(Localisation.locale)
             }
             else {
               setLanguage(data)
             }  
              
             console.log('language inside useEffect', language)          
             }).catch((error) => console.log(error))    
       }, [])
 
    
    const changeLanguage = async (language) => {
        if (language === 'ar') {
          I18nManager.forceRTL(true);
          I18nManager.allowRTL(true);
        } else {
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
        }
        setLanguage(language);
        await Updates.reloadAsync();
        await authStorage.storeLocale(language);
    }

    
    return (
    <Context.Provider
      value={{
        locale: language,
        changeLanguage
      }}
    >
      {children}
    </Context.Provider>)   
}
export default Context