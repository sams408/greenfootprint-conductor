
import { Translations } from './types';
import { commonTranslations } from './common';
import { dashboardTranslations } from './dashboard';
import { chartsTranslations } from './charts';
import { inventoryTranslations } from './inventory';
import { formsTranslations } from './forms';
import { navigationTranslations } from './navigation';

// Función para combinar todas las categorías de traducción
const mergeTranslations = () => {
  const result: Translations = { es: {}, en: {} };
  
  const allTranslations = [
    commonTranslations,
    dashboardTranslations,
    chartsTranslations,
    inventoryTranslations,
    formsTranslations,
    navigationTranslations
  ];
  
  // Combinar todas las traducciones por idioma
  allTranslations.forEach(category => {
    Object.keys(category).forEach(lang => {
      if (lang === 'es' || lang === 'en') {
        result[lang] = { ...result[lang], ...category[lang] };
      }
    });
  });
  
  return result;
};

// Exportamos las traducciones combinadas
export const translations: Translations = mergeTranslations();

// Re-exportar tipos para facilitar su uso
export type { Language, Translations } from './types';
