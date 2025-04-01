
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Bus, Factory, Lightbulb, Plane, ShoppingBag } from 'lucide-react';

const data = [
  { name: 'Combustible Edificios', value: 42, color: '#0B6E4F', icon: Building2 },
  { name: 'Flota Empresarial', value: 45, color: '#16a34a', icon: Bus },
  { name: 'Consumo Eléctrico', value: 116, color: '#08A4BD', icon: Lightbulb },
  { name: 'Viajes de Trabajo', value: 53, color: '#7FB685', icon: Plane },
  { name: 'Servicios Subcontratados', value: 38, color: '#a3e635', icon: Factory },
  { name: 'Compras', value: 30, color: '#84cc16', icon: ShoppingBag },
];

export function ScopeBreakdown() {
  return (
    <Card className="eco-card">
      <CardHeader>
        <CardTitle>Desglose por Categorías</CardTitle>
        <CardDescription>Distribución de emisiones por categoría (Ton CO2eq)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                innerRadius={40}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #eaeaea' }}
                formatter={(value: number) => [`${value} Ton CO2eq`, null]}
              />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
