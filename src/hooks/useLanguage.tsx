
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Diccionario con las traducciones
const translations: Translations = {
  es: {
    dashboard: 'Panel',
    emissions: 'Emisiones',
    calculator: 'Calculadora',
    users: 'Usuarios',
    inventory: 'Inventario',
    statistics: 'Estadísticas',
    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    profile: 'Perfil',
    loading: 'Cargando...',
    emissionsByCategory: 'Emisiones por categoría',
    distribution: 'Distribución de la huella de carbono por fuente de emisión',
    transport: 'Transporte',
    electricity: 'Electricidad',
    diet: 'Dieta',
    waste: 'Residuos',
    others: 'Otros',
    inventoryItems: 'Elementos de inventario',
    equipmentType: 'Tipo de equipo',
    quantity: 'Cantidad',
    lastUpdate: 'Última actualización',
    status: 'Estado',
    actions: 'Acciones',
    addItem: 'Añadir elemento',
    view: 'Ver',
    edit: 'Editar',
    delete: 'Eliminar',
    monthlyEmissions: 'Emisiones mensuales',
    carbonFootprint: 'Huella de carbono',
    totalReduction: 'Reducción total',
    jan: 'Ene',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Abr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Ago',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dic',
  },
  en: {
    dashboard: 'Dashboard',
    emissions: 'Emissions',
    calculator: 'Calculator',
    users: 'Users',
    inventory: 'Inventory',
    statistics: 'Statistics',
    signIn: 'Sign in',
    signOut: 'Sign out',
    profile: 'Profile',
    loading: 'Loading...',
    emissionsByCategory: 'Emissions by category',
    distribution: 'Carbon footprint distribution by emission source',
    transport: 'Transport',
    electricity: 'Electricity',
    diet: 'Diet',
    waste: 'Waste',
    others: 'Others',
    inventoryItems: 'Inventory Items',
    equipmentType: 'Equipment Type',
    quantity: 'Quantity',
    lastUpdate: 'Last Update',
    status: 'Status',
    actions: 'Actions',
    addItem: 'Add Item',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    monthlyEmissions: 'Monthly Emissions',
    carbonFootprint: 'Carbon Footprint',
    totalReduction: 'Total Reduction',
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dec',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
