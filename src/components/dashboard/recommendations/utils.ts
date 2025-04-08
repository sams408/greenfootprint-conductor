
export const getImpactStyle = (impact: string) => {
  if (impact === 'Alto' || impact === 'High') return "bg-green-100 text-green-800";
  if (impact === 'Medio' || impact === 'Medium') return "bg-amber-100 text-amber-800";
  return "bg-blue-100 text-blue-800";
};

export const getImpactText = (impact: string, language: string) => {
  const isEnglish = language === 'en';
  if (impact === 'Alto' || impact === 'High') return isEnglish ? 'High Impact' : 'Impacto Alto';
  if (impact === 'Medio' || impact === 'Medium') return isEnglish ? 'Medium Impact' : 'Impacto Medio';
  return isEnglish ? 'Low Impact' : 'Impacto Bajo';
};
