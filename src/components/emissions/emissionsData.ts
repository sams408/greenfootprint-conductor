
export interface Emission {
  id: number;
  date: string;
  scope: string;
  category: string;
  description: string;
  value: number;
  unit: string;
}

// Sample emissions data
export const initialEmissionsData: Emission[] = [
  {
    id: 1,
    date: "2023-06-15",
    scope: "1",
    category: "Combustible Edificios",
    description: "Gas Natural Oficina Central",
    value: 12.5,
    unit: "Ton CO2eq",
  },
  {
    id: 2,
    date: "2023-06-10",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Oficina Central",
    value: 28.3,
    unit: "Ton CO2eq",
  },
  {
    id: 3,
    date: "2023-06-05",
    scope: "1",
    category: "Flota Empresarial",
    description: "Diésel Flota Comercial",
    value: 15.8,
    unit: "Ton CO2eq",
  },
  {
    id: 4,
    date: "2023-05-28",
    scope: "3",
    category: "Viajes de Trabajo",
    description: "Vuelos Internacionales",
    value: 34.2,
    unit: "Ton CO2eq",
  },
  {
    id: 5,
    date: "2023-05-20",
    scope: "3",
    category: "Servicios Subcontratados",
    description: "Gestión de Residuos",
    value: 8.7,
    unit: "Ton CO2eq",
  },
  {
    id: 6,
    date: "2023-05-15",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Centro Logístico",
    value: 19.5,
    unit: "Ton CO2eq",
  },
  {
    id: 7,
    date: "2023-05-10",
    scope: "1",
    category: "Combustible Edificios",
    description: "Gas Propano Cafetería",
    value: 5.2,
    unit: "Ton CO2eq",
  },
  {
    id: 8,
    date: "2023-05-05",
    scope: "3",
    category: "Transporte de Empleados",
    description: "Desplazamiento al Trabajo",
    value: 42.7,
    unit: "Ton CO2eq",
  },
  {
    id: 9,
    date: "2023-04-28",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Almacén",
    value: 16.9,
    unit: "Ton CO2eq",
  },
  {
    id: 10,
    date: "2023-04-20",
    scope: "1",
    category: "Flota Empresarial",
    description: "Gasolina Vehículos Comerciales",
    value: 22.3,
    unit: "Ton CO2eq",
  },
  {
    id: 11,
    date: "2023-04-15",
    scope: "3",
    category: "Servicios Subcontratados",
    description: "Tratamiento de Aguas Residuales",
    value: 7.4,
    unit: "Ton CO2eq",
  },
  {
    id: 12,
    date: "2023-04-10",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Servidores",
    value: 31.6,
    unit: "Ton CO2eq",
  },
  {
    id: 13,
    date: "2023-04-05",
    scope: "1",
    category: "Combustible Edificios",
    description: "Gas Natural Calefacción",
    value: 18.2,
    unit: "Ton CO2eq",
  },
  {
    id: 14,
    date: "2023-03-28",
    scope: "3",
    category: "Viajes de Trabajo",
    description: "Viajes en Tren",
    value: 5.8,
    unit: "Ton CO2eq",
  },
  {
    id: 15,
    date: "2023-03-20",
    scope: "2",
    category: "Consumo Eléctrico",
    description: "Electricidad Aire Acondicionado",
    value: 24.1,
    unit: "Ton CO2eq",
  }
];
