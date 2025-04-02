
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
  const { t } = useLanguage();

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
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="emissions" 
                      stroke="#3B82F6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reduction" 
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
                  <BarChart data={emissionsBySource}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
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
