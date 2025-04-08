
// Factores de emisión simplificados (kg CO2e por unidad)
export const emissionFactors = {
  diesel: { liters: 2.68, kg: 3.21, m3: 2680 },
  gasoline: { liters: 2.31, kg: 2.8, m3: 2310 },
  natgas: { liters: 0, kg: 2.54, m3: 1.88 },
  lpg: { liters: 1.51, kg: 2.99, m3: 1510 },
  electricity: { kwh: 0.25, mwh: 250, gj: 69.4 },
  businessTravel: { km: 0.17, units: 0, euros: 0.05 },
  employeeCommuting: { km: 0.12, units: 0, euros: 0.04 },
  waste: { kg: 0.58, units: 0, euros: 0.02 },
  goods: { kg: 3.2, units: 15.5, euros: 0.08 },
};

export type CalculationData = {
  fuelType: string;
  consumption: string;
  unit: string;
  source: string;
  period: string;
};

export const calculateEmissions = (
  selectedAlcance: string,
  calculationData: CalculationData
): number | null => {
  let emissions = 0;
  const consumption = parseFloat(calculationData.consumption);
  
  if (isNaN(consumption)) {
    return null;
  }
  
  // Cálculo de emisiones según alcance y tipo de combustible/energía/categoría
  if (selectedAlcance === "alcance1" && calculationData.fuelType && calculationData.unit) {
    const fuelType = calculationData.fuelType as keyof typeof emissionFactors;
    const unit = calculationData.unit as keyof (typeof emissionFactors)[keyof typeof emissionFactors];
    
    if (emissionFactors[fuelType]?.[unit]) {
      emissions = consumption * emissionFactors[fuelType][unit];
    }
  } else if (selectedAlcance === "alcance2" && calculationData.fuelType && calculationData.unit) {
    const unit = calculationData.unit as keyof typeof emissionFactors.electricity;
    
    if (emissionFactors.electricity[unit]) {
      emissions = consumption * emissionFactors.electricity[unit];
    }
  } else if (selectedAlcance === "alcance3" && calculationData.source && calculationData.unit) {
    const sourceMap: Record<string, keyof typeof emissionFactors> = {
      "business-travel": "businessTravel",
      "employee-commuting": "employeeCommuting",
      "waste": "waste",
      "purchased-goods": "goods"
    };
    
    const source = sourceMap[calculationData.source];
    const unit = calculationData.unit as keyof (typeof emissionFactors)[keyof typeof emissionFactors];
    
    if (source && emissionFactors[source]?.[unit]) {
      emissions = consumption * emissionFactors[source][unit];
    }
  }

  return emissions > 0 ? emissions : null;
};
