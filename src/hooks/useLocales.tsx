import { useTranslation } from 'react-i18next';
// '@mui
import { enUS, deDE, frFR } from '@mui/material/locale';
import amET from '../locales/am.json'
// ----------------------------------------------------------------------
console.log("amharic language .........",amET)
const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'https://wiki2.railml.org/images/b/b8/UK_flag.png',
  },
  {
    label: 'Amharic',
    value: 'am',
    systemValue: amET,
    icon: 'https://freepngdesign.com/content/uploads/images/ethiopia-large-flag-3534.png', // Assuming you have an Amharic flag icon
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
    localStorage.setItem('i18nextLng', newlang);

  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
