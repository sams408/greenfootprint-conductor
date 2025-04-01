
import { useContext } from 'react';
import { LanguageContext, LanguageContextType } from './LanguageContext';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Re-export the provider for convenience
export { LanguageProvider, LanguageContext } from './LanguageContext';
export type { Language } from './LanguageContext';
