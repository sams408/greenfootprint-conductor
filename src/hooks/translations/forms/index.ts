
import { TranslationCategory } from '../types';
import { authTranslations } from './auth';
import { generalFormTranslations } from './general';
import { emissionsTranslations } from './emissions';
import { energyTranslations } from './energy';
import { locationsTranslations } from './locations';
import { categoriesTranslations } from './categories';
import { documentsTranslations } from './documents';
import { commonTranslations } from '../common';

// Merge all form translation categories
export const formTranslations: TranslationCategory = {
  es: {
    ...commonTranslations.es,
    ...authTranslations.es,
    ...generalFormTranslations.es,
    ...emissionsTranslations.es,
    ...energyTranslations.es,
    ...locationsTranslations.es,
    ...categoriesTranslations.es,
    ...documentsTranslations.es,
  },
  en: {
    ...commonTranslations.en,
    ...authTranslations.en,
    ...generalFormTranslations.en,
    ...emissionsTranslations.en,
    ...energyTranslations.en,
    ...locationsTranslations.en,
    ...categoriesTranslations.en,
    ...documentsTranslations.en,
  }
};
