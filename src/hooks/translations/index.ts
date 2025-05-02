
import { Translations, Language } from './types';
import { commonTranslations } from './common';
import { dashboardTranslations } from './dashboard';
import { chartsTranslations } from './charts';
import { inventoryTranslations } from './inventory';
import { formTranslations } from './forms/index';
import { navigationTranslations } from './navigation';

// Function to combine all translation categories
const mergeTranslations = () => {
  const result: Translations = { es: {}, en: {} };
  
  const allTranslations = [
    commonTranslations,
    dashboardTranslations,
    chartsTranslations,
    inventoryTranslations,
    formTranslations,
    navigationTranslations
  ];
  
  // Combine all translations by language
  allTranslations.forEach(category => {
    Object.keys(category).forEach(lang => {
      if (lang === 'es' || lang === 'en') {
        // Check for duplicates before merging
        const duplicates = Object.keys(category[lang as Language])
          .filter(key => key in result[lang as Language]);
        
        if (duplicates.length > 0) {
          console.warn(`Warning: Found duplicate translation keys: ${duplicates.join(', ')}`);
        }
        
        result[lang as Language] = { ...result[lang as Language], ...category[lang as Language] };
      }
    });
  });
  
  return result;
};

// Export combined translations
export const translations: Translations = mergeTranslations();

// Re-export types for easier usage
export type { Language, Translations } from './types';
