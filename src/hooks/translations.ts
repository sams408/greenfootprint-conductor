type Language = 'es' | 'en';

export type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Dictionary with translations
export const translations: Translations = {
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
    user: 'Usuario',
    // Nuevas traducciones para el formulario de emisiones
    emissionRegistration: 'Registro de Emisiones',
    enterConsumptionData: 'Introduce los datos de consumo para calcular tu huella de carbono',
    fuelType: 'Tipo de Combustible',
    selectFuel: 'Seleccionar combustible',
    consumption: 'Consumo',
    unit: 'Unidad',
    selectUnit: 'Seleccionar unidad',
    source: 'Fuente',
    selectSource: 'Seleccionar fuente',
    period: 'Período',
    registerEmissions: 'Registrar Emisiones',
    diesel: 'Diésel',
    gasoline: 'Gasolina',
    naturalGas: 'Gas Natural',
    lpg: 'GLP (Gas Licuado)',
    liters: 'Litros',
    kilograms: 'Kilogramos',
    cubicMeters: 'Metros cúbicos',
    buildings: 'Edificios',
    vehicleFleet: 'Flota Vehicular',
    machinery: 'Maquinaria',
    energyType: 'Tipo de Energía',
    selectEnergyType: 'Seleccionar tipo de energía',
    heatCool: 'Calor/Frío',
    steam: 'Vapor',
    kwh: 'kWh',
    mwh: 'MWh',
    gj: 'GJ',
    location: 'Ubicación',
    locationPlaceholder: 'Oficina central, planta, etc.',
    category: 'Categoría',
    selectCategory: 'Seleccionar categoría',
    businessTravel: 'Viajes de Negocio',
    employeeCommuting: 'Desplazamiento Empleados',
    purchasedGoods: 'Bienes y Servicios',
    description: 'Descripción',
    descriptionPlaceholder: 'Descripción breve',
    amount: 'Cantidad',
    kilometers: 'Kilómetros',
    units: 'Unidades',
    euros: 'Euros',
    emissionsFactorNote: 'Los factores de emisión se aplican según el Greenhouse Gas Protocol y la ISO 14064.',
    dataSubmitted: 'Datos guardados',
    emissionDataRegistered: 'Los datos de emisión han sido registrados correctamente.',
    // Traducciones para el sidebar
    home: 'Inicio',
    tasks: 'Mis tareas',
    dataCollection: 'Recolección de datos',
    reduction: 'Reducción',
    scenarios: 'Escenarios',
    initiatives: 'Iniciativas',
    projection: 'Proyección',
    partners: 'Partners',
    certifications: 'Certificaciones',
    subsidies: 'Subvenciones',
    reports: 'Informes',
    publicProfile: 'Perfil público',
    awareness: 'Concientización',
    settings: 'Ajustes',
    viewProfile: 'Ver perfil',
    measurementTitle: 'MEDICIÓN',
    actionPlanTitle: 'PLAN DE ACCIÓN',
    communicationTitle: 'COMUNICACIÓN',
    configurationTitle: 'CONFIGURACIÓN',
    goTo: 'Ir a...',
    // Nuevas traducciones para las gráficas
    emissionsByScope: 'Emisiones por Alcance',
    monthlyComparisonOfEmissions: 'Comparación mensual de emisiones',
    detailedView: 'Vista detallada',
    comparisons: 'Comparaciones',
    summary: 'Resumen',
    detailedEmissionsBreakdown: 'Desglose detallado de emisiones',
    yearToDateData: 'Datos del año hasta la fecha',
    yearlyChange: 'Cambio anual',
    companyVehicles: 'Vehículos de empresa',
    purchasedElectricity: 'Electricidad comprada',
    comparisonWithBenchmarks: 'Comparación con referencias',
    industryAndGlobalComparisons: 'Comparaciones con la industria y globales',
    metric: 'Métrica',
    yourEmissions: 'Tus emisiones',
    industryAverage: 'Promedio de la industria',
    nationalAverage: 'Promedio nacional',
    globalAverage: 'Promedio global',
    totalEmissions: 'Emisiones totales',
    perEmployeeEmissions: 'Emisiones por empleado',
    energyIntensity: 'Intensidad energética',
    annualResults: 'Resultados anuales',
    yearOverYearComparison: 'Comparación año tras año',
    currentYear: 'Año actual',
    previousYear: 'Año anterior',
    fromPreviousYear: 'desde el año anterior',
    fromYearBefore: 'desde dos años atrás',
    accumulatedResults: 'Resultados acumulados',
    progressTowardsReductionGoals: 'Progreso hacia metas de reducción',
    shortTermGoal: 'Meta a corto plazo',
    mediumTermGoal: 'Meta a medio plazo',
    longTermGoal: 'Meta a largo plazo',
    by: 'para',
    complete: 'completado',
    emissions: 'Emisiones',
    reduction: 'Reducción',
    highlightedInsights: 'Hallazgos destacados',
    transportHighestContributor: 'El transporte es el mayor contribuyente',
    electricityReduction: 'Reducción del consumo eléctrico',
    wasteManagementImproving: 'La gestión de residuos está mejorando',
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
    user: 'User',
    // New translations for the emission form
    emissionRegistration: 'Emission Registration',
    enterConsumptionData: 'Enter consumption data to calculate your carbon footprint',
    fuelType: 'Fuel Type',
    selectFuel: 'Select fuel',
    consumption: 'Consumption',
    unit: 'Unit',
    selectUnit: 'Select unit',
    source: 'Source',
    selectSource: 'Select source',
    period: 'Period',
    registerEmissions: 'Register Emissions',
    diesel: 'Diesel',
    gasoline: 'Gasoline',
    naturalGas: 'Natural Gas',
    lpg: 'LPG (Liquefied Gas)',
    liters: 'Liters',
    kilograms: 'Kilograms',
    cubicMeters: 'Cubic meters',
    buildings: 'Buildings',
    vehicleFleet: 'Vehicle Fleet',
    machinery: 'Machinery',
    energyType: 'Energy Type',
    selectEnergyType: 'Select energy type',
    heatCool: 'Heat/Cool',
    steam: 'Steam',
    kwh: 'kWh',
    mwh: 'MWh',
    gj: 'GJ',
    location: 'Location',
    locationPlaceholder: 'Headquarters, plant, etc.',
    category: 'Category',
    selectCategory: 'Select category',
    businessTravel: 'Business Travel',
    employeeCommuting: 'Employee Commuting',
    purchasedGoods: 'Purchased Goods & Services',
    description: 'Description',
    descriptionPlaceholder: 'Brief description',
    amount: 'Amount',
    kilometers: 'Kilometers',
    units: 'Units',
    euros: 'Euros',
    emissionsFactorNote: 'Emission factors are applied according to the Greenhouse Gas Protocol and ISO 14064.',
    dataSubmitted: 'Data saved',
    emissionDataRegistered: 'Emission data has been successfully recorded.',
    // Translations for the sidebar
    home: 'Home',
    tasks: 'My tasks',
    dataCollection: 'Data Collection',
    reduction: 'Reduction',
    scenarios: 'Scenarios',
    initiatives: 'Initiatives',
    projection: 'Projection',
    partners: 'Partners',
    certifications: 'Certifications',
    subsidies: 'Subsidies',
    reports: 'Reports',
    publicProfile: 'Public Profile',
    awareness: 'Awareness',
    settings: 'Settings',
    viewProfile: 'View profile',
    measurementTitle: 'MEASUREMENT',
    actionPlanTitle: 'ACTION PLAN',
    communicationTitle: 'COMMUNICATION',
    configurationTitle: 'CONFIGURATION',
    goTo: 'Go to...',
    // New translations for the charts
    emissionsByScope: 'Emissions by Scope',
    monthlyComparisonOfEmissions: 'Monthly comparison of emissions',
    detailedView: 'Detailed View',
    comparisons: 'Comparisons',
    summary: 'Summary',
    detailedEmissionsBreakdown: 'Detailed Emissions Breakdown',
    yearToDateData: 'Year-to-date data',
    yearlyChange: 'Yearly change',
    companyVehicles: 'Company Vehicles',
    purchasedElectricity: 'Purchased Electricity',
    comparisonWithBenchmarks: 'Comparison with Benchmarks',
    industryAndGlobalComparisons: 'Industry and global comparisons',
    metric: 'Metric',
    yourEmissions: 'Your Emissions',
    industryAverage: 'Industry Average',
    nationalAverage: 'National Average',
    globalAverage: 'Global Average',
    totalEmissions: 'Total Emissions',
    perEmployeeEmissions: 'Per Employee Emissions',
    energyIntensity: 'Energy Intensity',
    annualResults: 'Annual Results',
    yearOverYearComparison: 'Year-over-year comparison',
    currentYear: 'Current year',
    previousYear: 'Previous year',
    fromPreviousYear: 'from previous year',
    fromYearBefore: 'from year before',
    accumulatedResults: 'Accumulated Results',
    progressTowardsReductionGoals: 'Progress towards reduction goals',
    shortTermGoal: 'Short-term goal',
    mediumTermGoal: 'Medium-term goal',
    longTermGoal: 'Long-term goal',
    by: 'by',
    complete: 'complete',
    emissions: 'Emissions',
    reduction: 'Reduction',
    highlightedInsights: 'Highlighted Insights',
    transportHighestContributor: 'Transport is the highest contributor',
    electricityReduction: 'Electricity consumption reduction',
    wasteManagementImproving: 'Waste management is improving',
  },
};
