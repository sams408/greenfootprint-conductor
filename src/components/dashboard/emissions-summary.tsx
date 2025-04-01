
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Ene', alcance1: 40, alcance2: 24, alcance3: 28 },
  { name: 'Feb', alcance1: 30, alcance2: 20, alcance3: 27 },
  { name: 'Mar', alcance1: 25, alcance2: 25, alcance3: 32 },
  { name: 'Abr', alcance1: 27, alcance2: 18, alcance3: 29 },
  { name: 'May', alcance1: 32, alcance2: 21, alcance3: 35 },
  { name: 'Jun', alcance1: 38, alcance2: 25, alcance3: 40 },
];

export function EmissionsSummary() {
  return (
    <Card className="col-span-2 eco-card">
      <CardHeader>
        <CardTitle>Emisiones por Alcance</CardTitle>
        <CardDescription>Comparativa mensual de emisiones de CO2eq (toneladas)</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #eaeaea' }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
              />
              <Legend />
              <Bar dataKey="alcance1" name="Alcance 1" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="alcance2" name="Alcance 2" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="alcance3" name="Alcance 3" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
