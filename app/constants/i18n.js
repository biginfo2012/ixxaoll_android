import {I18n} from 'i18n-js';
import * as Localisation from 'expo-localization';
import translations from './translations';

const i18n = new I18n();

i18n.translations = translations;
i18n.locale = Localisation.locale.search(/-|_/) !== -1? 
Localisation.locale.slice(0, 2): Localisation.locale;

i18n.enableFallback = true;

export default i18n; 