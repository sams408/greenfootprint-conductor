
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/hooks/useLanguage";

// Datos de ejemplo para las estadísticas
const monthlyData = [
  { name: 'Jan', emissions: 400, reduction: 24 },
  { name: 'Feb', emissions: 380, reduction: 28 },
  { name: 'Mar', emissions: 360, reduction: 26 },
  { name: 'Apr', emissions: 340, reduction: 30 },
  { name: 'May', emissions: 320, reduction: 32 },
  { name: 'Jun', emissions: 310, reduction: 35 },
  { name: 'Jul', emissions: 305, reduction: 40 },
];

const emissionsBySource = [
  { name: 'Transport', value: 35 },
  { name: 'Electricity', value: 25 },
  { name: 'Diet', value: 20 },
  { name: 'Waste', value: 15 },
  { name: 'Others', value: 5 },
];

const Statistics = () => {
  const { t, language } = useLanguage();
  
  // Traduce los nombres de las categorías según el idioma
  const getTranslatedData = () => {
    if (language === 'es') {
      return [
        { name: t('transport'), value: 35 },
        { name: t('electricity'), value: 25 },
        { name: t('diet'), value: 20 },
        { name: t('waste'), value: 15 },
        { name: t('others'), value: 5 },
      ];
    }
    return emissionsBySource;
  };

  // Traduce los meses según el idioma
  const getTranslatedMonthlyData = () => {
    if (language === 'es') {
      const monthTranslations: Record<string, string> = {
        'Jan': t('jan'),
        'Feb': t('feb'),
        'Mar': t('mar'),
        'Apr': t('apr'),
        'May': t('may'),
        'Jun': t('jun'),
        'Jul': t('jul'),
      };
      
      return monthlyData.map(item => ({
        ...item,
        name: monthTranslations[item.name] || item.name
      }));
    }
    return monthlyData;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('statistics')}</h1>
            <p className="text-muted-foreground">
              {t('carbonFootprint')}
            </p>
          </div>
          <div className="text-sm text-muted-foreground mt-2 md:mt-0">
            {t('lastUpdate')}: {new Date().toLocaleDateString()}
          </div>
        </div>
        <Separator className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('monthlyEmissions')}</CardTitle>
              <CardDescription>
                {t('totalReduction')}: 35%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getTranslatedMonthlyData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" wrapperStyle={{ paddingTop: '15px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="emissions" 
                      name={t('emissions')}
                      stroke="#3B82F6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reduction" 
                      name={t('reduction')}
                      stroke="#10B981" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('carbonFootprint')}</CardTitle>
              <CardDescription>
                {t('distribution')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getTranslatedData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" wrapperStyle={{ paddingTop: '15px' }} />
                    <Bar dataKey="value" name={t('emissions')} fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
