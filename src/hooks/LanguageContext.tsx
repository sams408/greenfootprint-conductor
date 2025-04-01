
import { createContext, useState, useEffect, ReactNode } from 'react';
import { Translations, translations } from './translations';

export type Language = 'es' | 'en';

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Get stored language or use browser language as fallback
const getInitialLanguage = (): Language => {
  const storedLanguage = localStorage.getItem('language');
  
  if (storedLanguage === 'en' || storedLanguage === 'es') {
    return storedLanguage;
  }
  
  // Use browser language as fallback
  const browserLanguage = navigator.language.split('-')[0];
  return browserLanguage === 'en' ? 'en' : 'es';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Function to update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  // Effect to set initial document language
  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
