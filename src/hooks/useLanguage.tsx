
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
    register: 'Registrarse',
    createAccount: 'Crear cuenta',
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    password: 'Contraseña',
    emailPlaceholder: 'tu@correo.com',
    fullNamePlaceholder: 'Tu nombre completo',
    completeFormToRegister: 'Completa el formulario para registrarte en la plataforma',
    enterCredentials: 'Ingresa tus credenciales para acceder a tu cuenta',
    carbonFootprintManagement: 'Plataforma de gestión de huella de carbono',
    english: 'Inglés',
    spanish: 'Español',
    chooseLanguage: 'Elegir idioma',
    allScopes: 'Todos los alcances',
    scope1: 'Alcance 1',
    scope2: 'Alcance 2',
    scope3: 'Alcance 3',
    allCategories: 'Todas las categorías',
    fuels: 'Combustibles',
    travel: 'Viajes',
    search: 'Buscar',
    showing: 'Mostrando',
    of: 'de',
    records: 'registros',
    previous: 'Anterior',
    next: 'Siguiente',
    active: 'Activo',
    maintenance: 'Mantenimiento',
    inactive: 'Inactivo',
    confirmDelete: 'Confirmar eliminación',
    deleteConfirmation: '¿Estás seguro de que quieres eliminar este elemento?',
    cancel: 'Cancelar',
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
    register: 'Register',
    createAccount: 'Create Account',
    fullName: 'Full Name',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'you@email.com',
    fullNamePlaceholder: 'Your full name',
    completeFormToRegister: 'Complete the form to register on the platform',
    enterCredentials: 'Enter your credentials to access your account',
    carbonFootprintManagement: 'Carbon footprint management platform',
    english: 'English',
    spanish: 'Spanish',
    chooseLanguage: 'Choose language',
    allScopes: 'All scopes',
    scope1: 'Scope 1',
    scope2: 'Scope 2',
    scope3: 'Scope 3',
    allCategories: 'All categories',
    fuels: 'Fuels',
    travel: 'Travel',
    waste: 'Waste',
    search: 'Search',
    showing: 'Showing',
    of: 'of',
    records: 'records',
    previous: 'Previous',
    next: 'Next',
    active: 'Active',
    maintenance: 'Maintenance',
    inactive: 'Inactive',
    confirmDelete: 'Confirm deletion',
    deleteConfirmation: 'Are you sure you want to delete this item?',
    cancel: 'Cancel',
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
