
export type Language = 'es' | 'en';

export type TranslationCategory = {
  [key in Language]: {
    [key: string]: string;
  };
};

export type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};
